import * as React from "react";

import { Todo } from "../../models/todo";

import { Checkbox } from "./Checkbox/Checkbox";
import { DeleteButton } from "./DeleteButton/DeleteButton";
import * as cn from "./TodoItem.less";

interface TodoItemState {
    inputValue: string;
    isEditing: boolean;
}

interface TodoItemProps {
    id: string;
    todo: Todo;
    onChange: (id: string, nextTodo: Todo) => void;
    onDelete: (id: string) => void;
}

export class TodoItem extends React.Component<TodoItemProps> {
    public state: TodoItemState = {
        inputValue: "",
        isEditing: false,
    };

    public render(): React.ReactNode {
        const { isEditing } = this.state;
        const { todo } = this.props;

        return (
            <div className={cn("todo")}>
                <div className={cn("checkbox", { hidden: isEditing })}>
                    <Checkbox
                        value={!todo.active}
                        onChange={this.handleChangeTodoStatus}
                    />
                </div>
                {isEditing ? this.renderItemEdit() : this.renderItemView()}
            </div>
        );
    }

    public handleBlur = () => {
        this.finishEditing();
    };

    private readonly handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13) {
            this.finishEditing();
        }
    };

    private readonly handleChangeTodoStatus = () => {
        this.updateTodo({ active: !this.props.todo.active });
    };

    private renderItemEdit(): JSX.Element {
        return (
            <input
                className={cn("input")}
                onKeyDown={this.handleKeyPress}
                onBlur={this.handleBlur}
                value={this.state.inputValue}
                onChange={this.handleChange}
                autoFocus={true}
            />
        );
    }

    private renderItemView(): JSX.Element {
        return (
            <>
                <div
                    className={cn("text", {
                        completed: !this.props.todo.active,
                    })}
                    onDoubleClick={this.startEditing}>
                    {this.props.todo.text}
                </div>
                <div className={cn("delete-button")}>
                    <DeleteButton
                        onClick={() => this.props.onDelete(this.props.id)}
                    />
                </div>
            </>
        );
    }

    private readonly startEditing = () => {
        this.setState({ isEditing: true, inputValue: this.props.todo.text });
    };

    private finishEditing(): void {
        this.setState({ isEditing: false });
        this.updateTodo({ text: this.state.inputValue });
    }

    private updateTodo(todoUpdate: Partial<Todo>): void {
        this.props.onChange(this.props.id, {
            ...this.props.todo,
            ...todoUpdate,
        });
    }

    private readonly handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState({
            inputValue: event.target.value,
        });
    };
}
