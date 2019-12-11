import * as React from "react";

import { ClearCompletedButton } from "./ClearCompletedButton/ClearCompletedButton";
import { FilterButton } from "./FilterButton/FilterButton";
import * as cn from "./Footer.less";

interface FooterProps {
    itemsLeft: number;
    onFilter: (flag: string) => void;
    onClear: () => void;
    shouldClearCompletedButtonShow: boolean;
}

export class Footer extends React.Component<FooterProps> {
    public render(): React.ReactNode {
        return (
            <div className={cn("footer")}>
                <div>{`${this.props.itemsLeft} items left`}</div>
                <span>
                    <FilterButton
                        filterName={"All"}
                        onFilter={() => this.props.onFilter("All")}
                    />
                    <FilterButton
                        filterName={"Active"}
                        onFilter={() => this.props.onFilter("Active")}
                    />
                    <FilterButton
                        filterName={"Completed"}
                        onFilter={() => this.props.onFilter("Completed")}
                    />
                </span>
                <ClearCompletedButton
                    onClear={this.props.onClear}
                    shouldShow={this.props.shouldClearCompletedButtonShow}
                />
            </div>
        );
    }
}
