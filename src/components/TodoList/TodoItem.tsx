import * as React from "react";
import {Todo} from "../../models/todo";

const styles = require("./TodoItem.less");
const classNames = require("classnames");

interface TodoComponentProps {
    todo: Todo;
    onCheck: (key: string) => void;
}

export class TodoItem extends React.Component<TodoComponentProps, {}> {
    render() {
        const {todo} = this.props;
        return (
            <span className={styles.todo}>
                <input type="checkbox" onChange={() => this.props.onCheck(todo.key)} checked={!todo.active}/>
                <input className={classNames({[styles.text]: true}, {[styles.completed]: !todo.active})}
                       value={todo.text} readOnly={true}
                />
            </span>
        )
    }
}
