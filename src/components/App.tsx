import * as React from "react";

import { Api } from "../api/Api";
import { itemsCount } from "../api/ItemsCount";
import { todosConstructor } from "../api/TodosConstructor";
import { Todo } from "../models/todo";
import { Todos } from "../models/todos";

import * as cn from "./App.less";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { TodoList } from "./TodoList/TodoList";

interface AppState {
    todos: Todos;
    filterCondition: string;
    loading: boolean;
}

export enum FilterCondition {
    all = "All",
    active = "Active",
    completed = "Completed",
}

const binId = "5dd9060c040d843991f79576";
const api = new Api(binId);

export class App extends React.Component<{}, AppState> {
    public state: AppState = {
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
                            checkAllButtonChecked={activeItems === 0}
                            checkAllButtonVisible={items > 0}
                            onAdd={this.handleAddTodo}
                            onCheck={this.handleCheckAllTodos}
                        />
                        <TodoList
                            todos={this.state.todos}
                            filterCondition={this.state.filterCondition}
                            onChange={this.handleEditTodo}
                            onDelete={this.handleDeleteTodo}
                        />

                        {items > 0 && (
                            <Footer
                                itemsLeftValue={activeItems}
                                onFilter={this.handleFilterTodo}
                                onClear={this.handleClearCompletedTodo}
                                clearCompletedButtonVisible={completedItems > 0}
                            />
                        )}
                    </div>
                </>
            )
        );
    }

    private readonly loadData = async (): Promise<void> => {
        let response = {};
        try {
            response = await api.select();
        } catch (e) {
            console.log("ошибка поймана, разбираемся");
        }
        const todos = todosConstructor.validateEmpty(response);
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
        todo: Todo
    ): Promise<void> => {
        const todos = todosConstructor.edit(this.state.todos, id, todo);
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
        todos: Todos
    ): Promise<void> => {
        this.setState(() => {
            return {
                todos: { ...todosConstructor.validateEmpty(todos) },
            };
        });
        try {
            await api.update(todos);
        } catch {
            console.log("ошибка поймана, разбираемся");
        }
    };
}
