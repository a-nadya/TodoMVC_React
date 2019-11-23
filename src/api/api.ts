import {Todo} from "../models/todo";

const BIN_ID = "5dd9060c040d843991f79576";
const SECRET_KEY = "$2b$10$0C7oxSomMcnhkFJ20wQd9.8YEUpz920F5/rt7y7TsfNJj6y33exf6";

const getTodos = async (): Promise<Todo[]> => {
    const url = `https://api.jsonbin.io/b/${BIN_ID}/latest `;
    return fetch(url, {
        method: "GET",
        headers: {
            "secret-key": SECRET_KEY
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
};

const setTodos = async (todos: Todo[]) => {
    const url = `https://api.jsonbin.io/b/${BIN_ID}`;
    return fetch(url, {
        method: "PUT",
        headers: {
            "secret-key": SECRET_KEY,
            "Content-type": "application/json"
        },
        body: JSON.stringify(todos)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
};

export const api = {
    select: getTodos,
    update: setTodos
};