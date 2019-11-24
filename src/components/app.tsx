import * as React from "react";
import Input from "./Input/Input";
import {api} from "../api/api";
import {todosConstructor} from "../api/todosConstructor";
import {TodoItem} from "./TodoList/TodoItem";
import {Todos} from "../models/todos";
import {Todo} from "../models/todo";

const styles = require("./app.less");

interface TodosState {
    todos: Todos;
    itemsLeft: number;
    loading: boolean;
}

export default class App extends React.Component<{}, TodosState> {
    state: TodosState = {
        todos: {},
        itemsLeft: 0,
        loading: true
    };

    componentDidMount(): void {
        this.loadData();
    }

    render(): React.ReactNode {
        const {todos} = this.state;
        return (
            <>
                <Input onEnter={this.handleAddTodo} onCheck={this.handleCheckAllTodos}/>
                <div className={styles.list}>
                    {Object.keys(todos).map(key =>
                        <TodoItem
                            todo={todos[key]} todoKey={key} key={key} onCheck={this.handleCheckTodo}
                            onDelete={this.handleDeleteTodo}
                        />
                    )}
                </div>
            </>
        );
    }

    loadData = async () => {
        const todos = await api.select();
        this.setState({todos});
    };

    handleAddTodo = async (text: Todo["text"]) => {
        const todos = todosConstructor.add(this.state.todos, text);
        const response = await api.update(todos);
        this.setState({todos: todosConstructor.extract(response)});
    };

    handleCheckTodo = async (key: string) => {
        const todos = todosConstructor.updateStatus(this.state.todos, key);
        const response = await api.update(todos);
        this.setState({todos: todosConstructor.extract(response)});
    };

    handleCheckAllTodos = async () => {
        const todos = todosConstructor.updateAllStatuses(this.state.todos);
        const response = await api.update(todos);
        this.setState({todos: todosConstructor.extract(response)});
    };

    handleDeleteTodo = async (key: string) => {
        const todos = todosConstructor.delete(this.state.todos, key);
        const response = await api.update(todos);
        this.setState({todos: todosConstructor.extract(response)});
    }
}
