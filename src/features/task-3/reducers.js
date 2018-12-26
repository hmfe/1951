import { load, save } from "../../service/storage";

const NameSpace = "AutoComplete:";
export const SearchQueryChanged = `${NameSpace}SearchQueryChanged`;
export const SearchCompleted = `${NameSpace}SearchCompleted`;
export const SearchError = `${NameSpace}SearchError`;
export const Searching = `${NameSpace}Searching`;
export const RemoveSearchTerm = `${NameSpace}RemoveSearchResult`;
export const AddSearchTerm = `${NameSpace}AddSearchResult`;
export const ClearSearchTerms = `${NameSpace}ClearSearchTerms`;
export const LoadSearchTerms = `${NameSpace}LoadSearchTerms`;

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



export const reducer = (state, action) => {
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
        // TODO: orthogonal concerns like persisting and loading data from local storage should be put in a middleware
        case AddSearchTerm: {
            const added = addSearchHistoryItem(
                action.value,
                state.searchTermsHistory
            );
            save(added);
            return {
                ...state,
                searchQuery: action.value,
                searchTermsHistory: added,
                items: []
            };
        }
        case RemoveSearchTerm: {
            const removed = removeSearchHistoryItem(
                action.itemKey,
                state.searchTermsHistory
            );
            save(removed);
            return {
                ...state,
                searchTermsHistory: removed
            };
        }
        case ClearSearchTerms: {
            const cleared = new Map();
            save(cleared);
            return { ...state, searchTermsHistory: cleared };
        }
        case LoadSearchTerms: {
            return { ...state, searchTermsHistory: load() }
        }
        default:
            return state;
    }
};

export const initialState = {
    items: [],
    searching: false,
    error: null,
    searchQuery: "",
    searchTermsHistory: new Map()
};
