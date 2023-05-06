import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaCommentDots, FaWonSign, FaMapPin } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";
import { FiClock } from "react-icons/fi";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { guList, dongList } from "../data/SeoulDistricts";

const Container = styled.div`
  background-color: #fae7e7;
`;

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: auto;
`;

export default function Write() {
  const navigate = useNavigate();
  const editorRef = useRef();

  const [data, setData] = useState({
    title: "",
    content: "",
    cost: "",
    expiredDate: "",
    dongTag: "",
    guTag: "",
    detailAddress: "",
  });
  //console.log(data);

  //중복 제출 방지용
  const [disabled, setDisabled] = useState(false);

  const handleChange = e => {
    if (e.target) {
      const { name, value } = e.target;
      setData(prev => ({ ...prev, [name]: value }));
    } else {
      const editorInstance = editorRef.current.getInstance();
      setData(prev => ({ ...prev, content: editorInstance.getMarkdown() }));
    }
  };

  //POST 요청 부분
  const handleSubmit = e => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post("http://localhost:8080/boards", { data })
      .then(() => {
        navigate("/board");
        setDisabled(false);
      })
      .catch(() => {
        alert("게시글 등록에 실패했습니다.");
        setDisabled(false);
      });
  };

  const handleCancle = e => {
    e.preventDefault();
    navigate("/board");
  };

  return (
    <Container>
      <FormSection onSubmit={handleSubmit}>
        <label htmlFor="title">
          <FaCommentDots />
          제목
        </label>
        <input id="title" type="text" name="title" value={data.title} onChange={handleChange} required />
        <span>
          <RxFileText />
          상세내용
        </span>
        <Editor
          initialValue=" "
          previewStyle="vertical"
          height="350px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          language="ko-KR"
          ref={editorRef}
          onChange={handleChange}
        />
        <label htmlFor="cost">
          <FaWonSign />
          수고비(원)
        </label>
        <input id="cost" type="number" name="cost" value={data.cost} onChange={handleChange} required />
        <label htmlFor="expiredDate">
          <FiClock />
          만료일
        </label>
        <input
          id="expiredDate"
          type="datetime-local"
          name="expiredDate"
          value={data.expiredDate}
          onChange={handleChange}
          required
        />
        <label htmlFor="detail">
          <FaMapPin />
          상세주소
        </label>
        <SeoulDistricts />
        <input id="detail" type="text" name="detailAddress" value={data.detailAddress} onChange={handleChange} />
        <button type="submit" disabled={disabled}>
          등록하기
        </button>
        <button onClick={handleCancle}>취소하기</button>
      </FormSection>
    </Container>
  );
}

function SeoulDistricts() {
  const [selectedGu, setSelectedGu] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);

  function handleGuChange(e) {
    setSelectedGu(e.target.value);
    setSelectedDong(dongList[e.target.value][0]);
  }

  function handleDongChange(e) {
    setSelectedDong(e.target.value);
  }

  return (
    <>
      <select value={selectedGu || ""} onChange={handleGuChange}>
        <option value="">{selectedGu ? selectedGu : "지역구"}</option>
        {guList.map(gu => (
          <option key={gu} value={gu}>
            {gu}
          </option>
        ))}
      </select>
      <select value={selectedDong || ""} onChange={handleDongChange} disabled={!selectedGu}>
        <option value="">{selectedDong ? selectedDong : "지역동"}</option>
        {selectedGu &&
          dongList[selectedGu].map(dong => (
            <option key={dong} value={dong}>
              {dong}
            </option>
          ))}
      </select>
    </>
  );
}
