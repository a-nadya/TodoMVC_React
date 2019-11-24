import {Todo} from "../models/todo";
import {Todos} from "../models/todos";
import {activeItemsCount} from "./activeItemsCount";

const addTodo = (todos: Todos, todoText: Todo["text"]): Todos => {
    const key = Math.random().toString().slice(2);
    const todo = {
        [key]: {
            "text": todoText,
            "active": true
        }
    };
    return Object.assign(todos, todo);
};

const extractTodosFromResponse = (response: { [key: string]: Todos }): Todos => {
    return response["data"];
};

const deleteTodo = (todos: Todos, key: string): Todos => {
    delete todos[key];
    return todos;
};

const updateTodoStatus = (todos: Todos, key: string): Todos => {
    todos[key]["active"] = !todos[key]["active"];
    return todos;
};

const updateAllTodosStatus = (todos: Todos): Todos => {
    const count = activeItemsCount.get(todos);
    const todosItems = Object.values(todos);
    todosItems.map(todo => {
            if (todo.active || count === 0) {
                todo.active = !todo.active;
            }
        }
    );
    return todos;
};

export const todosConstructor = {
    add: addTodo,
    extract: extractTodosFromResponse,
    delete: deleteTodo,
    updateStatus: updateTodoStatus,
    updateAllStatuses: updateAllTodosStatus,
};
