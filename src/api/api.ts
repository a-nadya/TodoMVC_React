import { Todos } from "../models/todos";

import { ITodoApi } from "./ITodoApi";

const SECRET_KEY =
    "$2b$10$0C7oxSomMcnhkFJ20wQd9.8YEUpz920F5/rt7y7TsfNJj6y33exf6";

export class JsonBinBasedTodoApi implements ITodoApi {
    private readonly binId: string;

    public constructor(binId: string) {
        this.binId = binId;
    }

    public async getTodos(): Promise<Todos> {
        const url = `https://api.jsonbin.io/b/${this.binId}/latest `;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "secret-key": SECRET_KEY,
            },
        });
        if (!response.ok) {
            throw new Error("");
        }
        return response.json();
    }

    public async setTodos(todos: Todos): Promise<void> {
        const url = `https://api.jsonbin.io/b/${this.binId}`;

        const body = JSON.stringify(
            Object.keys(todos).length === 0 ? { empty: false } : todos
        );

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "secret-key": SECRET_KEY,
                "Content-type": "application/json",
            },
            body: body,
        });
        if (!response.ok) {
            throw new Error("");
        }
    }
}
