import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs";

const rootUrl = `https://swapi.co/api/`;
export type Character = {
    name: string,
}

export const fetchSearchResult = (query: string): Observable<AjaxResponse> => {
    const url = `${rootUrl}people/?search=${encodeURIComponent(query)}`;
    return ajax({
        url: url,
        crossDomain: true
    });
};
