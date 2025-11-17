import { cn } from "@/app/lib/utils";
import Button from "./Button";
import Tooltip from "./Tooltip";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    tooltip?: string;
}

export default function XButton({ tooltip, className, ...props }: ButtonProps) {
    const buttonNode = (
        <Button
            variation="icon"
            icon="X"
            className={cn([
                "bg-red-500 hover:bg-red-600 opacity-80 hover:opacity-100 px-0 py-1 active:text-white",
                className,
            ])}
            iconClasses="text-white group-hover:text-white active:text-white"
            {...props}></Button>
    );

    return tooltip ? (
        <Tooltip content={tooltip}>{buttonNode}</Tooltip>
    ) : (
        buttonNode
    );
}
