import * as React from "react";

import { FilterCondition } from "../App";

import { Button } from "./Button/Button";
import * as cn from "./Footer.less";
import { RadioGroup } from "./RadioGroup/RadioGroup";

interface FooterProps {
    itemsLeftValue: number;
    onFilter: (flag: FilterCondition) => void;
    onClear: () => void;
    shouldClearCompletedButtonShow: boolean;
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
                onFilter={props.onFilter}
            />
            <Button
                name="Clear completed"
                onClear={props.onClear}
                shouldShow={props.shouldClearCompletedButtonShow}
            />
        </div>
    );
}
