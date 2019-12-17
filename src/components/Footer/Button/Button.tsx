import * as React from "react";

import * as cn from "./Button.less";

interface ButtonProps {
    name: string;
    shouldShow: boolean;
    onClear: () => void;
}

export function Button(props: ButtonProps): React.ReactElement {
    return (
        <label
            className={cn("label", {
                hidden: !props.shouldShow,
            })}>
            <button className={cn("button")} onClick={props.onClear} />
            {props.name}
        </label>
    );
}
