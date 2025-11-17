"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Heading from "./Heading";
import { IconType } from "@/app/lib/types/types";
import Icon from "./Icon";
import Button from "./Button";

type SidePanelProps = {
    title?: string;
    titleIcon?: IconType;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
};

export default function SidePanel({
    title,
    titleIcon,
    onClose,
    className,
    children,
}: SidePanelProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEsc);
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setIsOpen(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    if (typeof window === "undefined") return null;

    return createPortal(
        <div className={className}>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/50 transition-opacity opacity-100"
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full sm:w-[480px] bg-(--color-surface) shadow-lg transform transition-transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-(--color-border)">
                    <div className="flex items-center justify-start gap-4">
                        {titleIcon && <Icon icon={titleIcon} size={10} />}
                        <Heading level={2}>{title}</Heading>
                    </div>
                    <Button
                        variation="icon"
                        icon="X"
                        onClick={onClose}
                        aria-label="Close panel"></Button>
                </div>

                {/* Body */}
                <div className="p-4 overflow-y-auto h-[calc(100%-56px)] text-(--color-text)">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
