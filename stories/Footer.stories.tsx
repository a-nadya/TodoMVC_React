import * as React from "react";

import { Footer } from "../src/components/Footer/Footer";

export default { title: "Footer" };

export const footer = () => (
    <>
        <Footer
            onClear={() => {}}
            onFilter={() => {}}
            itemsLeftValue={999}
            clearCompletedButtonVisible={true}
        />
    </>
);
