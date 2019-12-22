import * as React from "react";

import { CheckAllButton } from "./CheckAllButton/CheckAllButton";
import * as cn from "./Header.less";

interface HeaderState {
    inputValue: string;
}

interface HeaderProps {
    checkAllButtonChecked: boolean;
    checkAllButtonVisible: boolean;
    onAdd: (value: string) => void;
    onCheck: () => void;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    public state: HeaderState = {
        inputValue: "",
    };

    public render(): React.ReactElement {
        return (
            <div className={cn("inputContainer")}>
                <div
                    className={cn("check-all-button", {
                        hidden: !this.props.checkAllButtonVisible,
                    })}>
                    <CheckAllButton
                        value={this.props.checkAllButtonChecked}
                        onCheck={this.props.onCheck}
                    />
                </div>
                <input
                    className={cn("input")}
                    placeholder="What needs to be done?"
                    value={this.state.inputValue}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

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
        if (event.keyCode === 13 && value !== "") {
            this.setState({ inputValue: "" });
            this.props.onAdd(value);
        }
    };
}
