import { Empty } from "../models/empty";
import { Todos } from "../models/todos";

export interface IApi {
    select(): Promise<Todos | Empty>;
    update(todos: Todos): Promise<void>;
}
