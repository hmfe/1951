import React, { useContext } from "react";
import { ClearSearchTerms, RemoveSearchTerm } from "../task-3/reducers";
import { Task3Context } from "../task-3";
import "./style.scss";

const pad2Zeroes = (num: number) => num.toString().padStart(2, "0");
const formatTime = (time: Date) =>
  time != null
    ? `${time.getFullYear()}-${pad2Zeroes(time.getMonth())}-${pad2Zeroes(
        time.getDate()
      )}, ${pad2Zeroes(time.getHours() % 12)}:${pad2Zeroes(
        time.getMinutes()
      )} ${time.getHours() >= 12 ? "PM" : "AM"}`
    : "";
const guessWookieepediaUrl = (name: string) =>
  `http://starwars.wikia.com/wiki/${name.replace(/\W+/, "_")}`;

const SearchItem = ({ title, time, removeHandler }: { title: string, time: Date, removeHandler: any }) => {
  return (
    <li className="search-history__item">
      <a href={guessWookieepediaUrl(title)} target="_wookieepedia">
        {title}
      </a>
      <time dateTime={time.toISOString()}>{formatTime(time)}</time>
      <button
        className="search-history__remove-item-btn"
        type="button"
        onClick={removeHandler}
        title='Remove this item from search history'
      >
        <span className="visual-hidden">Remove</span>
      </button>
    </li>
  );
};

export default () => {
  const { state, dispatch } = useContext(Task3Context);
  const hasItems =
    state.searchTermsHistory != null && state.searchTermsHistory.size > 0;
  return (
    <section className="search-history">
      <header className="search-history__header">
        <h2>Search history</h2>
        {hasItems && (
          <button
            type="button"
            className="search-history__clear-btn"
            onClick={() => dispatch({ type: ClearSearchTerms })}
          >
            Clear Search History
          </button>
        )}
      </header>
      {hasItems ? (
        <ul className="search-history__item-list">
          {state.searchTermsHistory &&
            [...state.searchTermsHistory.entries()]
              .sort(([k1, v1], [k2, v2]) => Number(v2.searchTime) - Number(v1.searchTime))
              .map(([key, value]) => (
                <SearchItem
                  key={key}
                  title={value.searchTerm}
                  time={value.searchTime}
                  removeHandler={() =>
                    dispatch({ type: RemoveSearchTerm, itemKey: key })
                  }
                />
              ))}
        </ul>
      ) : (
        <span>No item</span>
      )}
    </section>
  );
};
