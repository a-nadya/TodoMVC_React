import * as React from "react";

import { CheckAllButton } from "../src/components/Header/CheckAllButton/CheckAllButton";

export default { title: "CheckAllButton" };

export const checked = () => (
    <CheckAllButton shouldShow={true} value={true} onCheck={() => {}} />
);

export const unchecked = () => (
    <CheckAllButton shouldShow={true} value={false} onCheck={() => {}} />
);

export const twoCheckAllButton = () => (
    <>
        <CheckAllButton shouldShow={true} value={true} onCheck={() => {}} />
        <CheckAllButton shouldShow={true} value={true} onCheck={() => {}} />
    </>
);
