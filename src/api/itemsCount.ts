import { Todos } from "../models/todos";

export class ItemsCount {
    public static calcItemsLeft(todos: Todos): number {
        return Object.values(todos).filter(x => x.active).length;
    }

    private static calcCompleted(todos: Todos): number {
        const todosItems = Object.values(todos);
        return todosItems.reduce(
            (sum, current) => sum + (current.active ? 0 : 1),
            0
        );
    }
}
