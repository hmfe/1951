import { load, save } from "../../service/storage";
import { Character } from "../../service/api";

const NameSpace = "AutoComplete:";
export const SearchQueryChanged = `${NameSpace}SearchQueryChanged`;
export const SearchCompleted = `${NameSpace}SearchCompleted`;
export const SearchError = `${NameSpace}SearchError`;
export const Searching = `${NameSpace}Searching`;
export const RemoveSearchTerm = `${NameSpace}RemoveSearchResult`;
export const AddSearchTerm = `${NameSpace}AddSearchResult`;
export const ClearSearchTerms = `${NameSpace}ClearSearchTerms`;
export const LoadSearchTerms = `${NameSpace}LoadSearchTerms`;

export type SearchHistory = Map<string, SearchHistoryEntry>;
export type SearchHistoryEntry = {
    searchTerm: string,
    searchTime: Date
}
export type AutoCompleteState = {
    items: Array<Character>,
    searching: boolean,
    error?: { message: string } | null,
    searchQuery?: string,
    searchTermsHistory: SearchHistory
}
export type AutoCompleteAction = {
    type: string
} | any;

const getHistoryItemKey = (item: string) => item.trim().toLocaleUpperCase();

const addSearchHistoryItem = (item: string, history: SearchHistory) => {
    let result;
    if (item != null && item.length > 0) {
        result = new Map(history.entries());
        const itemKey = getHistoryItemKey(item);
        const current = result.get(itemKey);
        if (current != null) {
            result.set(itemKey, { ...current, searchTime: new Date() });
        } else {
            result.set(itemKey, { searchTerm: item, searchTime: new Date() });
        }
    } else {
        result = history;
    }
    return result;
};

const removeSearchHistoryItem = (itemKey: string, history: SearchHistory) => {
    let result;
    if (itemKey != null) {
        result = new Map(history.entries());
        result.delete(itemKey);
    } else {
        result = history;
    }
    return result;
};



export const reducer = (state: AutoCompleteState, action: AutoCompleteAction) => {
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
            return { ...state, searchTermsHistory: load() || new Map() }
        }
        default:
            return state;
    }
};

export const initialState: AutoCompleteState = {
    items: [],
    searching: false,
    error: null,
    searchQuery: "",
    searchTermsHistory: new Map()
};
