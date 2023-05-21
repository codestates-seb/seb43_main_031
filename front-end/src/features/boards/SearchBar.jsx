import React from "react";

function SearchBar({ searchInputText, onChange, onSearchButtonClick }) {
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      onSearchButtonClick();
    }
  };
  return (
    <div className="search-bar">
      <input
        className="input-text"
        placeholder="여기에 검색어를 입력해주세요."
        value={searchInputText}
        onChange={onChange}
        onKeyDown={handleKeyPress}
      />
      <div className="search-icon" onClick={onSearchButtonClick} onKeyDown={onSearchButtonClick}>
        🔍
      </div>
    </div>
  );
}

export default SearchBar;
