import * as React from "react";

import { Api } from "../api/Api";
import { TodoUtils } from "../api/TodosConstructor";
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
        const { todos } = this.state;
        const count = Object.values(todos).length;
        const activeCount = Object.values(todos).filter(x => x.active).length;
        const completedCount = Object.values(todos).filter(x => !x.active)
            .length;

        return (
            !this.state.loading && (
                <>
                    <header>todos</header>
                    <div className={cn("content")}>
                        <Header
                            checkAllButtonChecked={activeCount === 0}
                            checkAllButtonVisible={count > 0}
                            onAdd={this.handleAddTodo}
                            onCheck={this.handleCheckAllTodos}
                        />
                        <TodoList
                            todos={this.state.todos}
                            filterCondition={this.state.filterCondition}
                            onChange={this.handleEditTodo}
                            onDelete={this.handleDeleteTodo}
                        />

                        {count > 0 && (
                            <Footer
                                itemsLeftValue={activeCount}
                                onFilter={this.handleFilterTodo}
                                onClear={this.handleClearCompletedTodo}
                                clearCompletedButtonVisible={completedCount > 0}
                            />
                        )}
                    </div>
                </>
            )
        );
    }

    private readonly loadData = async (): Promise<void> => {
        try {
            const todos = await api.select();
            this.setState({
                todos: todos,
                loading: false,
            });
        } catch (e) {
            console.log("ошибка поймана, разбираемся");
        }
    };

    private readonly handleAddTodo = async (
        text: Todo["text"]
    ): Promise<void> => {
        const todos = TodoUtils.addTodo(this.state.todos, text);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleCheckAllTodos = async (
        status: boolean
    ): Promise<void> => {
        const todos = TodoUtils.updateAllTodosStatus(this.state.todos, !status);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleDeleteTodo = async (id: string): Promise<void> => {
        const todos = TodoUtils.deleteTodo(this.state.todos, id);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleEditTodo = async (
        id: string,
        todo: Todo
    ): Promise<void> => {
        const todos = TodoUtils.editTodo(this.state.todos, id, todo);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly handleFilterTodo = (value: string): void => {
        this.setState({ filterCondition: value });
    };

    private readonly handleClearCompletedTodo = async (): Promise<void> => {
        const todos = TodoUtils.deleteCompletedTodos(this.state.todos);
        await this.updateStateAndDataOnServer(todos);
    };

    private readonly updateStateAndDataOnServer = async (
        todos: Todos
    ): Promise<void> => {
        this.setState({ todos: todos });
        try {
            await api.update(todos);
        } catch {
            console.log("ошибка поймана, разбираемся");
        }
    };
}
