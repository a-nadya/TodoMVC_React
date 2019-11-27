import * as React from "react";
import Input from "./Input/Input";
import {api} from "../api/api";
import {todosConstructor} from "../api/todosConstructor";
import {TodoItem} from "./TodoList/TodoItem";
import {Todos} from "../models/todos";
import {Todo} from "../models/todo";
import {Footer} from "./Footer/Footer";
import {activeItemsCount} from "../api/activeItemsCount";

const styles = require("./app.less");

interface TodosState {
    todos: Todos;
    itemsLeft: number;
    filterCondition: string;
    loading: boolean;
}

export default class App extends React.Component<{}, TodosState> {
    state: TodosState = {
        todos: {},
        itemsLeft: 0,
        filterCondition: "all",
        loading: true,
    };

    componentDidMount(): void {
        this.loadData();
    }

    render(): React.ReactNode {
        const {todos} = this.state;
        return (
            (!this.state.loading &&
                <>
                    <header>todos</header>
                    <div className={styles.content}>
                        <Input onEnter={this.handleAddTodo} onCheck={this.handleCheckAllTodos}/>
                        <div className={styles.list}>
                            {Object.keys(todos).map(key =>
                                <TodoItem
                                    todo={todos[key]} todoKey={key} key={key} onCheck={this.handleCheckTodo}
                                    onDelete={this.handleDeleteTodo} filterCondition={this.state.filterCondition}
                                />
                            )}
                        </div>
                        <Footer itemsLeft={this.state.itemsLeft} onFilter={this.handleFilterTodo}
                                onClear={this.handleClearCompletedTodo}/>
                    </div>
                </>
            )
        );
    }

    loadData = async () => {
        const todos = await api.select();
        const count = activeItemsCount.get(todos);
        this.setState({todos, itemsLeft: count, loading: false});
    };

    handleAddTodo = async (text: Todo["text"]) => {
        const todos = todosConstructor.add(this.state.todos, text);
        const response = await api.update(todos);
        const count = activeItemsCount.get(todos);
        this.setState({todos: todosConstructor.extract(response), itemsLeft: count});
    };

    handleCheckTodo = async (key: string) => {
        const todos = todosConstructor.updateStatus(this.state.todos, key);
        const response = await api.update(todos);
        const count = activeItemsCount.get(todos);
        this.setState({todos: todosConstructor.extract(response), itemsLeft: count});
    };

    handleCheckAllTodos = async () => {
        const todos = todosConstructor.updateAllStatuses(this.state.todos);
        const response = await api.update(todos);
        const count = activeItemsCount.get(todos);
        this.setState({todos: todosConstructor.extract(response), itemsLeft: count});

    };

    handleDeleteTodo = async (key: string) => {
        const todos = todosConstructor.delete(this.state.todos, key);
        const response = await api.update(todos);
        const count = activeItemsCount.get(todos);
        this.setState({todos: todosConstructor.extract(response), itemsLeft: count});
    };

    handleFilterTodo = (flag: string) => {
        this.setState({filterCondition: flag});
    };

    handleClearCompletedTodo = async () => {
        const todos = todosConstructor.deleteCompleted(this.state.todos);
        const response = await api.update(todos);
        const count = activeItemsCount.get(todos);
        this.setState({todos: todosConstructor.extract(response), itemsLeft: count});
    };
}
