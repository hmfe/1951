import { ajax } from "rxjs/ajax";

const rootUrl = `https://swapi.co/api/`;

export const fetchSearchResult = query => {
    const url = `${rootUrl}people/?search=${encodeURIComponent(query)}`;
    return ajax({
        url: url,
        crossDomain: true
    });
};
