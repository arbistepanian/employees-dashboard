"use client";
import { useEffect, useState } from "react";
import { Employee } from "../lib/types/employees";
import Page from "../ui/components/Page";
import Message from "../ui/components/Message";
import SidePanel from "../ui/components/SidePanel";
import Button from "../ui/components/Button";
import EmployeeForm from "./EmployeeForm";
import ConfirmDialog from "../ui/components/ConfirmDialog";

export default function EmployeesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [panelOpen, setPanelOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null
    );

    useEffect(() => {
        async function fetchEmployees() {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/employees");

                if (!response.ok) {
                    setError("Failed to fetch employees");
                    setIsLoading(false);
                    return;
                }

                const data: Employee[] = await response.json();
                setEmployees(data);
            } catch (err) {
                setError("Failed to fetch employees");
            } finally {
                setIsLoading(false);
            }
        }

        fetchEmployees();
    }, []);

    const handleNew = () => {
        setSelectedEmployee(null);
        setPanelOpen(true);
        setError(null);
    };

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setPanelOpen(true);
        setError(null);
    };

    const handleClose = () => {
        setSelectedEmployee(null);
        setPanelOpen(false);
    };

    const handleSave = (saved: Employee) => {
        setEmployees((prev) => {
            const exists = prev.find((e) => e.id === saved.id);
            if (exists) {
                return prev.map((e) => (e.id === saved.id ? saved : e));
            }
            return [...prev, saved];
        });
        handleClose();
    };

    const handleDelete = async (employee: Employee) => {
        setError(null);
        try {
            const res = await fetch(`/api/employees?id=${employee.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(
                    data.message ||
                        `Failed to delete employee with id ${employee.id}`
                );
                return;
            }

            setEmployees((prev) => prev.filter((e) => e.id !== employee.id));
        } catch (err) {
            setError("Unexpected error while deleting employee");
        } finally {
            setSelectedEmployee(null);
            setShowConfirm(false);
        }
    };

    return (
        <Page title="Employees">
            <div className="flex justify-end items-center mb-4">
                <Button icon="add" onClick={handleNew}>
                    New
                </Button>
            </div>

            {isLoading && <p>Loading employees...</p>}
            {error && <Message level="error">{error}</Message>}

            {!isLoading && !error && employees.length === 0 && (
                <p>No employees found.</p>
            )}

            {!isLoading && !error && employees.length > 0 && (
                <table className="mt-4 w-full">
                    <thead>
                        <tr>
                            <th className="text-left border-b border-(--color-border)">
                                ID
                            </th>
                            <th className="text-left border-b border-(--color-border)">
                                Name
                            </th>
                            <th className="text-left border-b border-(--color-border)">
                                Email
                            </th>
                            <th className="text-left border-b border-(--color-border)">
                                Role
                            </th>
                            <th className="w-30 text-right border-b border-(--color-border)">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((e) => (
                            <tr key={e.id}>
                                <td className="py-2">{e.id}</td>
                                <td>
                                    {e.firstName} {e.lastName}
                                </td>
                                <td>{e.email}</td>
                                <td>{e.role}</td>
                                <td className="text-right space-x-2">
                                    <Button
                                        variation="ghost"
                                        type="button"
                                        icon="edit"
                                        onClick={() => handleEdit(e)}></Button>
                                    <Button
                                        variation="danger"
                                        type="button"
                                        icon="delete"
                                        onClick={() => {
                                            setSelectedEmployee(e);
                                            setShowConfirm(true);
                                        }}></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {panelOpen && (
                <SidePanel
                    onClose={() => {
                        setPanelOpen(false);
                    }}
                    title={selectedEmployee ? "Edit Employee" : "New Employee"}>
                    <EmployeeForm
                        employee={selectedEmployee}
                        onCancel={handleClose}
                        onSave={handleSave}
                    />
                </SidePanel>
            )}

            {showConfirm && selectedEmployee && (
                <ConfirmDialog
                    open={showConfirm}
                    onClose={() => {
                        setSelectedEmployee(null);
                        setShowConfirm(false);
                    }}
                    title="Delete Employee"
                    message={`Are you sure you want to delete ${selectedEmployee.firstName} ${selectedEmployee.lastName}?`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    isDestructive={true}
                    loading={isLoading}
                    onConfirm={() => handleDelete(selectedEmployee)}
                />
            )}
        </Page>
    );
}
