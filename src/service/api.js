import { ajax } from "rxjs/ajax";

const rootUrl = `https://swapi.co/api/`;

export const fetchSearchResult = query => {
    const url = `${rootUrl}people/?search=${encodeURIComponent(query)}`;
    console.log(url);
    return ajax({
        url: url,
        crossDomain: true
    });
};
