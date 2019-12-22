import * as React from "react";

import { FilterCondition } from "../App";

import * as cn from "./Footer.less";
import { RadioGroup } from "./RadioGroup/RadioGroup";
import { UnderlinedButton } from "./UnderlinedButton/UnderlinedButton";

interface FooterProps {
    itemsLeftValue: number;
    onFilter: (flag: string) => void;
    onClear: () => void;
    clearCompletedButtonVisible: boolean;
}

export function Footer(props: FooterProps): React.ReactElement {
    return (
        <div className={cn("footer")}>
            <div>{`${props.itemsLeftValue} items left`}</div>
            <RadioGroup
                name="todosToShow"
                values={[
                    FilterCondition.all,
                    FilterCondition.active,
                    FilterCondition.completed,
                ]}
                onCheck={props.onFilter}
            />
            <div
                className={cn({
                    "hidden-button": !props.clearCompletedButtonVisible,
                })}>
                <UnderlinedButton
                    name="Clear completed"
                    onClear={props.onClear}
                />
            </div>
        </div>
    );
}
