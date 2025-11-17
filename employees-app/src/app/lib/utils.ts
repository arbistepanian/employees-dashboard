import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function isErrorWithMessage(err: unknown): err is { message: string } {
    return (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as Record<string, unknown>).message === "string"
    );
}

export function getErrorMessage(err: unknown): string {
    if (isErrorWithMessage(err)) {
        return err.message;
    }
    return "Something went wrong. Please try again.";
}
