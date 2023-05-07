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
  width: 100vw;
`;

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: auto;
  padding: calc(50px + 3%) 3%;
  .label {
    font-size: 1.1rem;
    font-weight: 550;
    margin-bottom: 3%;
  }
  .input {
    border-style: none;
    border-radius: 5px;
    height: 30px;
    margin-bottom: 8%;
    padding: 0.5rem;
    &:focus {
      border: 1px solid #120003;
      outline: 4px solid #f7eaea;
    }
  }
  .editor {
    margin-top: 8%;
  }
`;

const TagContainer = styled.div`
  margin-bottom: 3%;
  .tag {
    width: 80px;
    height: 30px;
    border-radius: 20px;
    padding: 0.5rem;
    background-color: #bd181f;
    border: 1px solid #bd181f;
    color: #fff;
    font-weight: 500;
    margin-right: 10px;
    cursor: pointer;
    &:focus {
      border: 1px solid #120003;
      outline: 4px solid #f7eaea;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12%;
  gap: 5%;
  .btn {
    height: 40px;
    width: 120px;
    border-radius: 20px;
    font-size: 1.1rem;
    font-weight: 600;
    border-style: none;
    box-shadow: #12000358 0px 4px 8px;
    cursor: pointer;
    &:active {
      transform: translateY(2px);
    }
  }
  .red {
    background-color: #bd181f;
    color: #fff;
  }
  .gray {
    background-color: #e3e3e3;
  }
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
  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    try {
      await axios.post("http://localhost:8080/boards", data);
      navigate("/board");
    } catch (error) {
      alert("게시글 등록에 실패했습니다.");
    }
    setDisabled(false);
  };

  const handleCancel = e => {
    e.preventDefault();
    confirm("정말로 취소하시겠습니까?") ? navigate("/board") : null;
  };

  //에디터 내 이미지 업로드 hooks 수정
  const uploadImages = async (blob, callback) => {
    const formData = new FormData();
    formData.append("image", blob);
    try {
      const res = await axios.post("http://localhost:8080/images", formData);
      //응답받은 url을 넣어준다.
      callback(res.data.image);
    } catch (error) {
      console.log(error);
    }
  };
  // const uploadImages = async (blob, callback) => {
  //   const formData = new FormData();
  //   formData.append("file", blob);
  //   formData.append("upload_preset", "ogdqlboj");
  //   try {
  //     const res = await axios.post("https://api.cloudinary.com/v1_1/dd9ieutqw/image/upload", formData);
  //     callback(res.data.secure_url);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Container>
      <FormSection onSubmit={handleSubmit}>
        <label className="label" htmlFor="title">
          <FaCommentDots /> 제목
        </label>
        <input
          className="input"
          id="title"
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
        />
        <span className="label">
          <RxFileText /> 상세내용
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
          hooks={{
            addImageBlobHook: uploadImages,
          }}
        />
        <label className="label editor" htmlFor="cost">
          <FaWonSign /> 수고비(원)
        </label>
        <input
          className="input"
          id="cost"
          type="number"
          name="cost"
          value={data.cost}
          onChange={handleChange}
          required
        />
        <label className="label" htmlFor="expiredDate">
          <FiClock /> 만료일
        </label>
        <input
          className="input"
          id="expiredDate"
          type="datetime-local"
          name="expiredDate"
          value={data.expiredDate}
          onChange={handleChange}
          required
        />
        <label className="label" htmlFor="detail">
          <FaMapPin /> 상세주소
        </label>
        <SelectGuDong setData={setData} />
        <input
          className="input"
          id="detail"
          type="text"
          name="detailAddress"
          value={data.detailAddress}
          onChange={handleChange}
        />
        <Buttons>
          <button className="red btn" type="submit" disabled={disabled}>
            등록하기
          </button>
          <button className="gray btn" onClick={handleCancel}>
            취소하기
          </button>
        </Buttons>
      </FormSection>
    </Container>
  );
}

function SelectGuDong(props) {
  const [selectedGu, setSelectedGu] = useState("");
  const [selectedDong, setSelectedDong] = useState("");

  function handleGuChange(e) {
    setSelectedGu(e.target.value);
    props.setData(prev => ({ ...prev, guTag: e.target.value }));
  }

  function handleDongChange(e) {
    setSelectedDong(e.target.value);
    props.setData(prev => ({ ...prev, dongTag: e.target.value }));
  }

  return (
    <TagContainer>
      <select className="tag" value={selectedGu} onChange={handleGuChange} required>
        {selectedGu === "" ? <option value="">지역구</option> : null}
        {guList.map(gu => (
          <option key={gu} value={gu}>
            {gu}
          </option>
        ))}
      </select>
      <select className="tag" value={selectedDong} onChange={handleDongChange} disabled={!selectedGu} required>
        {selectedDong === "" ? <option value="">지역동</option> : null}
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
