import * as React from "react";

import { Button } from "../src/components/Footer/Button/Button";

export default { title: "Button" };

export const button = () => (
    <Button name="Clear completed" onClear={() => {}} shouldShow={true}/>
);
