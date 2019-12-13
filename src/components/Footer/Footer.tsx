import * as React from "react";

import { Button } from "./Button/Button";
import * as cn from "./Footer.less";
import { RadioButton } from "./RadioButton/RadioButton";

interface FooterProps {
    itemsLeftValue: number;
    onFilter: (flag: string) => void;
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
                        filterValue={"All"}
                        onFilter={() => this.props.onFilter("All")}
                    />
                    <RadioButton
                        filterValue={"Active"}
                        onFilter={() => this.props.onFilter("Active")}
                    />
                    <RadioButton
                        filterValue={"Completed"}
                        onFilter={() => this.props.onFilter("Completed")}
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
