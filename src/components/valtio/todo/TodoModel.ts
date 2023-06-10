import { proxy } from "valtio";
import { valtioWrapper } from "../model/ValtioUtil";

export type Status = "pending" | "completed";
export type Filter = Status | "all";

interface Todo  {
  description: string;
  status: Status;
  id: number;
};

export interface NewType {
    filter: Filter;
    todos: Todo[];
    addTodo : (st:any,description?: string) =>any;
    removeTodo: (st:any,index?: number) =>any;
    toggleDone: (st:any,index?: number) =>any;
}
const model = {
  filter: "all",
  todos: [],
  addTodo : (st:any,description: string) => {
    st.todos.push({
      description,
      status: "pending",
      id: Date.now()
    });
    return st;
  },
  removeTodo: (st:any,index: number) => {
    st.todos.splice(index, 1);
    return st;
  },
  toggleDone: (st:any,index: number) => {
    st.todos[index].status =
      st.todos[index].status === "pending" ? "completed" : "pending";
    return st;
  },
/*   toggleDone: (index: number, currentStatus: Status) => {
    const nextStatus = currentStatus === "pending" ? "completed" : "pending";
    store.todos[index].status = nextStatus;
  } */
}
export const store = valtioWrapper(model) as NewType;

