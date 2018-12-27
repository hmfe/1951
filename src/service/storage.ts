import { SearchHistory } from "../features/task-3/reducers";

const defaultKey = "search-history";

export const save = (history: SearchHistory, key = defaultKey) => {
    localStorage.setItem(key, JSON.stringify([...history.entries()]));
}

const parseSearchTime = (key: string, value : any) => {
    if (typeof(value) === "string" && key === "searchTime") {
        return new Date(value);
    }
    else {
        return value;
    }
}

export const load = (key = defaultKey): SearchHistory | null => {
    const saved = localStorage.getItem(key);
    let result;
    if (typeof(saved) === "string") {
        try {
            result = new Map(JSON.parse(saved, parseSearchTime)) as SearchHistory;
        }
        catch (error) {
            console.error("Search history JSON could not be parsed", saved);
            result = null;
        }
    }
    else {
        result = null;
    }
    return result;
}
