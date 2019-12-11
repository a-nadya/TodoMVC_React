import * as React from "react";

import { CheckAllButton } from "./CheckAllButton/CheckAllButton";
import * as cn from "./SearchLine.less";

interface InputState {
    inputValue: string;
}

interface InputProps {
    checkboxValue: boolean;
    onEnter: (value: string) => void;
    onCheck: () => void;
}

export class SearchLine extends React.Component<InputProps, InputState> {
    public state: InputState = {
        inputValue: "",
    };

    public render(): React.ReactElement {
        return (
            <div className={cn("inputContainer")}>
                {/*//TODO: считать количество сделанных и передавать в value*/}
                <CheckAllButton
                    value={this.props.checkboxValue}
                    onCheck={this.props.onCheck}
                />
                <input
                    className={cn("input")}
                    placeholder="What needs to be done?"
                    value={this.state.inputValue}
                    onKeyDown={this.keyPress}
                    onChange={this.handleChange}
                />
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
        if (event.keyCode === 13 && value !== "") {
            this.setState({ inputValue: "" });
            this.props.onEnter(value);
        }
    };
}
