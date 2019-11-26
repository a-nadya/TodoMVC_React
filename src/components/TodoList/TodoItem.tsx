import * as React from "react";
import {Todo} from "../../models/todo";
import {Checkbox} from "./Checkbox";

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
            <div className={styles.todo}>
                <Checkbox todo={this.props.todo} todoKey={this.props.todoKey} onCheck={this.props.onCheck}/>
                <input className={classNames({[styles.text]: true}, {[styles.completed]: !this.props.todo.active})}
                       value={this.props.todo.text} readOnly={true}
                />
                <button className={styles.closeButton} onClick={() => this.props.onDelete(this.props.todoKey)}>x
                </button>
            </div>
        )
    }
}
