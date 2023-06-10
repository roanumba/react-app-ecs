import { useSnapshot } from "valtio";
import { Status, store } from "./model/TodoModel";



const removeTodo = (index: number) => {
    store.todos.splice(index, 1);
  };
  
  const toggleDone = (index: number, currentStatus: Status) => {
    const nextStatus = currentStatus === "pending" ? "completed" : "pending";
    store.todos[index].status = nextStatus;
  };
  

export const Todos = () => {
    const snap = useSnapshot(store);
    return (
        <ul>
            {snap.todos
                .filter(({ status }) => status === snap.filter || snap.filter === "all")
                .map(({ description, status, id }, index) => {
                    return (
                        <li key={id}>
                            <span
                                data-status={status}
                                className="description"
                                onClick={() => toggleDone(index, status)}
                            >
                                {description}
                            </span>
                            <button className="remove" onClick={() => removeTodo(index)}>
                                x
                            </button>
                        </li>
                    );
                })}
        </ul>
    );
};
