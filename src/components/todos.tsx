import * as React from "react";
import Input from "./Input/Input";
import {api} from "../api/api";
import {Todo} from "../models/todo";
import {todosConstructor} from "../api/todosConstructor";
import {TodoItem} from "./TodoList/TodoItem";
import {activeItemsCount} from "../api/activeItemsCount";

const styles = require("./todos.less");

interface TodosState {
    todos: Todo[];
    itemsLeft: number;
}

export default class Todos extends React.Component<{}, TodosState> {
    state: TodosState = {
        todos: [],
        itemsLeft: 0,
    };

    componentDidMount(): void {
        this.loadData();
    }

    render(): React.ReactNode {
        return (
            <>
                <Input onEnter={this.handleAddTodo} onCheck={this.handleCheckAllTodos}/>
                <div className={styles.list}>
                    {this.state.todos.map(todo =>
                        <TodoItem todo={todo} key={todo.key} onCheck={this.handleCheckTodo}/>
                        )}
                </div>
            </>
        );
    }

    loadData = async () => {
        const todos = await api.select();
        const itemsLeft = activeItemsCount.get(todos);
        this.setState({todos, itemsLeft});
    };

    handleAddTodo = async (text: string) => {
        const todos = todosConstructor.add(this.state.todos, text);
        await api.update(todos);
        this.loadData();
    };

    handleCheckTodo = async (key: string) => {
        const todos = todosConstructor.updateStatus(this.state.todos, key);
        await api.update(todos);
        this.loadData();
    };

    handleCheckAllTodos = async () => {
        const todos = todosConstructor.updateAllStatuses(this.state.todos);
        await api.update(todos);
        this.loadData();
    }
}
