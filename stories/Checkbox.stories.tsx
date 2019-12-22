import * as React from "react";

import { Checkbox } from "../src/components/TodoItem/Checkbox/Checkbox";

export default { title: "Checkbox" };

export const checked = () => <Checkbox value={true} onChange={() => {}} />;

export const unchecked = () => <Checkbox value={false} onChange={() => {}} />;

export const twoCheckboxes = () => (
    <>
        <Checkbox value={true} onChange={() => {}} />
        <Checkbox value={true} onChange={() => {}} />
    </>
);
