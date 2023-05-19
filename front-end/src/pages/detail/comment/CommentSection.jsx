import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";
import axios from "axios";

import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { addComment, editComment, deleteComment, setComment } from "../../../redux/features/commentSlice";

import ReplyCommentSection from "./ReplyCommentSection";
import UserBox from "../UserBox";
import DetailSubHeader from "../SubHeader";
// import useRequest from "../../../shared/useRequest";

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
function CommentSection({ boardId }) {
  const inputRef = useRef(null);
  const [text, setText] = useState(""); // 댓글 인풋 상태
  const [editText, setEditText] = useState(""); // 댓글 수정창 인풋 상태
  const [openEditor, setOpenEditor] = useState(""); // 댓글 고유id값 담는 상태

  const dispatch = useDispatch();
  const comments = useSelector(state => state.comment);
  const currentUser = useSelector(state => state.user);

  // 댓글 조회
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const { comments } = await axios(`${process.env.REACT_APP_BASE_URL}/comments/comments/${boardId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(setComment(comments.filter(comment => comment.board.boardId === boardId))); // 코멘트(댓글)만 필터링해서 코멘츠 데이터 업데이트
      } catch (err) {
        alert("댓글을 불러오지 못했습니다.");
      }
    })();
  }, [dispatch, boardId]);

  // 댓글 생성하기
  const handleSubmit = async e => {
    if (text === "") return alert("댓글을 작성해 주세요");
    try {
      e.preventDefault();
      const newComment = {
        commentId: uuid(), // 고유 아이디값 생성을 위한 리엑트 ID라이브러리 사용
        board: {
          boardId, // params로 받은 id
        },
        member: {
          memberId: currentUser.memberId,
        },
        comment: null,
        content: text,
        createdDate: `${new Date()}`,
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, newComment);
      dispatch(addComment(response.data));
    } catch (err) {
      alert("댓글을 생성하지 못했습니다.");
    }
  };

  // 댓글 수정하기
  const handleEdit = async (id, editText) => {
    try {
      const editData = { commentId: id, content: editText };
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/comments/${id}`, editData);
      dispatch(editComment(response.data));
    } catch (err) {
      alert("댓글 수정을 실패하였습니다.");
    }
  };

  // 댓글 삭제하기
  const handleDelete = async id => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/comments/${id}`);
      dispatch(deleteComment(response.data));
    } catch (err) {
      alert("댓글 삭제를 실패하였습니다.");
    }
  };

  return (
    <StyledContainer>
      <DetailSubHeader count={comments.length} title="개의 댓글" />
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
      {comments?.map(comment => {
        return (
          <StyledListBlock key={comment.commentId}>
            <StyledItemContents>
              <UserBox infoData={comment} />
              <div className="msg">{comment.content}</div>
              {/* 유저가 해당 댓글의 작성자일 경우만 */}
              {currentUser.memberId === comment.member.memberId && (
                <EditForm>
                  {/* 해당 댓글/대댓글 id가 빈문자가 아니면 수정버튼 클릭시 수정인풋창 보이게 */}
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
            <ReplyCommentSection parentCommentId={comment.commentId} boardId={boardId} />
          </StyledListBlock>
        );
      })}
    </StyledContainer>
  );
}

export default CommentSection;

// 수정버튼 클릭시 수정가능한 코멘트만 수정창 오픈
// const handleEditClick = commentId => {
//   setEdit(!edit); // 수정 버튼 토글
//   setLocal(
//     comments.map(comment => {
//       if (comment.commentId === commentId) {
//         return { ...comment, isEditing: true };
//       } else {
//         return { ...comment, isEditing: false };
//       }
//     })
//   );
// };

// const { data, isLoading, isError, error } = useRequest(
//   `/comments/comments/${id}`,
//   comments => {
//     dispatch(setComment(comments.filter(comment => comment.board.boardId === id)));
//   },
//   "질문을 불러오지 못했습니다.",
//   [dispatch, id]
// );
