import * as React from "react";

import { Checkbox } from "../src/components/TodoList/Checkbox";

export default { title: "Checkbox" };

export const checked = () => (
    <Checkbox value={true} onCheck={() => {}} />
);

export const unchecked = () => (
    <Checkbox value={false} onCheck={() => {}} />
);
