export type EmployeesResult = {
    items: Employee[];
    total: number;
    page: number;
    hasMore: boolean;
};

export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};
