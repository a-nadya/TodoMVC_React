import * as React from "react";

import { FilterCondition } from "../App";

import { Button } from "./Button/Button";
import * as cn from "./Footer.less";
import { RadioButton } from "./RadioButton/RadioButton";

interface FooterProps {
    itemsLeftValue: number;
    onFilter: (flag: FilterCondition) => void;
    onClear: () => void;
    shouldClearCompletedButtonShow: boolean;
}

export class Footer extends React.Component<FooterProps> {
    public render(): React.ReactNode {
        return (
            <div className={cn("footer")}>
                <div>{`${this.props.itemsLeftValue} items left`}</div>
                <span>
                    <RadioButton
                        filterValue={FilterCondition.all}
                        onFilter={() =>
                            this.props.onFilter(FilterCondition.all)
                        }
                    />
                    <RadioButton
                        filterValue={FilterCondition.active}
                        onFilter={() =>
                            this.props.onFilter(FilterCondition.active)
                        }
                    />
                    <RadioButton
                        filterValue={FilterCondition.completed}
                        onFilter={() =>
                            this.props.onFilter(FilterCondition.completed)
                        }
                    />
                </span>
                <Button
                    name="Clear completed"
                    onClear={this.props.onClear}
                    shouldShow={this.props.shouldClearCompletedButtonShow}
                />
            </div>
        );
    }
}
