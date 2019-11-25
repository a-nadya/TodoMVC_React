import * as React from "react";

const styles = require("./Footer.less");

interface FooterProps {
    itemsLeft: number;
    onFilter: (flag: boolean | null) => void;
    onClear: () => void;
}

export class Footer extends React.Component<FooterProps> {
    render() {
        return (
            <div className={styles.footer}>
                <div>{this.props.itemsLeft + " items left"}</div>
                <div>
                    <input type="radio" name="todosToShow" id="All" onChange={() => this.props.onFilter(null)}/>
                    <label htmlFor="All">All</label>
                    <input type="radio" name="todosToShow" id="Active" onChange={() => this.props.onFilter(true)}/>
                    <label htmlFor="Active">Active</label>
                    <input type="radio" name="todosToShow" id="Completed" onChange={() => this.props.onFilter(false)}/>
                    <label htmlFor="Completed">Completed</label>
                </div>
                <button onClick={this.props.onClear}>Clear completed</button>
            </div>
        );
    }
}