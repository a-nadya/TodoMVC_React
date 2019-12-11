import * as React from "react";

import {SearchLine} from "../src/components/SearchLine/SearchLine";

export default { title: "SearchLine" };

export const allChecked = () => <SearchLine checkboxValue={true} onCheck={() => {}} onEnter={() => {}} />;
