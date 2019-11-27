import * as React from "react";
import Input from "./Input/Input";
import {api} from "../api/api";
import {todosConstructor} from "../api/todosConstructor";
import {TodoItem} from "./TodoList/TodoItem";
import {Todos} from "../models/todos";
import {Todo} from "../models/todo";
import {Footer} from "./Footer/Footer";
import {itemsCount} from "../api/itemsCount";

const styles = require("./app.less");

interface TodosState {
    todos: Todos;
    activeItems: number;
    completedItems: number;
    filterCondition: string;
    loading: boolean;
}

export default class App extends React.Component<{}, TodosState> {
    state: TodosState = {
        todos: {},
        activeItems: 0,
        completedItems: 0,
        filterCondition: "all",
        loading: true,
    };

    componentDidMount(): void {
        this.loadData();
    }

    render(): React.ReactNode {
        return (
            (!this.state.loading &&
                <>
                    <header>todos</header>
                    <div className={styles.content}>
                        <Input onEnter={this.handleAddTodo} onCheck={this.handleCheckAllTodos}/>
                        <div className={styles.list}>
                            {Object.keys(this.state.todos).map(key =>
                                <TodoItem
                                    todo={this.state.todos[key]} todoKey={key} key={key} onCheck={this.handleCheckTodo}
                                    onDelete={this.handleDeleteTodo} filterCondition={this.state.filterCondition}
                                />
                            )}
                        </div>
                        {
                            this.shouldFooterShow() &&
                            <Footer itemsLeft={this.state.activeItems} onFilter={this.handleFilterTodo}
                                    onClear={this.handleClearCompletedTodo}
                                    shouldClearCompletedShow={this.shouldClearCompletedShow()}/>
                        }
                    </div>
                </>
            )
        );
    }

    private loadData = async (): Promise<void> => {
        const todos = await api.select();
        this.setState({
            todos,
            activeItems: itemsCount.getActive(todos),
            completedItems: itemsCount.getCompleted(todos),
            loading: false
        });
    };

    private handleAddTodo = async (text: Todo["text"]): Promise<void> => {
        const todos = todosConstructor.add(this.state.todos, text);
        this.updateStateAndDataOnServer(todos);
    };

    private handleCheckTodo = async (key: string): Promise<void> => {
        const todos = todosConstructor.updateStatus(this.state.todos, key);
        this.updateStateAndDataOnServer(todos);
    };

    private handleCheckAllTodos = async (): Promise<void> => {
        const todos = todosConstructor.updateAllStatuses(this.state.todos);
        this.updateStateAndDataOnServer(todos);
    };

    private handleDeleteTodo = async (key: string): Promise<void> => {
        const todos = todosConstructor.delete(this.state.todos, key);
        this.updateStateAndDataOnServer(todos);
    };

    private handleFilterTodo = (flag: string): void => {
        this.setState({filterCondition: flag});
    };

    private handleClearCompletedTodo = async (): Promise<void> => {
        const todos = todosConstructor.deleteCompleted(this.state.todos);
        this.updateStateAndDataOnServer(todos);
    };

    private updateStateAndDataOnServer = async (todos: Todos): Promise<void> => {
        const response = await api.update(todos);
        this.setState({
            todos: todosConstructor.extract(response),
            activeItems: itemsCount.getActive(todos),
            completedItems: itemsCount.getCompleted(todos)
        });
    };

    private shouldFooterShow = (): boolean => {
        return (this.state.completedItems + this.state.activeItems > 0);
    };

    private shouldClearCompletedShow = (): boolean => {
        return (this.state.completedItems > 0);
    }
}
