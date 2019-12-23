import { Empty } from "../models/empty";
import { Todos } from "../models/todos";

import { IApi } from "./IApi";

const SECRET_KEY =
    "$2b$10$0C7oxSomMcnhkFJ20wQd9.8YEUpz920F5/rt7y7TsfNJj6y33exf6";

export class Api implements IApi {
    private readonly binId: string;

    public constructor(binId: string) {
        this.binId = binId;
    }

    public async select(): Promise<Todos | Empty> {
        const url = `https://api.jsonbin.io/b/${this.binId}/latest `;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "secret-key": SECRET_KEY,
            },
        });
        if (!response.ok) {
            throw new Error("всё сломалось");
        }
        return response.json();
    }

    public async update(todos: Todos): Promise<void> {
        const url = `https://api.jsonbin.io/b/${this.binId}`;
        const body = JSON.stringify(
            Object.keys(todos).length === 0 ? { empty: true } : todos
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
            throw new Error("всё сломалось");
        }
    }
}
