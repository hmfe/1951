import React, { createContext } from "react";
import AutoComplete from "../auto-complete";
import SearchHistory from "../search-history";
import { useAutoCompleteReducer } from "./reducers";

export const Task3Context = createContext();

export default () => {
    const [state, dispatch] = useAutoCompleteReducer();
    // the auto-complete is wrapped inside a non-submitting form. Should there be need for server-side fallback, we can still do it by removing the event handler on the form
    return (
        <Task3Context.Provider value={{ state, dispatch }}>
            <form onSubmit={evt => evt.preventDefault()}>
                <AutoComplete />
            </form>
            <SearchHistory />
        </Task3Context.Provider>
    );
};
