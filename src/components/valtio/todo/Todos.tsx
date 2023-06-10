import { useSnapshot } from "valtio";
import { NewType, Status, store } from "./TodoModel";
import { useEffect } from "react";
import React from "react";
import { useValtio } from "../model/useValtio";



/* const removeTodo = (index: number) => {
    store.todos.splice(index, 1);
  };
  
  const toggleDone = (index: number, currentStatus: Status) => {
    const nextStatus = currentStatus === "pending" ? "completed" : "pending";
    store.todos[index].status = nextStatus;
  };
   */



export const Todos = () => {
    // const snap = useSnapshot(store);
    const snap = useValtio(store) as NewType;
/*     const [snap, setSnap] = React.useState<NewType>(store);
    useEffect(() => {
        const un = (store as any).subscribe((st: any) => {
            setSnap(st);
            console.log(`st-`, st);

        });


        return () => {
            un();
        };
    } , []); */
    console.log(`st-`, snap);
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
                                onClick={() => store.toggleDone(index)}
                            >
                                {description}
                            </span>
                            <button className="remove" onClick={() => store.removeTodo(index)}>
                                x
                            </button>
                        </li>
                    );
                })}
        </ul>
    );
};
