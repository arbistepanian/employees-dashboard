import Button from "@/app/ui/components/Button";
import Message from "@/app/ui/components/Message";

type SubmitBoxProps = {
    onCancel?: () => void;
    isPending?: boolean;
    disabled: boolean;
    hasCancel?: boolean;
    submitText?: string;
    cancelText?: string;
    error?: string | null;
};

export default function SubmitBox({
    onCancel,
    isPending = false,
    disabled,
    hasCancel = true,
    submitText = "Save",
    cancelText = "Cancel",
    error = null,
}: SubmitBoxProps) {
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-4">
            <div className="w-full sm:w-auto sm:flex-1">
                {error && <Message>{error}</Message>}
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    icon="save"
                    variation="primary"
                    loading={isPending}
                    disabled={disabled}
                    type="submit">
                    {submitText}
                </Button>
                {hasCancel && (
                    <Button
                        icon="cancel"
                        variation="secondary"
                        onClick={onCancel}
                        disabled={disabled}
                        type="button">
                        {cancelText}
                    </Button>
                )}
            </div>
        </div>
    );
}
