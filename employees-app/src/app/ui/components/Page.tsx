"use client";

import { cn } from "@/app/lib/utils";
import Header from "./Header";

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    className?: string;
    children: React.ReactNode;
}

export default function Page({
    title,
    children,
    className,
    ...props
}: PageProps) {
    return (
        <div
            className={cn(
                "flex flex-col min-h-screen pt-16 items-center justify-start bg-(--color-surface) text-(--color-text)",
                className
            )}
            {...props}>
            <Header title={title} />

            <div className="w-full max-w-4xl px-4">
                <div className="bg-(--color-surface) text-(--color-text)">
                    {children}
                </div>
            </div>
        </div>
    );
}
