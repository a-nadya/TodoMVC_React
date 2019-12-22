import * as React from "react";

import { FilterCondition } from "../../App";

import * as cn from "./RadioButton.less";

interface RadioButtonProps {
    name: string;
    value: string;
    onChange: () => void;
}

export function RadioButton(props: RadioButtonProps): React.ReactElement {
    return (
        <>
            <input
                type="radio"
                name={props.name}
                className={cn("input")}
                id={props.value}
                onChange={props.onChange}
                defaultChecked={props.value === FilterCondition.all}
            />
            <label htmlFor={props.value} className={cn("label")}>
                {props.value}
            </label>
        </>
    );
}
