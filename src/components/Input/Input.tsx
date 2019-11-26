import * as React from "react";

const styles = require("./Input.less");

interface InputState {
    inputValue: string;
}

interface InputProps {
    onEnter: (value: string) => void;
    onCheck: () => void;
}

export default class Input extends React.Component<InputProps, InputState> {
    state: InputState = {
        inputValue: ""
    };

    render(): React.ReactElement {
        return (
            <div className={styles.inputContainer}>
                <input type="checkbox" onChange={this.props.onCheck}/>
                <input className={styles.input}
                       placeholder="What needs to be done?" value={this.state.inputValue}
                       onKeyDown={this.keyPress} onChange={this.handleChange}
                />
            </div>
        )
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (event.keyCode === 13 && value !== "") {
            this.setState({inputValue: ""});
            this.props.onEnter(value);
        }
    }
}
