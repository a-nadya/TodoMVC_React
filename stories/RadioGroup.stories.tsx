import * as React from "react";

import { FilterCondition } from "../src/components/App";
import { RadioGroup } from "../src/components/Footer/RadioGroup/RadioGroup";

export default { title: "RadioGroup" };

export const group = () => (
    <>
        <RadioGroup
            name="aaa"
            values={[FilterCondition.completed, FilterCondition.active]}
            onFilter={() => {}}
        />
    </>
);
