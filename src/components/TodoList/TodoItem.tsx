// import classNames from "classnames";
// import * as React from "react";
//
// import { Todo } from "../../models/todo";
//
// import { Checkbox } from "./Checkbox";
// import * as styles from "./TodoItem.less";
//
// interface TodoComponentProps {
//     todo: Todo;
//     id: string;
//     // filterCondition: string;
//     onCheck: (id: string) => void;
//     onDelete: (id: string) => void;
// }
//
// export class TodoItem extends React.Component<TodoComponentProps> {
//     public render(): React.ReactNode {
//         return (
//             // this.shouldItemShow() && (
//             <div className={styles.todo}>
//                 <Checkbox
//                     value={!this.props.todo.active}
//                     onCheck={() => this.props.onCheck(this.props.id)}
//                 />
//                 <input
//                     className={classNames(
//                         { [`${styles.text}`]: true },
//                         { [`${styles.completed}`]: !this.props.todo.active }
//                     )}
//                     value={this.props.todo.text}
//                     readOnly={true}
//                 />
//                 <button
//                     className={styles.closeButton}
//                     onClick={() => this.props.onDelete(this.props.id)}>
//                     x
//                 </button>
//             </div>
//         );
//         // );
//     }
//
//     // private readonly shouldItemShow = (): boolean => {
//     //     switch (this.props.filterCondition) {
//     //         case "all":
//     //             return true;
//     //         case "active":
//     //             return this.props.todo.active;
//     //         case "completed":
//     //             return !this.props.todo.active;
//     //         default:
//     //             return false;
//     //     }
//     // };
// }
