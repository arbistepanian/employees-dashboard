import Label from "./Label";
import { forwardRef } from "react";
import { cn } from "@/app/lib/utils";

interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    fieldSize?: "small" | "medium" | "large";
}

const Textbox = forwardRef<HTMLInputElement, InputType>(
    ({ className, label, helperText, fieldSize = "medium", ...props }, ref) => {
        const sizeClass = {
            small: "textbox-sm",
            medium: "textbox-md",
            large: "textbox-lg",
        }[fieldSize];

        return (
            <div className="flex w-full flex-col justify-start items-start gap-1">
                {label && <Label fieldSize={fieldSize}>{label}</Label>}
                <input
                    ref={ref}
                    className={cn("textbox", sizeClass, className)}
                    {...props}
                />
                {helperText && (
                    <p className="text-sm text-(--color-subtext)">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Textbox.displayName = "Textbox";
export default Textbox;
