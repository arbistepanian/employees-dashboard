"use client";

import { useState } from "react";
import Heading from "./Heading";
import LinkButton from "./LinkButton";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-screen h-14 fixed left-0 top-0 px-6 py-4 border-b border-(--color-text)/10 flex justify-between items-center bg-(--color-surface) text-(--color-text) z-10">
            <Heading
                level={1}
                className="sm:text-xl text-lx font-semibold mb-0">
                <span>{title}</span>
            </Heading>

            <div className="relative">
                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-(--color-surface) text-(--color-text) border border-(--color-text)/20 rounded shadow-md z-50">
                        <LinkButton
                            href="/employees"
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-(--color-text)/5">
                            Employees
                        </LinkButton>
                    </div>
                )}
            </div>
        </header>
    );
}
