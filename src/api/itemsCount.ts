import { Todos } from "../models/todos";

const calcItemsLeft = (todos: Todos): number => {
    const todosItems = Object.values(todos);
    return todosItems.reduce((sum, current) => sum + Number(current.active), 0);
};

const calcCompleted = (todos: Todos): number => {
    const todosItems = Object.values(todos);
    return todosItems.reduce(
        (sum, current) => sum + Number(!current.active),
        0
    );
};

export const itemsCount = {
    getActive: calcItemsLeft,
    getCompleted: calcCompleted,
};