import { useState } from "react";
import { guList, dongList } from "../../data/SeoulDistricts";

function SearchToolArea({
  onSelectedGu,
  onSelectedDong,
  selectedGu,
  selectedDong,
  onClickSortCreateDate,
  onClickSortViewCount,
}) {
  return (
    <div className="sarch-tool-area">
      <div className="locacation-search-dropdowns-area">
        <select className="location-search-dropdown" onChange={onSelectedGu} name="gu" value={selectedGu}>
          <option value="지역구" hidden>
            지역구
          </option>
          {guList.map(gu => (
            <option key={gu}>{gu}</option>
          ))}
        </select>
        <select className="location-search-dropdown" onChange={onSelectedDong} name="dong" value={selectedDong}>
          <option value="지역동" hidden>
            지역동
          </option>
          {selectedGu !== "지역구" &&
            dongList[selectedGu].map(dong => {
              return <option key={dong}>{dong}</option>;
            })}
        </select>
      </div>
      <div className="sort-buttons-area">
        <button type="button" className="sort-button" onClick={onClickSortViewCount}>
          조회순
        </button>
        <button type="button" className="sort-button" onClick={onClickSortCreateDate}>
          최신순
        </button>
      </div>
    </div>
  );
}

export default SearchToolArea;
