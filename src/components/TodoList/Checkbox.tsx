import * as React from "react";

import * as cn from "./Checkbox.less";

interface CheckboxProps {
    value: boolean;
    onCheck: (newValue: boolean) => void;
}

export class Checkbox extends React.Component<CheckboxProps> {
    public render(): React.ReactNode {
        return (
            <label className={cn("label", { checked: this.props.value })}>
                <input
                    className={cn("input")}
                    type="checkbox"
                    onChange={() => this.props.onCheck(this.props.value)}
                    checked={this.props.value}
                />
            </label>
        );
    }
}
