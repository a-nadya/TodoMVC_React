import {Todo} from "../models/todo";

const calcItemsLeft = (todos: Todo[]): number => {
    return todos.reduce((sum, current) => sum + Number(current.active), 0);
};

export const activeItemsCount = {
    get: calcItemsLeft,
};