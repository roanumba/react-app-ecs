import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { Filter, store } from "./model/TodoModel";


export const setFilter = (filter: Filter) => {
    store.filter = filter;
  };
  
  export const filterValues: Filter[] = ["all", "pending", "completed"];
  
export const Filters = () => {
    const snap = useSnapshot(store);
    return (
        <nav>
            {filterValues.map((filter) => (
                <Fragment key={filter}>
                    <input
                        name="filter"
                        type="radio"
                        value={filter}
                        checked={snap.filter === filter}
                        onChange={() => setFilter(filter)} />
                    <label>{filter}</label>
                </Fragment>
            ))}
        </nav>
    );
};
