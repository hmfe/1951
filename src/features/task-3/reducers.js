import { useReducer } from "react";

const getHistoryItemKey = item => item.trim().toLocaleUpperCase();

const addSearchHistoryItem = (item, history) => {
    let result;
    if (item != null && item.length > 0) {
        result = new Map(history.entries());
        const itemKey = getHistoryItemKey(item);

        if (result.has(itemKey)) {
            const curent = result.get(itemKey);
            result.set(itemKey, { ...curent, searchTime: new Date() });
        } else {
            result.set(itemKey, { searchTerm: item, searchTime: new Date() });
        }
    } else {
        result = history;
    }
    return result;
};

const removeSearchHistoryItem = (itemKey, history) => {
    let result;
    if (itemKey != null) {
        result = new Map(history.entries());
        result.delete(itemKey);
    } else {
        result = history;
    }
    return result;
};

const initialState = {
    items: [],
    searching: false,
    error: null,
    searchQuery: "",
    searchTermsHistory: new Map()
};

const reducer = (state, action) => {
    switch (action.type) {
        case SearchQueryChanged:
            return { ...state, searchQuery: action.value };
        case Searching:
            return { ...state, searching: true, error: null, items: [] };
        case SearchCompleted:
            return {
                ...state,
                searching: false,
                error: null,
                items: action.items
            };
        case SearchError:
            return { ...state, searching: false, error: action.error };
        case AddSearchTerm:
            return {
                ...state,
                searchQuery: action.value,
                searchTermsHistory: addSearchHistoryItem(
                    action.value,
                    state.searchTermsHistory
                ),
                items: []
            };
        case RemoveSearchTerm:
            return {
                ...state,
                searchTermsHistory: removeSearchHistoryItem(
                    action.itemKey,
                    state.searchTermsHistory
                )
            };
        case ClearSearchTerms:
            return { ...state, searchTermsHistory: new Map() };
        default:
            return state;
    }
};

const NameSpace = "AutoComplete:";

export const SearchQueryChanged = `${NameSpace}SearchQueryChanged`;
export const SearchCompleted = `${NameSpace}SearchCompleted`;
export const SearchError = `${NameSpace}SearchError`;
export const Searching = `${NameSpace}Searching`;
export const RemoveSearchTerm = `${NameSpace}RemoveSearchResult`;
export const AddSearchTerm = `${NameSpace}AddSearchResult`;
export const ClearSearchTerms = `${NameSpace}ClearSearchTerms`;

export const useAutoCompleteReducer = () => useReducer(reducer, initialState);
