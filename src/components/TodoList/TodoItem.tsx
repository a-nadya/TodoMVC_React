import * as React from "react";
import {Todo} from "../../models/todo";
import {Checkbox} from "./Checkbox";

import * as styles from "./TodoItem.less";
import classNames from "classnames";

interface TodoComponentProps {
    todo: Todo;
    todoKey: string;
    filterCondition: string;
    onCheck: (key: string) => void;
    onDelete: (key: string) => void;
}

export class TodoItem extends React.Component<TodoComponentProps> {
    render() {
        return (
            (this.shouldItemShow() &&
                <div className={styles.todo}>
                    <Checkbox todo={this.props.todo} todoKey={this.props.todoKey} onCheck={this.props.onCheck}/>
                    <input className={classNames({[`${styles.text}`]: true}, {[`${styles.completed}`]: !this.props.todo.active})}
                           value={this.props.todo.text} readOnly={true}
                    />
                    <button className={styles.closeButton} onClick={() => this.props.onDelete(this.props.todoKey)}>x
                    </button>
                </div>
            )
        )
    }

    private readonly shouldItemShow = (): boolean => {
        switch (this.props.filterCondition) {
            case "all":
                return true;
            case "active":
                return this.props.todo.active;
            case "completed":
                return !this.props.todo.active;
            default:
                return false;
        }
    }
}
