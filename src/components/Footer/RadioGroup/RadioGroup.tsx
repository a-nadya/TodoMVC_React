import * as React from "react";

import { RadioButton } from "../RadioButton/RadioButton";

import * as cn from "./RadioGroup.less";

interface RadioGroupProps {
    name: string;
    values: string[];
    onFilter: (flag: string) => void;
}

export function RadioGroup(props: RadioGroupProps): React.ReactElement {
    return (
        <div>
            {props.values.map(value => (
                <span className={cn("radio")} key={value}>
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
