import * as React from "react";

import * as cn from "./CheckAllButton.less";

interface CheckAllButtonProps {
    shouldShow: boolean;
    value: boolean;
    onCheck: () => void;
}

export function CheckAllButton(props: CheckAllButtonProps): React.ReactElement {
    return (
        <label
            className={cn(
                "label",
                { checked: props.value },
                { hidden: !props.shouldShow }
            )}>
            <input
                className={cn("input")}
                type="checkbox"
                onChange={props.onCheck}
            />
        </label>
    );
}
