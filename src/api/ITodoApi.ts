import { Empty } from "../models/empty";
import { Todos } from "../models/todos";

export interface ITodoApi {
    getTodos(): Promise<Todos>;
    setTodos(todos: Todos): Promise<void>;
}
