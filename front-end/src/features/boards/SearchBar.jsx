import React from "react";

function SearchBar({ searchInputText, onChange, onSearchButtonClick }) {
  return (
    <div className="search-bar">
      <input
        className="input-text"
        placeholder="여기에 검색어를 입력해주세요."
        value={searchInputText}
        onChange={onChange}
      />
      <div className="search-icon" onClick={onSearchButtonClick}>
        🔍
      </div>
    </div>
  );
}

export default SearchBar;
