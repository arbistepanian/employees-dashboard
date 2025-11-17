import React from "react";
import Label from "./Label";
import { cn } from "@/app/lib/utils";

type Option = { label: string; value: string };

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    options: Option[];
    value?: string;
    helperText?: string;
    addEmptyOption?: boolean;
    emptyOptionLable?: string;
    onValueChange: (value: string) => void;
    label?: string;
    fieldSize?: "small" | "medium" | "large";
}

export default function Select({
    className,
    options,
    value,
    helperText,
    addEmptyOption = true,
    emptyOptionLable = "--",
    onValueChange,
    label,
    fieldSize = "medium",
    ...props
}: SelectProps) {
    const sizeClass = {
        small: "textbox-sm",
        medium: "textbox-md",
        large: "textbox-lg",
    }[fieldSize];

    return (
        <div className="flex w-full flex-col justify-start items-start gap-1">
            {label && <Label fieldSize={fieldSize}>{label}</Label>}
            <select
                {...props}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className={cn("textbox", sizeClass, className)}>
                {addEmptyOption && <option value="">{emptyOptionLable}</option>}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {helperText && (
                <p className="text-sm text-(--color-subtext)">{helperText}</p>
            )}
        </div>
    );
}
