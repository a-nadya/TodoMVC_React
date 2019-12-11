import * as React from "react";

import { TodoList } from "../src/components/TodoList/TodoList";

export default { title: "TodoList" };

export const list = () => (
    <TodoList
        todos={{
            "324243": { active: true, text: "lalalalala" },
            "444": { active: false, text: "qwer" },
            "423223": { active: true, text: "DDFDFFDDFDFFD" },
        }}
        onCheck={() => {}}
        onDelete={() => {}}
        filterCondition={"all"}
    />
);
