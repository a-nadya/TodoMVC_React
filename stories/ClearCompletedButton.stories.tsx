import * as React from "react";

import { ClearCompletedButton } from "../src/components/Footer/ClearCompletedButton/ClearCompletedButton";

export default { title: "ClearCompletedButton" };

export const button = () => (
    <ClearCompletedButton onClear={() => {}} shouldShow={true}/>
);
