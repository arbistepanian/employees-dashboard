"use client";

import DialogBox from "./DialogBox";
import Button from "./Button";
import Heading from "./Heading";

type ConfirmDialogProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    isDestructive?: boolean;
    loading?: boolean;
};

export default function ConfirmDialog({
    open,
    onClose,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    isDestructive = false,
    loading = false,
}: ConfirmDialogProps) {
    return (
        <DialogBox open={open} onClose={onClose} maxWidth="max-w-md">
            <div className="space-y-4">
                <Heading level={3}>{title}</Heading>
                {message && (
                    <p className="text-sm text-(--color-subtext)">{message}</p>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variation="secondary"
                        onClick={onClose}
                        disabled={loading}>
                        {cancelText}
                    </Button>

                    <Button
                        variation={isDestructive ? "danger" : "primary"}
                        onClick={onConfirm}
                        disabled={loading}
                        loading={loading}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </DialogBox>
    );
}
