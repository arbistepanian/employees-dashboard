import { cn } from "@/app/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    fieldSize?: "small" | "medium" | "large";
}

export default function Label({
    children,
    className,
    fieldSize = "medium",
    ...props
}: LabelProps) {
    const sizeClass = {
        small: "label-sm",
        medium: "label-md",
        large: "label-lg",
    }[fieldSize];

    return (
        <label className={cn("label", sizeClass, className)} {...props}>
            {children}
        </label>
    );
}
