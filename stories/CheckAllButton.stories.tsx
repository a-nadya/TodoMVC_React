import * as React from "react";

import { CheckAllButton } from "../src/components/Header/CheckAllButton/CheckAllButton";

export default { title: "CheckAllButton" };

export const checked = () => (
    <CheckAllButton value={true} onCheck={() => {}} />
);

export const unchecked = () => (
    <CheckAllButton value={false} onCheck={() => {}} />
);

export const twoCheckAllButton = () => (
    <>
        <CheckAllButton value={true} onCheck={() => {}} />
        <CheckAllButton value={true} onCheck={() => {}} />
    </>
);
