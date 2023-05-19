import { useState } from "react";
import styled from "styled-components";

import { guList, dongList } from "../data/SeoulDistricts";

const TagContainer = styled.div`
  margin-top: 2%;
  margin-bottom: 5%;
  > select {
    height: 30px;
    width: 78px;
    margin-right: 10px;
    border-radius: 20px;
    padding: 0.5rem;
    color: #fff;
    font-weight: 500;
    background-color: var(--primary-color);
    cursor: pointer;
    &:focus {
      border: 1px solid var(--font-color-bold);
      outline: 4px solid #f7eaea;
    }
  }
`;

export default function SelectGuDong({ onGuChange, onDongChange }) {
  const [selectedGu, setSelectedGu] = useState("");
  const [selectedDong, setSelectedDong] = useState("");

  function handleGuChange(event) {
    setSelectedGu(event.target.value);
    onGuChange(event.target.value);
  }

  function handleDongChange(event) {
    setSelectedDong(event.target.value);
    onDongChange(event.target.value);
  }

  return (
    <TagContainer>
      <select value={selectedGu} onChange={handleGuChange} required>
        <option value="" hidden>
          지역구
        </option>
        {guList.map(gu => (
          <option key={gu} value={gu}>
            {gu}
          </option>
        ))}
      </select>
      <select value={selectedDong} onChange={handleDongChange} disabled={!selectedGu} required>
        <option value="" hidden>
          지역동
        </option>
        {selectedGu &&
          dongList[selectedGu].map(dong => (
            <option key={dong} value={dong}>
              {dong}
            </option>
          ))}
      </select>
    </TagContainer>
  );
}
