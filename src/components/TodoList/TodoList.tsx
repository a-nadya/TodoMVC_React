import * as React from "react";

import { Todos } from "../../models/todos";
import { TodoItem } from "../TodoItem/TodoItem";

import * as cn from "./TodoList.less";

interface TodoListProps {
    todos: Todos;
    onCheck: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoList(props: TodoListProps): React.ReactElement {
    return (
        <div className={cn("list")}>
            {Object.keys(props.todos).map(key => (
                <TodoItem
                    todo={props.todos[key]}
                    id={key}
                    key={key}
                    onCheck={props.onCheck}
                    onDelete={props.onDelete}
                    // filterCondition={this.state.filterCondition}
                />
            ))}
        </div>
    );
}
