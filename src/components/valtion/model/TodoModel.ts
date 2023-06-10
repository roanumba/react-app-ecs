import { proxy } from "valtio";

export type Status = "pending" | "completed";
export type Filter = Status | "all";

interface Todo  {
  description: string;
  status: Status;
  id: number;
};

interface NewType {
    filter: Filter;
    todos: Todo[];
}

export const store = proxy({
  filter: "all",
  todos: []
}) as NewType;

