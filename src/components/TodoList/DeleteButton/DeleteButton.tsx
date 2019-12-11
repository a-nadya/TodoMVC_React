import * as React from "react";

import * as cn from "./DeleteButton.less";

interface DeleteButtonProps {
    onDelete: () => void;
}

export function DeleteButton(props: DeleteButtonProps): React.ReactElement {
    return <button className={cn("delete-button")} onClick={props.onDelete} />;
}
