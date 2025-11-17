import { cn } from "@/app/lib/utils";
import { forwardRef } from "react";

const Span = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(["text-(--color-text)", className])}
                {...props}>
                {children}
            </span>
        );
    }
);

Span.displayName = "Span";
export default Span;
