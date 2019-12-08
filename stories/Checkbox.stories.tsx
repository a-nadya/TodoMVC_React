import * as React from "react";

import { Checkbox } from "../src/components/TodoList/Checkbox";

export default { title: "Checkbox" };

export const checkboxDefault = () => (
    <Checkbox
        todoKey={"44"}
        todo={{ active: true, text: "test" }}
        onCheck={() => {}}
    />
);
