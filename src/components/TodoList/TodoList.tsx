import * as React from "react";

import { Todos } from "../../models/todos";
import { TodoItem } from "../TodoItem/TodoItem";

import * as cn from "./TodoList.less";

interface TodoListProps {
    todos: Todos;
    filterCondition: string;
    onCheck: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoList(props: TodoListProps): React.ReactElement {
    return (
        <div className={cn("list")}>
            {Object.keys(props.todos).map(
                key =>
                    shouldItemShow(
                        props.filterCondition,
                        props.todos[key].active
                    ) && (
                        <TodoItem
                            todo={props.todos[key]}
                            id={key}
                            key={key}
                            onCheck={props.onCheck}
                            onDelete={props.onDelete}
                        />
                    )
            )}
        </div>
    );
}

const shouldItemShow = (filterCondition: string, active: boolean): boolean => {
    switch (filterCondition) {
        case "All":
            return true;
        case "Active":
            return active;
        case "Completed":
            return !active;
        default:
            return false;
    }
};
