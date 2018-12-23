import React, { useContext, useEffect, useRef } from "react";
import { Subject, of } from "rxjs";
import {
  debounceTime,
  filter,
  map,
  distinctUntilChanged,
  switchMap,
  catchError,
  tap
} from "rxjs/operators";
import Autocomplete from "react-autocomplete";
import {
  AddSearchTerm,
  SearchError,
  SearchCompleted,
  SearchQueryChanged,
  Searching
} from "../task-3/reducers";
import { Task3Context } from "../task-3";
import classNames from "classnames";
import { fetchSearchResult } from "../../service/api";
import "./style.scss";

const itemTextWithHighlightedTerm = (input, term) => {
  if (input == null) {
    return <span>Empty input</span>;
  }
  if (term == null || term.length === 0) {
    return <span>{input}</span>;
  }
  const termRegex = new RegExp(`(${term})`, "gi");
  const segments = input.split(termRegex).filter(Boolean);
  return segments.map((p, i) =>
    termRegex.test(p) ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>
  );
};

export default () => {
  const { state, dispatch } = useContext(Task3Context);
  const searchQueryStreamContainer = useRef(new Subject());

  useEffect(() => {
    const subscription = searchQueryStreamContainer.current
      .pipe(
        debounceTime(333),
        filter(v => v != null && v.length > 0),
        distinctUntilChanged(),
        tap(v => dispatch({ type: Searching })),
        switchMap(v =>
          fetchSearchResult(v).pipe(
            map(x => x.response.results),
            catchError(e => of({ error: e })),
            map(result =>
              result.error
                ? dispatch({ type: SearchError, error: result.error })
                : dispatch({ type: SearchCompleted, items: result })
            )
          )
        )
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="auto-complete">
      <label
        htmlFor="search-box"
        className="auto-complete__label visual-hidden"
      >
        Search Starwars characters by name
      </label>
      <Autocomplete
        inputProps={{
          id: "search-box",
          className: "auto-complete__search-box",
          placeholder: "e.g. Mace Windu"
        }}
        wrapperProps={{ className: "auto-complete__wrapper" }}
        value={state.searchQuery}
        items={state.items}
        getItemValue={item => item.name}
        onSelect={(value, item) => {
          dispatch({ type: AddSearchTerm, value });
        }}
        onChange={(event, value) => {
          dispatch({ type: SearchQueryChanged, value });
          searchQueryStreamContainer.current.next(value);
        }}
        renderMenu={children => {
          const hasError = state.error != null;
          const isEmpty = state.items == null || state.items.length === 0;
          const itemListClass = classNames("auto-complete__item-list", {
            "auto-complete__item-list--searching": state.searching,
            "auto-complete__item-list--error": hasError,
            "auto-complete__item-list--empty": isEmpty
          });
          return (
            <div className={itemListClass}>
              {hasError ? (
                <span>
                  An error occured during your last query: {state.error.message}
                </span>
              ) : (
                children
              )}
            </div>
          );
        }}
        renderItem={(item, isHighlighted) => {
          const className = classNames("auto-complete__item", {
            "auto-complete__item--highlighted": isHighlighted
          });
          return (
            <div key={item.url} className={className}>
              {itemTextWithHighlightedTerm(item.name, state.searchQuery)}
            </div>
          );
        }}
      />
      {state.searchQuery != null && state.searchQuery.length > 0 && (
        <button
          type="button"
          className="auto-complete__clear-search-btn"
          title="Clear current query"
          onClick={() => dispatch({ type: SearchQueryChanged, value: "" })}
        >
          <span className="visual-hidden">Clear search query</span>
        </button>
      )}
    </div>
  );
};
