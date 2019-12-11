import * as React from "react";

import { FilterButton } from "./FilterButton/FilterButton";
import * as cn from "./Footer.less";

interface FooterProps {
    itemsLeft: number;
    onFilter: (flag: string) => void;
    onClear: () => void;
    shouldClearCompletedShow: boolean;
}

export class Footer extends React.Component<FooterProps> {
    public render(): React.ReactNode {
        return (
            <div className={cn("footer")}>
                <div>{`${this.props.itemsLeft} items left`}</div>
                <span>
                    <FilterButton
                        filterName={"all"}
                        onFilter={() => this.props.onFilter("all")}
                    />
                    <FilterButton
                        filterName={"active"}
                        onFilter={() => this.props.onFilter("active")}
                    />
                    <FilterButton
                        filterName={"completed"}
                        onFilter={() => this.props.onFilter("completed")}
                    />
                </span>
                <button
                    className={cn({
                        hiddenClearButton: !this.props.shouldClearCompletedShow,
                    })}
                    onClick={this.props.onClear}>
                    Clear completed
                </button>
            </div>
        );
    }
}
