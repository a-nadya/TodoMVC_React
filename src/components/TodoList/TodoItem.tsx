import * as React from "react";
import {Todo} from "../../models/todo";

const styles = require("./TodoItem.less");
const classNames = require("classnames");

interface TodoComponentProps {
    todo: Todo;
    todoKey: string;
    shouldShow: boolean | null;
    onCheck: (key: string) => void;
    onDelete: (key: string) => void;
}

export class TodoItem extends React.Component<TodoComponentProps> {
    render() {
        return (
            ((this.props.shouldShow === null) || (this.props.shouldShow === this.props.todo.active)) &&
            <span className={styles.todo}>
                <input type="checkbox" onChange={() => this.props.onCheck(this.props.todoKey)}
                       checked={!this.props.todo.active}/>
                <input className={classNames({[styles.text]: true}, {[styles.completed]: !this.props.todo.active})}
                       value={this.props.todo.text} readOnly={true}
                />
                <button onClick={() => this.props.onDelete(this.props.todoKey)}>x</button>
            </span>
        )
    }
}
