import { cn } from "@/app/lib/utils";

export default function A({
    children,
    className,
    ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a className={cn("a-link", className)} {...props}>
            {children}
        </a>
    );
}
