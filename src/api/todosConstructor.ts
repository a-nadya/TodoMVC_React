import {Todo} from "../models/todo";

const addTodo = (todos: Todo[], todoText: Todo["text"]): Todo[] => {
    todos.push(createTodo(todoText));
    return todos;
};

const createTodo = (text: Todo["text"]): Todo => {
    const key = Math.random().toString().slice(2);
    return {
        "key": key,
        "text": text,
        "active": true
    };
};

const updateTodoStatus = (todos: Todo[], key:Todo["key"]): Todo[] => {
    todos.map(todo => {
        if (todo.key === key) {
            todo.active = !todo.active;
        }
    });
    return todos;
};


export const todosConstructor = {
    add: addTodo,
    updateStatus: updateTodoStatus,
};