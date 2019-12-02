import * as React from "react";

import { Todo } from "../../models/todo";

import * as styles from "./Checkbox.less";

interface CheckboxProps {
    todo: Todo;
    todoKey: string;
    onCheck: (key: string) => void;
}

export class Checkbox extends React.Component<CheckboxProps> {
    public render(): JSX.Element {
        return (
            <div className={styles.checkbox}>
                <input
                    className={styles.input}
                    type="checkbox"
                    id={this.props.todoKey}
                    onChange={() => this.props.onCheck(this.props.todoKey)}
                    checked={!this.props.todo.active}
                />
                <label htmlFor={this.props.todoKey} className={styles.label} />
            </div>
        );
    }
}
