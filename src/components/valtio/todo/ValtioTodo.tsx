
import { Filters } from "./Filters";
import { Todos } from "./Todos";
import { CreateTodo } from "./CreateTodo";
import "./todo.css";



export const ValtioTodo = () => (
  <main>
    <h1>
      To-do List{" "}
      <span role="img" aria-label="pen">
        ✏️
      </span>
    </h1>
    <Filters />
    <Todos />
    <CreateTodo />
  </main>
);


