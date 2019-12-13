import * as React from "react";

import { FilterCondition } from "../../App";

import * as cn from "./RadioButton.less";

interface FilterButtonProps {
    filterValue: string;
    onFilter: () => void;
}

export function RadioButton(props: FilterButtonProps): React.ReactElement {
    return (
        <>
            <input
                type="radio"
                name="todosToShow"
                id={props.filterValue}
                onChange={props.onFilter}
                defaultChecked={props.filterValue === FilterCondition.all}
            />
            <label htmlFor={props.filterValue} className={cn("label")}>
                {props.filterValue}
            </label>
        </>
    );
}
