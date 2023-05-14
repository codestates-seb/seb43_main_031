import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";
import axios from "axios";

import styled from "styled-components";
// import { Viewer } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { addComment, editComment, deleteComment, setComment } from "../../../redux/features/commentSlice";
import ReplyCommentSection from "./ReplyCommentSection";
import UserBox from "../UserBox";

const BASE_URL = `http://localhost:8080`;
// 전체 컨테이너
const StyledContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

// 목록 리스트 박스
const StyledListBlock = styled.div`
  width: 100%;
  padding: 1.2rem;
  margin-bottom: 0.5rem;
  border-radius: 0.4rem;
  box-shadow: 0 0.2rem 0.7rem 0.2rem rgba(0, 0, 0, 0.1);
`;

// 새로운 글 작성 박스
const DetailSubForm = styled.div`
  width: 100%;
  margin: 0 auto 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;

  & > input {
    width: 100%;
    height: 4rem;
    padding: 0 1rem 1rem;
    border: none;
    border-radius: 0.4rem;
    background-color: var(--bg-color);
    font-size: 1.1rem;
  }
  & > button {
    width: 20%;
    align-self: end;
    padding: 0.7rem;
    background-color: var(--primary-color);
    border: none;
    border-radius: 1.5rem;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: rgba(190, 24, 31, 0.8);
    }
  }
`;

// 댓글 아이템
const StyledItemContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.2rem;

  .msg {
    margin: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

// 수정할 폼 박스
const EditForm = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > input {
    width: 100%;
    height: 3rem;
    padding: 0 0.5em 0.5rem;
    border: none;
    border-radius: 0.4rem;
    background-color: var(--bg-color);
    font-size: 1.1rem;
  }

  .utils {
    display: flex;
    align-self: end;
    margin-top: 1rem;

    .fixAndDelete {
      display: flex;
      justify-content: center;
      & > button {
        margin: 0.3rem;
        color: var(--sub-btn-color);
        font-size: 0.8rem;
        background-color: transparent; // 투명하게
        border: none;
        cursor: pointer;
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
`;

// 댓글 컴포넌트
// 댓글과 대댓글 연결을 위한 상태(responseTo)를 추가하여 "root" 는 댓글, "responseTo"는 대댓글로 인식하게 했다.
function CommentSection() {
  // 왜 초기값인 boardInComments가 local상태로 안들어 가질까?
  // boardInComments는 있을수도 있고 없을수도 있는걸 유념해야한다.
  // const boardInComments = commentData?.filter(comment => comment.boardId === boardData.id) || []; // 해당 게시판에 속한 코멘츠들만 불러오기(초기값)

  const [local, setLocal] = useState([]); // 코멘츠 데이터들 배열 상태
  const [text, setText] = useState(""); // 댓글 인풋 상태
  const [editText, setEditText] = useState(""); // 댓글 수정창 인풋 상태
  const [edit, setEdit] = useState(false); // 댓글 수정버튼 토글 상태
  const [user, setUser] = useState({
    memberId: 1,
    email: "test@gmail.com",
    nickName: "nickname",
    phone: "010-1234-5678",
    image: "",
  });
  const [openEditor, setOpenEditor] = useState(""); // 댓글 고유id값 담는 상태

  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comment);

  const inputRef = useRef(null);

  // useEffect안에 적용하는 deps는 원시값처럼 간단한 상태를 적용해야 올바르게 돌아갈 수 있다.(공장처럼 코드를 수거해가서 대신 수행하는 느낌) ***
  useEffect(() => {
    setLocal(comments.filter(comment => comment.responseTo === "root")); // 코멘트(댓글)만 필터링해서 코멘츠 데이터 업데이트
  }, [comments]);

  // 새로운 댓글 생성
  const handleSubmit = e => {
    e.preventDefault();
    if (text === "") {
      alert("댓글을 작성해 주세요");
    } else {
      const newData = {
        boardId: id, // params로 받은 id
        memberId: user.memberId,
        commentId: uuid(), // 고유 아이디값 생성을 위한 리엑트 ID라이브러리 사용
        content: text,
        responseTo: "root", // 대댓글 연결을 위한 상태 추가
        createdDate: `${new Date()}`,
        isEditing: false,
      };
      dispatch(addComment(newData));
      setText("");
    }
  };

  // 댓글 수정하기
  const handleEdit = (id, editText) => {
    const editData = { commentId: id, content: editText };
    dispatch(editComment(editData));
  };

  // 댓글 삭제하기
  const handleDelete = id => {
    dispatch(deleteComment(id));
  };

  // 수정버튼 클릭시 수정가능한 코멘트만 수정창 오픈
  const handleEditClick = commentId => {
    setEdit(!edit); // 수정 버튼 토글
    setLocal(
      comments.map(comment => {
        if (comment.commentId === commentId) {
          return { ...comment, isEditing: true };
        } else {
          return { ...comment, isEditing: false };
        }
      })
    );
  };

  return (
    <StyledContainer>
      <DetailSubForm>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="궁금한 점을 남겨주세요..."
        />
        <button type="button" value="applys" onClick={handleSubmit}>
          댓글작성
        </button>
      </DetailSubForm>
      {local?.map(comment => {
        return (
          <StyledListBlock key={comment.commentId}>
            <StyledItemContents>
              <UserBox infoData={comment} />
              <div className="msg">{comment.content}</div>
              {/* 유저가 해당 댓글의 작성자일 경우만 */}
              {user.memberId === comment.memberId && (
                // 해당 댓글/대댓글 id가 빈문자가 아니면 수정버튼 클릭시 수정인풋창 보이게
                <EditForm>
                  {openEditor === comment.commentId && (
                    <input
                      ref={inputRef}
                      type="text"
                      defaultValue={comment.content}
                      key={comment.content}
                      onChange={e => setEditText(e.target.value)}
                    />
                  )}
                  <div className="utils">
                    <div className="fixAndDelete">
                      <button
                        type="button"
                        onClick={() => {
                          // 수정버튼 클릭시 일치하는 댓글이면 수정하고 아니면 id문자만 등록하여 인풋창 유지만 할 수 있게
                          if (comment.commentId === openEditor) {
                            handleEdit(comment.commentId, editText);
                            setOpenEditor("");
                          } else {
                            setOpenEditor(comment.commentId);
                          }
                        }}
                      >
                        수정
                      </button>
                      <button type="button" onClick={() => handleDelete(comment.commentId)}>
                        삭제
                      </button>
                    </div>
                  </div>
                </EditForm>
              )}
            </StyledItemContents>
            {/* 코멘트(부모)의 고유 아이디를 대댓글에서 저장할수 있도록 props전달  */}
            <ReplyCommentSection responseTo={comment.commentId} />
          </StyledListBlock>
        );
      })}
    </StyledContainer>
  );
}

export default CommentSection;
