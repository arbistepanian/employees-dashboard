import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";
import Tooltip from "./Tooltip";
import { IconType } from "@/app/lib/types/types";
import Icon from "./Icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variation?: "icon" | "primary" | "secondary" | "ghost" | "danger";
    iconClasses?: string;
    tooltip?: string;
    showIconAfter?: boolean;
    icon?: IconType;
    loading?: boolean;
    fieldSize?: "small" | "medium" | "large";
}

export default function Button({
    children,
    type = "button",
    className,
    iconClasses,
    variation = "primary",
    tooltip,
    icon,
    showIconAfter = false,
    loading = false,
    fieldSize = "medium",
    ...props
}: ButtonProps) {
    const variationClass = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        ghost: "btn-ghost",
        danger: "btn-danger",
        icon: "", // Icons are styled differently
    }[variation];

    const sizeClass = {
        small: "btn-sm",
        medium: "btn-md",
        large: "btn-lg",
    }[fieldSize];

    const buttonClass = cn(["btn", sizeClass, variationClass, className]);

    const iconColorClass =
        variation === "primary"
            ? "text-[var(--color-on-primary)]"
            : variation == "ghost"
            ? "text-[var(--color-text)]"
            : variation == "danger"
            ? "text-[var(--color-on-danger)]"
            : "text-[var(--color-text)]";

    const iconClass = cn("w-5 h-5", iconColorClass, iconClasses);

    let iconNode: ReactNode | null = null;

    if (loading && icon) {
        iconNode = <span className={cn("spinner w-5 h-5", iconColorClass)} />;
    } else if (icon) {
        iconNode = <Icon size={5} icon={icon} className={iconClass} />;
    }

    const buttonNode = showIconAfter ? (
        <button type={type} className={buttonClass} {...props}>
            {children}
            {iconNode}
        </button>
    ) : (
        <button type={type} className={buttonClass} {...props}>
            {iconNode}
            {children}
        </button>
    );

    return tooltip ? (
        <Tooltip content={tooltip}>{buttonNode}</Tooltip>
    ) : (
        buttonNode
    );
}
