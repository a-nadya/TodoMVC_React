import { Empty } from "../models/empty";
import { Todo } from "../models/todo";
import { Todos } from "../models/todos";

import { itemsCount } from "./itemsCount";

const addTodo = (todos: Todos | Empty, todoText: Todo["text"]): Todos => {
    if (todos.empty === true) {
        delete todos.empty;
    }

    const key: string = Math.random()
        .toString()
        .slice(2);
    const todo = {
        [key]: {
            text: todoText,
            active: true,
        },
    };

    return { ...todos, ...todo } as Todos;
};

const extractTodosFromResponse = (response: {
    [key: string]: Todos;
}): Todos => {
    return checkIfTodosEmpty(response["data"]);
};

const deleteTodo = (todos: Todos, key: string): Todos | Empty => {
    delete todos[key];
    if (Object.keys(todos).length === 0) {
        return { empty: true } as Empty;
    }
    return todos;
};

const editTodo = (todos: Todos, key: string, value: string): Todos => {
    if (value === "") {
        return deleteTodo(todos, key) as Todos;
    } else {
        todos[key].text = value;
        return todos;
    }
};

const updateTodoStatus = (todos: Todos, key: string): Todos => {
    todos[key]["active"] = !todos[key]["active"];
    return todos;
};

const updateAllTodosStatus = (todos: Todos): Todos => {
    const count = itemsCount.getActive(todos);
    const todosData = Object.values(todos);
    todosData.map(todo => {
        if (todo.active || count === 0) {
            todo.active = !todo.active;
        }
    });
    return todos;
};

const deleteCompletedTodos = (todos: Todos): Todos | Empty => {
    const todosKeys = Object.keys(todos);
    todosKeys.map(key => {
        if (!todos[key]["active"]) {
            delete todos[key];
        }
    });
    if (Object.keys(todos).length === 0) {
        return { empty: true } as Empty;
    }
    return todos;
};

const checkIfTodosEmpty = (todos: Todos | Empty): Todos => {
    if (todos.empty === true) {
        return {};
    }
    return todos as Todos;
};

export const todosConstructor = {
    add: addTodo,
    validateEmpty: checkIfTodosEmpty,
    extract: extractTodosFromResponse,
    delete: deleteTodo,
    edit: editTodo,
    updateStatus: updateTodoStatus,
    updateAllStatuses: updateAllTodosStatus,
    deleteCompleted: deleteCompletedTodos,
};
