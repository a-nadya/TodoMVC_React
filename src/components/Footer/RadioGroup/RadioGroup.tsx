import * as React from "react";

import { FilterCondition } from "../../App";
import { RadioButton } from "../RadioButton/RadioButton";

import * as cn from "./RadioGroup.less";

interface RadioGroupProps {
    name: string;
    values: FilterCondition[];
    onFilter: (flag: FilterCondition) => void;
}

export function RadioGroup(props: RadioGroupProps): React.ReactElement {
    return (
        <div>
            {props.values.map(value => (
                <span className={cn("radio")}>
                    <RadioButton
                        onFilter={() => {
                            props.onFilter(value);
                        }}
                        name={props.name}
                        filterValue={value}
                    />
                </span>
            ))}
        </div>
    );
}
