import * as React from "react";
import classNames = require("classnames");

const styles = require("./Footer.less");

interface FooterProps {
    itemsLeft: number;
    onFilter: (flag: string) => void;
    onClear: () => void;
    shouldClearCompletedShow: boolean;
}

export class Footer extends React.Component<FooterProps> {
    render() {
        return (
            <div className={styles.footer}>
                <div>{this.props.itemsLeft + " items left"}</div>
                <span>
                    <input type="radio" name="todosToShow" id="All" onChange={() => this.props.onFilter("all")}
                           defaultChecked={true}/>
                    <label htmlFor="All" className={styles.label}>All</label>
                    <input type="radio" name="todosToShow" id="Active" onChange={() => this.props.onFilter("active")}/>
                    <label htmlFor="Active" className={styles.label}>Active</label>
                    <input type="radio" name="todosToShow" id="Completed"
                           onChange={() => this.props.onFilter("completed")}/>
                    <label htmlFor="Completed" className={styles.label}>Completed</label>
                </span>
                <button
                    className={classNames({[styles.hiddenClearButton]: !this.props.shouldClearCompletedShow})}
                    onClick={this.props.onClear}>
                    Clear completed
                </button>

            </div>
        );
    }
}
