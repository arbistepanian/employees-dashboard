"use client";

import { FormEvent, useEffect, useState } from "react";
import SubmitBox from "../ui/components/SubmitBox";
import Textbox from "../ui/components/Textbox";
import { Employee } from "../lib/types/employees";

type Props = {
    employee: Employee | null;
    onCancel: () => void;
    onSave: (employee: Employee) => void;
};

export default function EmployeeForm({ employee, onCancel, onSave }: Props) {
    const [firstName, setFirstName] = useState(employee?.firstName || "");
    const [lastName, setLastName] = useState(employee?.lastName || "");
    const [email, setEmail] = useState(employee?.email || "");
    const [role, setRole] = useState(employee?.role || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFirstName(employee?.firstName || "");
        setLastName(employee?.lastName || "");
        setEmail(employee?.email || "");
        setRole(employee?.role || "");
    }, [employee]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/employees", {
                method: employee?.id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: employee?.id ?? undefined,
                    firstName,
                    lastName,
                    email,
                    role,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to save employee.");
            }

            onSave(data as Employee);
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error occurred.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-start items-center gap-4">
                    <Textbox
                        label="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <Textbox
                        label="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-start items-center gap-4">
                    <Textbox
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Textbox
                        label="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>

                <SubmitBox
                    isPending={loading}
                    disabled={
                        loading ||
                        !firstName.trim() ||
                        !lastName.trim() ||
                        !email.trim() ||
                        !role.trim()
                    }
                    submitText="Save"
                    cancelText="Cancel"
                    error={error}
                    onCancel={onCancel}
                />
            </form>
        </div>
    );
}
