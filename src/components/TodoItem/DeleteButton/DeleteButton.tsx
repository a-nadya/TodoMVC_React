import * as React from "react";

import * as cn from "./DeleteButton.less";

interface DeleteButtonProps {
    onClick: () => void;
}

export function DeleteButton(props: DeleteButtonProps): React.ReactElement {
    return <button className={cn("delete-button")} onClick={props.onClick} />;
}
