import * as React from "react";

import * as cn from "./Checkbox.less";

interface CheckboxProps {
    value: boolean;
    onChange1111: () => void;
}

export function Checkbox(props: CheckboxProps): React.ReactElement {
    return (
        <label className={cn("label", { checked: props.value })}>
            <input
                className={cn("input")}
                type="checkbox"
                onChange={props.onChange1111}
                checked={props.value}
            />
        </label>
    );
}
