import * as React from "react";

import { UnderlinedButton } from "../src/components/Footer/UnderlinedButton/UnderlinedButton";

export default { title: "UnderlinedButton" };

export const button = () => (
    <UnderlinedButton name="Clear completed" onClear={() => {}} />
);
