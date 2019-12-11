import * as React from "react";

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
                    <input
                        type="radio"
                        name="todosToShow"
                        id="All"
                        onChange={() => this.props.onFilter("all")}
                        defaultChecked={true}
                    />
                    <label htmlFor="All" className={cn("label")}>
                        All
                    </label>
                    <input
                        type="radio"
                        name="todosToShow"
                        id="Active"
                        onChange={() => this.props.onFilter("active")}
                    />
                    <label htmlFor="Active" className={cn("label")}>
                        Active
                    </label>
                    <input
                        type="radio"
                        name="todosToShow"
                        id="Completed"
                        onChange={() => this.props.onFilter("completed")}
                    />
                    <label htmlFor="Completed" className={cn("label")}>
                        Completed
                    </label>
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
