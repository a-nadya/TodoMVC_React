import * as React from "react";

import { Footer } from "../src/components/Footer/Footer";

export default { title: "Footer" };

export const footer = () => (
    <>
        <Footer
            onClear={() => {}}
            onFilter={() => {}}
            itemsLeft={999}
            shouldClearCompletedButtonShow={true}
        />
    </>
);
