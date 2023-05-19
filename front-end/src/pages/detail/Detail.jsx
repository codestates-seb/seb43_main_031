import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// 아이콘
import { AiFillHeart } from "react-icons/ai";
import { FaWonSign, FaMapPin } from "react-icons/fa";
import { RxFileText } from "react-icons/rx";
import { FiClock } from "react-icons/fi";

// 라이브러리
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Editor, Viewer } from "@toast-ui/react-editor";
// 이미지
import RedShoesImg from "../../img/shoes.png";
// 컴포넌트
import ApplySection from "./ApplySection";
import CommentSection from "./comment/CommentSection";
import { editBoard, deleteBoard, setBoard } from "../../redux/features/boardSlice";
// 유틸리티
import elapsedText from "../../utils/elapsedText";

// 나중에 layouts로 이동 예정
const DetailTemplate = styled.div`
  width: 100vw;
  height: 100%;
  padding: 3rem 0;
  background-color: var(--bg-color);
`;

// 상세페이지 래퍼
const DetailWrapper = styled.div`
  max-width: 600px;
  display: block;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.5rem;
`;

// 본문 내용 섹션
const DetailContentsSection = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// 본문 헤더 박스
const ContentsSectionHeader = styled.div`
  border-bottom: 2px solid var(--bg-color);

  .header-title {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    h2 {
      font-weight: 700;
      font-size: 1.5rem;
      flex: 1 0 0;
    }
  }

  .sub-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 3rem 1rem 1rem;
    .author-util {
      span {
        margin-right: 1rem;
      }
    }
    .interest {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
`;

// 본문 바디 박스
const ContentsSectionBody = styled.div`
  /* height: 100%; */
  border-bottom: 2px solid var(--bg-color);
`;

