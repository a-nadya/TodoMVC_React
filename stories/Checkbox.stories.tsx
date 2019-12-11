import * as React from "react";

import { Checkbox } from "../src/components/TodoItem/Checkbox/Checkbox";

export default { title: "Checkbox" };

export const checked = () => <Checkbox value={true} onCheck={() => {}} />;

export const unchecked = () => <Checkbox value={false} onCheck={() => {}} />;

export const twoCheckboxes = () => (
    <>
        <Checkbox value={true} onCheck={() => {}} />
        <Checkbox value={true} onCheck={() => {}} />
    </>
);
