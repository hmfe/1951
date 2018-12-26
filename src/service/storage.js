const defaultKey = "search-history";

export const save = (history, key = defaultKey) => {
    localStorage.setItem(key, JSON.stringify([...history.entries()]));
}

const parseSearchTime = (k,v) => {
    if (typeof(v) === "string" && k === "searchTime") {
        return new Date(v);
    }
    else {
        return v;
    }
}

export const load = (key = defaultKey) => {
    const saved = localStorage.getItem(key);
    let result;
    if (typeof(saved) === "string") {
        try {
            result = new Map(JSON.parse(saved, parseSearchTime));
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
