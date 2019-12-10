// import * as React from "react";
//
// import { api } from "../api/api";
// import { itemsCount } from "../api/itemsCount";
// import { todosConstructor } from "../api/todosConstructor";
// import { Todo } from "../models/todo";
// import { Todos } from "../models/todos";
//
// import * as styles from "./app.less";
// import { Footer } from "./Footer/Footer";
// import { Input } from "./Input/Input";
// import { TodoItem } from "./TodoList/TodoItem";
//
// interface TodosState {
//     todos: Todos;
//     activeItems: number;
//     completedItems: number;
//     filterCondition: string;
//     loading: boolean;
// }
//
// export class App extends React.Component<{}, TodosState> {
//     public state: TodosState = {
//         todos: {},
//         activeItems: 0,
//         completedItems: 0,
//         filterCondition: "all",
//         loading: true,
//     };
//
//     public async componentDidMount(): Promise<void> {
//         await this.loadData();
//     }
//
//     public render(): React.ReactNode {
//         return (
//             !this.state.loading && (
//                 <>
//                     <header>todos</header>
//                     <div className={styles.content}>
//                         <Input
//                             onEnter={this.handleAddTodo}
//                             onCheck={this.handleCheckAllTodos}
//                         />
//                         <div className={styles.list}>
//                             {Object.keys(this.state.todos).map(key => (
//                                 <TodoItem
//                                     todo={this.state.todos[key]}
//                                     id={key}
//                                     key={key}
//                                     onCheck={this.handleCheckTodo}
//                                     onDelete={this.handleDeleteTodo}
//                                     // filterCondition={this.state.filterCondition}
//                                 />
//                             ))}
//                         </div>
//                         {this.shouldFooterShow() && (
//                             <Footer
//                                 itemsLeft={this.state.activeItems}
//                                 onFilter={this.handleFilterTodo}
//                                 onClear={this.handleClearCompletedTodo}
//                                 shouldClearCompletedShow={this.shouldClearCompletedShow()}
//                             />
//                         )}
//                     </div>
//                 </>
//             )
//         );
//     }
//
//     private readonly loadData = async (): Promise<void> => {
//         const todos = await api.select();
//         this.setState({
//             todos: todos,
//             activeItems: itemsCount.getActive(todos),
//             completedItems: itemsCount.getCompleted(todos),
//             loading: false,
//         });
//     };
//
//     private readonly handleAddTodo = async (
//         text: Todo["text"]
//     ): Promise<void> => {
//         const todos = todosConstructor.add(this.state.todos, text);
//         await this.updateStateAndDataOnServer(todos);
//     };
//
//     private readonly handleCheckTodo = async (key: string): Promise<void> => {
//         const todos = todosConstructor.updateStatus(this.state.todos, key);
//         await this.updateStateAndDataOnServer(todos);
//     };
//
//     private readonly handleCheckAllTodos = async (): Promise<void> => {
//         const todos = todosConstructor.updateAllStatuses(this.state.todos);
//         await this.updateStateAndDataOnServer(todos);
//     };
//
//     private readonly handleDeleteTodo = async (key: string): Promise<void> => {
//         const todos = todosConstructor.delete(this.state.todos, key);
//         await this.updateStateAndDataOnServer(todos);
//     };
//
//     private readonly handleFilterTodo = (flag: string): void => {
//         this.setState({ filterCondition: flag });
//     };
//
//     private readonly handleClearCompletedTodo = async (): Promise<void> => {
//         const todos = todosConstructor.deleteCompleted(this.state.todos);
//         await this.updateStateAndDataOnServer(todos);
//     };
//
//     private readonly updateStateAndDataOnServer = async (
//         todos: Todos
//     ): Promise<void> => {
//         const response = await api.update(todos);
//         this.setState({
//             todos: todosConstructor.extract(response),
//             activeItems: itemsCount.getActive(todos),
//             completedItems: itemsCount.getCompleted(todos),
//         });
//     };
//
//     private readonly shouldFooterShow = (): boolean =>
//         this.state.completedItems + this.state.activeItems > 0;
//
//     private readonly shouldClearCompletedShow = (): boolean =>
//         this.state.completedItems > 0;
// }
