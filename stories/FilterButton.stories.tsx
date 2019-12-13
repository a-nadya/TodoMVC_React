import * as React from "react";

import { RadioButton } from "../src/components/Footer/RadioButton/RadioButton";

export default { title: "RadioButton" };

export const twoButtons = () => (
    <>
        <RadioButton filterValue={"All"} onFilter={() => {}} />
        <RadioButton filterValue={"Completed"} onFilter={() => {}} />
    </>
);
