
import { Filters } from "./Filters";
import { Todos } from "./Todos";
import { CreateTodo } from "./CreateTodo";




export const Valtio = () => (
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


