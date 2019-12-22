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
        inputValue: this.props.todo.text,
        isEditing: false,
    };

    public render(): React.ReactNode {
        return (
            <div className={cn("todo")}>
                <div
                    className={cn("checkbox", {
                        hidden: this.state.isEditing,
                    })}>
                    <Checkbox
                        value={!this.props.todo.active}
                        onChange={() =>
                            this.props.onChange(this.props.id, {
                                ...this.props.todo,
                                active: !this.props.todo.active,
                            })
                        }
                    />
                </div>
                {!this.state.isEditing && (
                    <>
                        <div
                            className={cn("text", {
                                completed: !this.props.todo.active,
                            })}
                            onDoubleClick={() =>
                                this.setState({ isEditing: true })
                            }>
                            {this.props.todo.text}
                        </div>
                        <div className={cn("delete-button")}>
                            <DeleteButton
                                onDelete={() =>
                                    this.props.onDelete(this.props.id)
                                }
                            />
                        </div>
                    </>
                )}
                {this.state.isEditing && (
                    <input
                        className={cn("input")}
                        onKeyDown={this.handleKeyPress}
                        onBlur={this.handleBlur}
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        autoFocus={true}
                    />
                )}
            </div>
        );
    }

    public handleBlur = () => {
        this.setState({ isEditing: false });
        this.props.onChange(this.props.id, {
            ...this.props.todo,
            text: this.state.inputValue,
        });
    };

    private readonly handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState({
            inputValue: event.target.value,
        });
    };

    private readonly handleKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        const value = event.currentTarget.value;
        if (event.keyCode === 13) {
            this.setState({ isEditing: false });
            this.props.onChange(this.props.id, {
                ...this.props.todo,
                text: value,
            });
        }
    };
}
