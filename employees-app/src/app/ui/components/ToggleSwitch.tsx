"use client";

import React from "react";
import Label from "./Label";

type ToggleSwitchProps = {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    disabled?: boolean;
};

export default function ToggleSwitch({
    checked,
    onChange,
    label,
    disabled = false,
}: ToggleSwitchProps) {
    return (
        <div className="flex items-center justify-start gap-4">
            <label
                className={`relative inline-flex items-center ${
                    disabled ? "opacity-30" : "cursor-pointer"
                }`}>
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div
                    className="w-10 h-6 rounded-full transition-colors duration-300
          bg-(--color-disabled)
          peer-checked:bg-(--color-accent-alt)"
                />
                <div
                    className="absolute left-1 top-1 w-4 h-4 bg-(--color-on-accent-alt) rounded-full 
          peer-checked:translate-x-full transform transition-transform duration-300"
                />
            </label>
            {label && <Label>{label}</Label>}
        </div>
    );
}
