import { Empty } from "../models/empty";
import { Todos } from "../models/todos";

export interface IApi {
    select(): Promise<Todos>;
    update(todos: Todos): Promise<void>;
}
