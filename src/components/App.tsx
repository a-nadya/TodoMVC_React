import * as React from "react";

import { api } from "../api/api";
import { itemsCount } from "../api/itemsCount";
import { todosConstructor } from "../api/todosConstructor";
import { Todo } from "../models/todo";
import { Todos } from "../models/todos";

import * as cn from "./App.less";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { TodoList } from "./TodoList/TodoList";

interface TodosState {
    todos: Todos;
    filterCondition: FilterCondition;
    loading: boolean;
}

export enum FilterCondition {
    all = "All",
    active = "Active",
    completed = "Completed",
}

export class App extends React.Component<{}, TodosState> {
    public state: TodosState = {
        todos: {},
        filterCondition: FilterCondition.all,
        loading: true,
    };

    public async componentDidMount(): Promise<void> {
        await this.loadData();
    }

    public render(): React.ReactNode {
        const activeItems: number = itemsCount.getActive(this.state.todos);
        const completedItems: number = itemsCount.getCompleted(
            this.state.todos
        );

        return (
            !this.state.loading && (
                <>
                    <header>todos</header>
                    <div className={cn("content")}>
                        <Header
                            checkboxValue={activeItems === 0}
                            onEnter={this.handleAddTodo}
                            onCheck={this.handleCheckAllTodos}
                        />
                        <TodoList
                            todos={this.state.todos}
                            onCheck={this.handleCheckTodo}
                            onDelete={this.handleDeleteTodo}
                            filterCondition={this.state.filterCondition}
                        />

                        {completedItems + activeItems > 0 && (
                            <Footer
                                itemsLeftValue={activeItems}
                                onFilter={this.handleFilterTodo}
                                onClear={this.handleClearCompletedTodo}
                                shouldClearCompletedButtonShow={
                                    completedItems > 0
                                }
                            />
                        )}
                    </div>
                </>
            )
        );
    }

    private readonly loadData = async (): Promise<void> => {
        const todos = await api.select();
        this.setState({
            todos: todos,
            loading: false,
        });
    };

    private readonly handleAddTodo = async (
        text: Todo["text"]
    ): Promise<void> => {
        const todos = todosConstructor.add(this.state.todos, text);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleCheckTodo = async (key: string): Promise<void> => {
        const todos = todosConstructor.updateStatus(this.state.todos, key);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleCheckAllTodos = async (): Promise<void> => {
        const todos = todosConstructor.updateAllStatuses(this.state.todos);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleDeleteTodo = async (key: string): Promise<void> => {
        const todos = todosConstructor.delete(this.state.todos, key);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleFilterTodo = (value: FilterCondition): void => {
        this.setState({ filterCondition: value });
    };

    private readonly handleClearCompletedTodo = async (): Promise<void> => {
        const todos = todosConstructor.deleteCompleted(this.state.todos);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly updateStateAndDataOnServer = async (
        todos: Todos
    ): Promise<void> => {
        const response = await api.update(todos);
        this.setState({
            todos: todosConstructor.extract(response),
        });
    };
}
