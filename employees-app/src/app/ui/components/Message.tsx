import { cn } from "@/app/lib/utils";

type ErrorLevel = "message" | "warning" | "error";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    level?: ErrorLevel;
}

const levelClasses: Record<ErrorLevel, string> = {
    message: `
    bg-[var(--color-message-bg)] 
    border border-[var(--color-message-border)] 
    text-[var(--color-message-text)] 
  `,
    warning: `
    bg-[var(--color-warning-bg)] 
    border border-[var(--color-warning-border)] 
    text-[var(--color-warning-text)] 
  `,
    error: `
    bg-[var(--color-error-bg)] 
    border border-[var(--color-error-border)] 
    text-[var(--color-error-text)] 
  `,
};

export default function Message({
    children,
    className,
    level = "error",
    ...props
}: Props) {
    return (
        <div
            className={cn([
                "text-sm rounded px-2 py-1",
                levelClasses[level],
                className,
            ])}
            {...props}>
            {children}
        </div>
    );
}
