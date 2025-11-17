export default function Spinner({
    size = 6,
    color,
    showMask = false,
}: {
    size?: number;
    color?: string;
    showMask?: boolean;
}) {
    if (!color) {
        color = "border-[var(--color-border)]";
    }

    return (
        <>
            <div
                className={`animate-spin rounded-full h-${size} w-${size} border-4 ${color} border-t-transparent`}
            />
            {showMask && (
                <div
                    className={`fixed top-0 left-0 w-screen h-screen z-30 bg-(--color-surface-alt) opacity-40`}></div>
            )}
        </>
    );
}
