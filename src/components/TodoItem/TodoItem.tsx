import * as React from "react";

import { Todo } from "../../models/todo";

import { Checkbox } from "./Checkbox/Checkbox";
import { DeleteButton } from "./DeleteButton/DeleteButton";
import * as cn from "./TodoItem.less";

interface TodoComponentState {
    inputValue: string;
    isEditing: boolean;
}

interface TodoComponentProps {
    id: string;
    todo: Todo;
    onCheck: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, value: string) => void;
}

export class TodoItem extends React.Component<TodoComponentProps> {
    public state: TodoComponentState = {
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
                        onCheck={() => this.props.onCheck(this.props.id)}
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
                        onKeyDown={this.keyPress}
                        onBlur={this.blur}
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        autoFocus={true}
                    />
                )}
            </div>
        );
    }

    public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputValue: event.target.value,
        });
    };

    public keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (event.keyCode === 13) {
            this.setState({ isEditing: false });
            this.props.onEdit(this.props.id, value);
        }
    };

    public blur = () => {
        this.setState({ isEditing: false });
        this.props.onEdit(this.props.id, this.state.inputValue);
    };
}