// 태그와 수정삭제 컨트롤러 부분
const BodyUtils = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  .tags {
    display: flex;
    div {
      margin-right: 1rem;
      padding: 0.4rem 1rem;
      color: var(--primary-color);
      background-color: #ffd3d5;
      border-radius: 4rem;
    }
  }

  .utils {
    display: flex;

    button {
      flex: 2 0 0;
      font-size: 0.8rem;
      background-color: transparent; // 투명하게
      border: none;
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

// 메인 내용 부분
const BodyMain = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  margin: 1rem 0 1rem;
  & > label {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.3rem;
    font-size: 1.1rem;
    font-weight: 600;
  }

  & > p {
    margin: 1rem;
  }
`;

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editorRef = useRef();
  const [isPending, setIsPending] = useState(false);
  const [editText, setEditText] = useState(""); // 수정할 인풋값 상태
  const [openEditor, setOpenEditor] = useState(""); // 게시글 고유id값 담는 상태

  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.userInfo);

  const boards = useSelector(state => state.board);
  const board = boards.find(item => item.boardId === id);
  // console.log(boards);
  // console.log(board);

  useEffect(() => {
    // setIsPending(true)
    const fetchBoard = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/boards/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(setBoard(response.data));
        console.log(response.data);
      } catch (err) {
        alert("게시글을 불러오지 못했습니다.");
      }
      // setIsPending(false);
    };
    fetchBoard();
  }, []);

  // 게시글 수정
  const handleEdit = async (id, editText) => {
    try {
      const editData = { id, content: editText };
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/boards/${id}`, editData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(editBoard(response.data));
    } catch (err) {
      alert("게시글을 수정하지 못했습니다.");
    }
  };

  // 게시글 삭제
  const handleDelete = async id => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/boards/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(deleteBoard(response.data));
    } catch (err) {
      alert("게시글을 삭제하지 못했습니다.");
    }
  };

  // 수정할 인풋 이벤트
  // const handleChange = event => {
  //   const { name, defaultValue } = event.target;
  //   setBoard(previous => ({ ...previous, [name]: defaultValue }));
  // };

  // 에디터 변경 함수
  const handleEditorChange = () => {
    const editorInstance = editorRef.current.getInstance();
    setBoard(previous => ({ ...previous, content: editorInstance.getMarkdown() }));
  };

  // 이미지 업로드 비동기 요청 함수
  const uploadImages = async (blob, callback) => {
    const formData = new FormData();
    formData.append("file", blob);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/images`, formData);
      callback(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };
  // 게시글 배열
  const labels = [
    {
      id: "editor",
      title: "상세내용",
      icon: <RxFileText />,
      children: <Viewer initialValue={board.content} />,
      editChildren: (
        <Editor
          initialValue={board.content}
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
        />
      ),
    },
    {
      id: "cost",
      title: "수고비(원)",
      icon: <FaWonSign />,
      children: <p>{board.cost}</p>,
      editChildren: (
        <input
          id="cost"
          type="number"
          name="cost"
          defaultValue={board.cost}
          key={board.cost}
          onChange={e => setEditText(e.target.valueAsNumber)}
          required
        />
      ),
    },
    {
      id: "expiredDate",
      title: "만료일",
      icon: <FiClock />,
      children: <p>{board.expiredDate}</p>,
      editChildren: (
        <input
          id="expiredDate"
          type="datetime-local"
          name="expiredDate"
          defaultValue={board.expiredDate}
          key={board.expiredDate}
          onChange={e => setEditText(e.target.value)}
          required
        />
      ),
    },
    {
      id: "detail",
      title: "상세주소",
      icon: <FaMapPin />,
      children: <p>{board.detailAddress}</p>,
      editChildren: (
        <input
          id="detail"
          type="text"
          name="detailAddress"
          defaultValue={board.detailAddress}
          key={board.detailAddress}
          onChange={e => setEditText(e.target.value)}
        />
      ),
    },
  ];

  // 얼리리턴(예외처리)
  if (isPending) return <div>로딩중입니다.</div>;
  return (
    <DetailTemplate>
      <DetailWrapper>
        <DetailContentsSection>
          <ContentsSectionHeader>
            <div className="header-title">
              <div>
                <img src={RedShoesImg} alt="title-logo" style={{ width: "40px", height: "40px" }} />
              </div>
              <h2>{board.title}</h2>
            </div>
            <div className="sub-header">
              <div className="author-util">
                <span style={{ fontWeight: "700" }}>{board.member.memberId}</span>
                <span style={{ fontSize: "0.8rem" }}>{elapsedText(new Date(board.createdDate))}</span>
              </div>
              <div className="interest">
                <AiFillHeart style={{ width: "20px", height: "20px", color: "var(--primary-color)" }} />
                <div>0</div>
              </div>
            </div>
          </ContentsSectionHeader>
          <ContentsSectionBody>
            <BodyUtils>
              <div className="tags">
                <div>{board.guTag}</div>
                <div>{board.dongTag}</div>
              </div>
              <div className="utils">
                <button
                  disabled={currentUser.memberId !== board.member.memberId}
                  type="button"
                  onClick={() => {
                    if (id === openEditor) {
                      handleEdit(id, editText);
                      setOpenEditor("");
                    } else {
                      setOpenEditor(id);
                    }
                  }}
                >
                  수정
                </button>
                <button
                  disabled={currentUser.memberId !== board.member.memberId}
                  type="button"
                  onClick={() => handleDelete(id)}
                >
                  삭제
                </button>
              </div>
            </BodyUtils>
            {labels.map(label => {
              return (
                <BodyMain>
                  <label htmlFor={label.id}>
                    {label.icon}
                    {label.title}
                  </label>
                  {openEditor === id ? <p>{label.editChildren}</p> : <p>{label.children}</p>}
                </BodyMain>
              );
            })}
          </ContentsSectionBody>
        </DetailContentsSection>
        <ApplySection boardId={id} />
        <CommentSection boardId={id} />
      </DetailWrapper>
    </DetailTemplate>
  );
}

export default Detail;

// const { boardId, title, memberId, createdDate, content, cost, expiredDate, dongTag, guTag, detailAddress } =
//   board || null; // 게시글 구조분해할당

// 해당 게시글 수정
// const updateBoard = (boardId, body) => {
//   axios.patch(`http://localhost:8080/boards/${boardId}`, { ...board, body });
// };
// 해당 게시글 삭제

// 새로운 코멘트/신청글 생성
// const onSubmitHandler = e => {
//   e.preventDefault();
//   if (e.target.value === "comments") {
//     // 새로운 글 정보 담아서 보내기(이 정보들이 필요할까?)
//     const newComment = {
//       commentId: nextId.current,
//       boardId: boardsData.id,
//       memberId: boardsData.memberId,
//       createdDate: new Date(),
//       content: commentValue,
//     };
//     nextId.current += 1;
//     axios
//       .post(`http://localhost:8080/comments`, newComment, {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       })
//       .then(res => {
//         navigate(`/boards/:id`);
//         setCommentValue("");
//       })
//       .catch(err => {
//         alert("새로운 문의를 생성하지 못했습니다.");
//       });
//   } else if (e.target.value === "applys") {
//     const newApply = {
//       applyId: nextId.current,
//       boardId: boardsData.id,
//       memberId: boardsData.memberId,
//       createdDate: new Date(),
//       content: applyValue,
//     };
//     nextId.current += 1;
//     axios
//       .post(`http://localhost:8080/applys`, newApply, {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       })
//       .then(res => {
//         navigate(`/boards/:id`);
//         setApplyValue("");
//       })
//       .catch(err => {
//         alert("새로운 신청을 생성하지 못했습니다.");
//       });
//   }
// };
