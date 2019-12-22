import * as React from "react";

import { FilterCondition } from "../src/components/App";
import { RadioButton } from "../src/components/Footer/RadioButton/RadioButton";

export default { title: "RadioButton" };

export const defaultCheckedButton = () => (
    <>
        <RadioButton
            name="aaa"
            value={FilterCondition.all}
            onChange={() => {}}
        />
    </>
);

export const twoButtons = () => (
    <>
        <RadioButton
            name="aaa"
            value={FilterCondition.all}
            onChange={() => {}}
        />
        <RadioButton
            name="aaa"
            value={FilterCondition.completed}
            onChange={() => {}}
        />
    </>
);
