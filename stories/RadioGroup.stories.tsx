import * as React from "react";

import { RadioGroup } from "../src/components/Footer/RadioGroup/RadioGroup";

export default { title: "RadioGroup" };

export const group = () => (
    <>
        <RadioGroup
            name="aaa"
            values={["Oneeee", "Two"]}
            onCheck={() => {}}
        />
    </>
);
