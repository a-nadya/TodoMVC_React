import * as React from "react";
import Input from "./Input/Input";
import {api} from "../api/api";
import {Todo} from "../models/todo";
import {todosConstructor} from "../api/todosConstructor";
import {TodoItem} from "./TodoList/TodoItem";
const styles = require("./todos.less");

interface TodosState {
    todos: Todo[];
}

export default class Todos extends React.Component<{}, TodosState> {
    state: TodosState = {
        todos: [],
    };

    componentDidMount(): void {
        this.loadData();
    }

    render(): React.ReactNode {
        return (
            <>
                <Input onEnter={this.handleAddTodo}/>
                <div className={styles.list}>
                    {this.state.todos.map(todo => <TodoItem todo={todo} key={todo.key} onCheck={this.handleCheckTodo}/>)}
                </div>
            </>
        );
    }

    loadData = async () => {
        const todos = await api.select();
        this.setState({todos});
    };

    handleAddTodo = async (text: string) => {
        const todos = todosConstructor.add(this.state.todos, text);
        this.setState({todos});
        await api.update(todos);
    };

    handleCheckTodo = async (key: string) => {
        const todos = todosConstructor.updateStatus(this.state.todos, key);
        this.setState({todos});
        await api.update(todos);
    }
}
