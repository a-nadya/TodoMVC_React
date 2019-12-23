import { Todos } from "../models/todos";

const calcItemsLeft = (todos: Todos): number => {
    return Object.values(todos).filter(todo => todo.active).length;
};

const calcCompleted = (todos: Todos): number => {
    return Object.values(todos).filter(todo => !todo.active).length;
};

export const itemsCount = {
    getActive: calcItemsLeft,
    getCompleted: calcCompleted,
};
