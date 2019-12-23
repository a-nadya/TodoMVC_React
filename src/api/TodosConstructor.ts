import { Empty } from "../models/empty";
import { Todo } from "../models/todo";
import { Todos } from "../models/todos";

import { itemsCount } from "./ItemsCount";

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

const deleteTodo = (todos: Todos, key: string): Todos => {
    delete todos[key];
    return todos;
};

const editTodo = (todos: Todos, id: string, todo: Todo): Todos => {
    if (todo.text === "") {
        return deleteTodo(todos, id);
    } else {
        todos[id] = todo;
        return todos;
    }
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

const deleteCompletedTodos = (todos: Todos): Todos => {
    const todosKeys = Object.keys(todos);
    todosKeys.map(key => {
        if (!todos[key]["active"]) {
            delete todos[key];
        }
    });
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
    updateAllStatuses: updateAllTodosStatus,
    deleteCompleted: deleteCompletedTodos,
};
