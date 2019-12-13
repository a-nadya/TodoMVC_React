import * as React from "react";

import { FilterCondition } from "../src/components/App";
import { RadioButton } from "../src/components/Footer/RadioButton/RadioButton";

export default { title: "RadioButton" };

export const defaultCheckedButton = () => (
    <>
        <RadioButton
            name="aaa"
            filterValue={FilterCondition.all}
            onFilter={() => {}}
        />
    </>
);

export const twoButtons = () => (
    <>
        <RadioButton
            name="aaa"
            filterValue={FilterCondition.all}
            onFilter={() => {}}
        />
        <RadioButton
            name="aaa"
            filterValue={FilterCondition.completed}
            onFilter={() => {}}
        />
    </>
);
