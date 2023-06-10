import { Fragment, useState } from "react";
import { useSnapshot } from "valtio";
import { Filter, store } from "./TodoModel";


export const setFilter = (filter: Filter) => {
    store.filter = filter;
  };
  
  export const filterValues: Filter[] = ["all", "pending", "completed"];
  
export const Filters = () => {
    const [filter, setFilter] = useState<Filter>("all");
    // const snap = useSnapshot(store);
    const handleFilter = (filter: Filter) => {
        setFilter(filter);
        store.filter = filter;
    };

    return (
        <nav>
            {filterValues.map((flt) => (
                <Fragment key={flt}>
                    <input
                        name="filter"
                        type="radio"
                        value={flt}
                        checked={filter === flt}
                        onChange={() => handleFilter(flt)} />
                    <label>{flt}</label>
                </Fragment>
            ))}
        </nav>
    );
};
