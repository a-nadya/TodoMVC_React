import * as React from "react";

import * as cn from "./ClearCompletedButton.less";

interface ClearCompletedButtonProps {
    shouldShow: boolean;
    onClear: () => void;
}

export function ClearCompletedButton(
    props: ClearCompletedButtonProps
): React.ReactElement {
    return (
        <label
            className={cn("label", {
                hidden: !props.shouldShow,
            })}>
            <button className={cn("button")} onClick={props.onClear} />
            Clear completed
        </label>
    );
}
