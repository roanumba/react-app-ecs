import { useRef, useState } from "react";
import { store } from "./TodoModel";

/* 
const addTodo = (description: string) => {
    store.todos.push({
      description,
      status: "pending",
      id: Date.now()
    });
  };
 */

export const CreateTodo = () => {
    // const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("");


    return (
        <section>
            <input 
            name="description" type="text" minLength={2} 
            value={value}
            onChange={(e) => setValue(e.target.value)}
             />
            <button
                className="add"
                onClick={() => store.addTodo(value)}
            >
                Add new
            </button>
        </section>
    );
};
