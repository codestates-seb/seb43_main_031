import { useState } from "react";
import styled from "styled-components";
import { FaCommentDots } from "react-icons/fa";

const AlignVertical = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Write() {
  const [data, setData] = useState({
    title: "",
    content: "",
    cost: "",
    expiredDate: "",
    dongTag: "",
    guTag: "",
    detailAddress: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <AlignVertical>
        <label htmlFor="title">
          <FaCommentDots />
          제목
        </label>
        <input id="title" type="text" name="title" value={data.title} onChange={handleChange} />
      </AlignVertical>
    </div>
  );
}
