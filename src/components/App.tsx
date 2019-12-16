import * as React from "react";

import { api } from "../api/api";
import { itemsCount } from "../api/itemsCount";
import { todosConstructor } from "../api/todosConstructor";
import { Empty } from "../models/empty";
import { Todo } from "../models/todo";
import { Todos } from "../models/todos";

import * as cn from "./App.less";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { TodoList } from "./TodoList/TodoList";

interface TodosState {
    todos: Todos;
    filterCondition: string;
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
        const items = completedItems + activeItems;

        return (
            !this.state.loading && (
                <>
                    <header>todos</header>
                    <div className={cn("content")}>
                        <Header
                            checkboxValue={activeItems === 0}
                            shouldCheckAllButtonShow={items > 0}
                            onEnter={this.handleAddTodo}
                            onCheck={this.handleCheckAllTodos}
                        />
                        <TodoList
                            todos={this.state.todos}
                            filterCondition={this.state.filterCondition}
                            onCheck={this.handleCheckTodo}
                            onDelete={this.handleDeleteTodo}
                            onEdit={this.handleEditTodo}
                        />

                        {items > 0 && (
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
        const todos = todosConstructor.validateEmpty(await api.select());
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

    private readonly handleCheckTodo = async (id: string): Promise<void> => {
        const todos = todosConstructor.updateStatus(this.state.todos, id);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleCheckAllTodos = async (): Promise<void> => {
        const todos = todosConstructor.updateAllStatuses(this.state.todos);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleDeleteTodo = async (id: string): Promise<void> => {
        const todos = todosConstructor.delete(this.state.todos, id);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleEditTodo = async (
        id: string,
        value: string
    ): Promise<void> => {
        const todos = todosConstructor.edit(this.state.todos, id, value);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleFilterTodo = (value: string): void => {
        this.setState({ filterCondition: value });
    };

    private readonly handleClearCompletedTodo = async (): Promise<void> => {
        const todos = todosConstructor.deleteCompleted(this.state.todos);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly updateStateAndDataOnServer = async (
        todos: Todos | Empty
    ): Promise<void> => {
        this.setState(() => {
            return {
                todos: { ...todosConstructor.validateEmpty(todos) },
            };
        });
        const response = await api.update(todos);
        if (
            JSON.stringify(todosConstructor.validateEmpty(todos)) !==
            JSON.stringify(todosConstructor.extract(response))
        ) {
            console.log("что-то пошло не так");
        }
    };
}
