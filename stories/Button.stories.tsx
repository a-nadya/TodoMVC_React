import * as React from "react";

import { Checkbox } from "../src/components/TodoList/Checkbox";

export default { title: "Button" };

export const withText = () => (
    <Checkbox
        todo={{ active: false, text: "zzzz" }}
        todoKey={"1"}
        onCheck={() => {}}
    />
);
