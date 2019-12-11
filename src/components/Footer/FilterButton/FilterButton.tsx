import * as React from "react";

import * as cn from "./FilterButton.less";

interface FilterButtonProps {
    filterName: string;
    onFilter: () => void;
}

export function FilterButton(props: FilterButtonProps): React.ReactElement {
    return (
        <>
            <input
                type="radio"
                name="todosToShow"
                id={props.filterName}
                onChange={props.onFilter}
                defaultChecked={props.filterName === "All"}
            />
            <label htmlFor={props.filterName} className={cn("label")}>
                {props.filterName}
            </label>
        </>
    );
}
