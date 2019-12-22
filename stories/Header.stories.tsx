import * as React from "react";

import { Header } from "../src/components/Header/Header";

export default { title: "SearchLine" };

export const allChecked = () => (
    <Header
        checkAllButtonVisible={true}
        checkAllButtonChecked={true}
        onCheck={() => {}}
        onAdd={() => {}}
    />
);
