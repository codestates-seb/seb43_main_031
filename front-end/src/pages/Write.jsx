import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaCommentDots, FaWonSign, FaMapPin } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";
import { FiClock } from "react-icons/fi";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

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

  console.log(data);

  const handleChange = e => {
    if (e.target) {
      const { name, value } = e.target;
      setData(prev => ({ ...prev, [name]: value }));
    } else {
      const editorInstance = editorRef.current.getInstance();
      setData(prev => ({ ...prev, content: editorInstance.getMarkdown() }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/boards", { data })
      .then(() => navigate("/board"))
      .catch(() => alert("게시글 등록에 실패했습니다."));
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
          수고비 (원)
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
        <input id="detail" type="text" name="detailAddress" value={data.detailAddress} onChange={handleChange} />
        <button type="submit">등록하기</button>
        <button onClick={handleCancle}>취소하기</button>
      </FormSection>
    </Container>
  );
}
