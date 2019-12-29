import { Todo } from "../models/todo";
import { Todos } from "../models/todos";

export class TodoUtils {
    public static addTodo(todos: Todos, todoText: string): Todos {
        const key: string = Math.random()
            .toString()
            .slice(2);
        return {
            ...todos,
            [key]: {
                text: todoText,
                active: true,
            },
        };
    }

    public static deleteTodo(todos: Todos, key: string): Todos {
        const { [key]: deleted, ...restTodos } = todos;
        return restTodos;
    }

    public static editTodo(todos: Todos, id: string, todo: Todo): Todos {
        if (todo.text === "") {
            return this.deleteTodo(todos, id);
        } else {
            return {
                ...todos,
                [id]: todo,
            };
        }
    }active

    status, , completed, checked

    public static updateAllTodosStatus(todos: Todos, active: boolean): Todos {
        const result: Todos = {};
        for (const id of Object.keys(todos)) {
            if (todos[id].active !== active) {
                result[id] = {
                    ...todos[id],
                    active: active,
                };
            } else {
                result[id] = todos[id];
            }
        }
        return result;
    }

    public static deleteCompletedTodos(todos: Todos): Todos {
        const result: Todos = {};
        for (const key of Object.keys(todos)) {
            if (todos[key].active) {
                result[key] = todos[key];
            }
        }
        return result;
    }
}
