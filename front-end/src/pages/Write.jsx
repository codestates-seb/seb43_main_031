import { useState, useRef } from "react";
import styled from "styled-components";
import { FaCommentDots } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const AlignVertical = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Write() {
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

  return (
    <div>
      <AlignVertical>
        <label htmlFor="title">
          <FaCommentDots />
          제목
        </label>
        <input id="title" type="text" name="title" value={data.title} onChange={handleChange} required />
      </AlignVertical>
      <span>
        <RxFileText />
        상세내용
      </span>
      <Editor
        initialValue=" "
        previewStyle="vertical"
        height="300px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        language="ko-KR"
        ref={editorRef}
        onChange={handleChange}
        required
      />
    </div>
  );
}
