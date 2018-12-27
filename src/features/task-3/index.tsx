import React, { createContext, useReducer, useEffect } from "react";
import AutoComplete from "../auto-complete";
import SearchHistory from "../search-history";
import { reducer, initialState, LoadSearchTerms, AutoCompleteState } from "./reducers";
import useTitle from "../../utils/useDocumentTitle";

export const Task3Context = createContext({ state: initialState, dispatch:(val: any)=>{} });

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useTitle("Task 3 - Autocomplete");
    useEffect(()=> {
        dispatch({ type: LoadSearchTerms });
    }, []);

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
