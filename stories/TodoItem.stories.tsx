import * as React from "react";

import { TodoItem } from "../src/components/TodoItem/TodoItem";

export default { title: "TodoItem" };

export const active = () => (
    <TodoItem
        todo={{ active: true, text: "testtesttest" }}
        id={"737373"}
        onDelete={() => {}}
        onChange={() => {}}
    />
);

export const completed = () => (
    <TodoItem
        todo={{ active: false, text: "HELLO" }}
        id={"737373"}
        onDelete={() => {}}
        onChange={() => {}}
    />
);
