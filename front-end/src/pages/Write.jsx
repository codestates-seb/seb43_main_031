import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCommentDots, FaWonSign, FaMapPin } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";
import { FiClock } from "react-icons/fi";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";

import { guList, dongList } from "../data/SeoulDistricts";
import { postBoard } from "../api/board";
import { postImage } from "../api/image";

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: auto;
  padding: 3rem;
  color: var(--font-color-bold);
  > label {
    margin-bottom: 3%;
    font-size: 1.1rem;
    font-weight: 550;
  }
  > input {
    height: 30px;
    margin-bottom: 8%;
    border-style: none;
    border-radius: 5px;
    padding: 0.5rem;
    &:focus {
      border: 1px solid var(--font-color-bold);
      outline: 4px solid #f7eaea;
    }
  }
`;

const EditorContainer = styled.div`
  margin-bottom: 8%;
`;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12% 0 6%;
  gap: 5%;
  > button {
    height: 40px;
    width: 120px;
    border-style: none;
    border-radius: 20px;
    font-size: 1.1rem;
    font-weight: 600;
    background-color: #e3e3e3;
    box-shadow: #12000358 0px 4px 8px;
    cursor: pointer;
    &:active {
      transform: translateY(2px);
    }
  }
  .postButton {
    color: #fff;
    background-color: var(--primary-color);
  }
`;

export default function Write() {
  const navigate = useNavigate();
  const editorRef = useRef();

  const [board, setBoard] = useState({
    title: "",
    content: "",
    cost: 0,
    expiredDateTime: "",
    dongTag: "",
    guTag: "",
    detailAddress: "",
  });

  const [disabled, setDisabled] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setBoard(previous => ({ ...previous, [name]: value }));
  };

  const handleEditorChange = () => {
    const editorInstance = editorRef.current.getInstance();
    setBoard(previous => ({ ...previous, content: editorInstance.getMarkdown() }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    setDisabled(true);
    postBoard(board).then(response => {
      if (response === "success") {
        navigate("/boards");
        setDisabled(false);
      }
      if (response === "fail") {
        alert("게시글 등록에 실패했습니다.");
        setDisabled(false);
      }
    });
  };

  const handleCancel = event => {
    event.preventDefault();
    confirm("정말로 취소하시겠습니까?") ? navigate("/boards") : null;
  };

  function onGuChange(value) {
    setBoard(previous => ({ ...previous, guTag: value }));
  }

  function onDongChange(value) {
    setBoard(previous => ({ ...previous, dongTag: value }));
  }

  // 에디터 내 이미지 업로드 hooks 수정
  const uploadImages = (blob, callback) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("Content-Type", "multipart/form-data");
    postImage(formData).then(response => {
      callback(response.data.image);
    });
  };

  const labels = [
    {
      id: "title",
      title: "제목",
      icon: <FaCommentDots />,
      children: <input id="title" type="text" name="title" value={board.title} onChange={handleChange} required />,
    },
    {
      id: "editor",
      title: "상세내용",
      icon: <RxFileText />,
      children: (
        <EditorContainer>
          <Editor
            initialValue=" "
            previewStyle="vertical"
            height="350px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            language="ko-KR"
            ref={editorRef}
            onChange={handleEditorChange}
            hooks={{
              addImageBlobHook: uploadImages,
            }}
            required
          />
        </EditorContainer>
      ),
    },
    {
      id: "cost",
      title: "수고비(원)",
      icon: <FaWonSign />,
      children: <input id="cost" type="number" name="cost" value={board.cost} onChange={handleChange} required />,
    },
    {
      id: "expiredDateTime",
      title: "만료일",
      icon: <FiClock />,
      children: (
        <input
          id="expiredDateTime"
          type="datetime-local"
          name="expiredDateTime"
          value={board.expiredDateTime}
          onChange={handleChange}
          required
        />
      ),
    },
    {
      id: "detail",
      title: "상세주소",
      icon: <FaMapPin />,
      children: (
        <>
          <SelectGuDong onGuChange={value => onGuChange(value)} onDongChange={value => onDongChange(value)} />
          <input
            id="detail"
            type="text"
            name="detailAddress"
            value={board.detailAddress}
            onChange={handleChange}
            required
          />
        </>
      ),
    },
  ];

  return (
    <FormSection onSubmit={handleSubmit}>
      {labels.map(label => (
        <>
          <label htmlFor={label.id}>
            {label.icon}
            {label.title}
          </label>
          {label.children}
        </>
      ))}
      <ButtonContainer>
        <button className="postButton" type="submit" disabled={disabled}>
          등록하기
        </button>
        <button type="button" onClick={handleCancel}>
          취소하기
        </button>
      </ButtonContainer>
    </FormSection>
  );
}

function SelectGuDong({ onGuChange, onDongChange }) {
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
