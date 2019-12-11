import * as React from "react";

import { FilterButton } from "../src/components/Footer/FilterButton/FilterButton";

export default { title: "FilterButton" };

export const twoButtons = () => (
    <>
        <FilterButton filterName={"All"} onFilter={() => {}} />
        <FilterButton filterName={"Completed"} onFilter={() => {}} />
    </>
);
