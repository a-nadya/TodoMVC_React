import * as React from "react";

import * as cn from "./UnderlinedButton.less";

interface UnderlinedButtonProps {
    name: string;
    onClear: () => void;
}

export function UnderlinedButton(
    props: UnderlinedButtonProps
): React.ReactElement {
    return (
        <label className={cn("label")}>
            <button className={cn("button")} onClick={props.onClear} />
            {props.name}
        </label>
    );
}
