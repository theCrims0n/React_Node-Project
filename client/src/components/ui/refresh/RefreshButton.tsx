import { RefreshCw } from "lucide-react";
import React from "react";
import { Tooltip } from "react-tooltip";

export interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> { }

const RefreshButton = React.forwardRef<HTMLInputElement, ButtonProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <>
                <button id='tooltip-default'
                    {...props}>
                    <RefreshCw />
                </button>
                <Tooltip
                    anchorSelect="#tooltip-default"
                    content="Refresh"
                />
            </>
        )
    },
);
RefreshButton.displayName = "RefreshButton";

export { RefreshButton };
