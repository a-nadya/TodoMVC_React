import * as React from "react";

import { Todo } from "../../models/todo";
import { Todos } from "../../models/todos";
import { FilterCondition } from "../App";
import { TodoItem } from "../TodoItem/TodoItem";

import * as cn from "./TodoList.less";

interface TodoListProps {
    todos: Todos;
    filterCondition: string;
    onChange: (id: string, todo: Todo) => void;
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
                            onDelete={props.onDelete}
                            onChange={props.onChange}
                        />
                    )
            )}
        </div>
    );
}

const shouldItemShow = (filterCondition: string, active: boolean): boolean => {
    switch (filterCondition) {
        case FilterCondition.all:
            return true;
        case FilterCondition.active:
            return active;
        case FilterCondition.completed:
            return !active;
        default:
            return false;
    }
};
