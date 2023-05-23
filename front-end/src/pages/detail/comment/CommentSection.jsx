import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useNavigate, useParams } from "react-router-dom";
import { addComment, editComment, deleteComment, setComment } from "../../../redux/features/commentSlice";

import UserBox from "../UserBox";
import DetailSubHeader from "../SubHeader";
import ReplyCommentSection from "./ReplyCommentSection";
// import useRequest from "../../../shared/useRequest";

// 전체 컨테이너
const StyledContainer = styled.div`
  width: 90%;
  height: 42rem;
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

// 새로운 댓글 작성 박스
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
    align-self: end;
    padding: 0.7rem 1rem;
    background-color: var(--primary-color);
    border: none;
    border-radius: 1.5rem;
    color: #fff;
    font-size: 1rem;
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
function CommentSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [text, setText] = useState(""); // 댓글 인풋 상태
  const [editText, setEditText] = useState(""); // 댓글 수정창 인풋 상태
  const [openEditorInCommentId, setOpenEditorInCommentId] = useState(""); // 댓글 고유id값 담는 상태

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.userInfo);
  const token = useSelector(state => state.user.token);
  const comments = useSelector(state => state.comment) || [];

  // 댓글 필터링
  const parentComments = comments.filter(item => item.board !== null && item.comment === null);

  // 댓글 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`${process.env.REACT_APP_BASE_URL}/comments/comments/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(setComment(response.data.data));
        // 전역 comments 데이터 중에서 댓글에 해당하는 것만 핉터해서 저장
        // setParentComments(comments.filter(item => item.board !== null && item.comment === null));
      } catch (err) {
        alert("댓글을 불러오지 못했습니다.");
      }
    };

    fetchData();
  }, [dispatch, id]); // 업데이트가 되는 상태는 꼭 종속성에 추가해주자

  // 댓글 생성하기
  const handleSubmit = async e => {
    e.preventDefault();
    if (text === "") return alert("댓글을 작성해 주세요");
    if (currentUser === null) {
      alert("댓글을 남기기 위해선 로그인이 필요합니다.");
      navigate("/login");
    }
    try {
      const newComment = {
        boardId: Number(id),
        content: text,
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, newComment, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(addComment(response.data.data));
      setText("");
    } catch (err) {
      alert("댓글을 생성하지 못했습니다.");
    }
  };

  // 댓글 수정하기
  const handleEdit = async (id, editText) => {
    try {
      const editData = { commentId: id, content: editText };
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/comments/${id}`, editData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const { commentId, content } = response.data.data;
      dispatch(editComment({ commentId, content }));
    } catch (err) {
      alert("댓글 수정을 실패하였습니다.");
    }
  };

  // 댓글 삭제하기
  const handleDelete = async id => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/comments/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(deleteComment(id));
    } catch (err) {
      alert("댓글 삭제를 실패하였습니다.");
    }
  };

  return (
    <StyledContainer>
      <DetailSubHeader count={parentComments.length} title="개의 댓글" />
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
      {parentComments.map(comment => {
        return (
          <StyledListBlock key={comment.commentId}>
            <StyledItemContents>
              <UserBox infoData={comment} />
              <div className="msg">{comment.content}</div>
              {/* 유저가 해당 댓글의 작성자일 경우만 */}
              {currentUser !== null && currentUser.memberId === comment.member.memberId && (
                <EditForm>
                  {/* 해당 댓글/대댓글 id가 빈문자가 아니면 수정버튼 클릭시 수정인풋창 보이게 */}
                  {openEditorInCommentId === comment.commentId && (
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
                          if (comment.commentId === openEditorInCommentId) {
                            handleEdit(comment.commentId, editText);
                            setOpenEditorInCommentId("");
                          } else {
                            setOpenEditorInCommentId(comment.commentId);
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
            <ReplyCommentSection parentId={comment.commentId} />
          </StyledListBlock>
        );
      })}
    </StyledContainer>
  );
}

export default CommentSection;

// 시도했다가 안된 코드들

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

// 요청 훅으로 리펙토링할 코드
// const { data, isLoading, isError, error } = useRequest(
//   `/comments/comments/${id}`,
//   comments => {
//     dispatch(setComment(comments.filter(comment => comment.board.boardId === id)));
//   },
//   "질문을 불러오지 못했습니다.",
//   [dispatch, id]
// );

// 풀어야했던 로직 설명

// 먼저 부모의 댓글의 id를 찾아야한다. -> 그래야 대댓글 조회요청을 보낼때 엔드포인트에 주소로 해당 댓글 id를 넣어 보낼수 있기 때문이다.
// 전역으로 저장된 commentsd에서 부모댓글을 필터링 쭉 해서 변수에 저장하고, 그 변수에 해당하는 부모댓글 배열중 find메소드를 사용하여, 부모댓글중 같은 코멘트 아이디를 찾아서 그거에 맞는 대댓글을 추가해주는 배열을 만들어야한다.

// 대댓글 필터링
// const childComments = comments.filter(item => item.board === null && item.comment !== null);
// console.log(childComments);

// 대댓글이 있음 추가하고, 없음 그대로 담기는 댓글배열들
// const commentsWithReplies = childComments.map(childComment => {
//   const parentComment = parentComments.find(comment => comment.commentId === childComment.comment.commentId);
//   if (parentComment) {
//     // 대댓글을 댓글 객체에 추가
//     if (!parentComment.replies) {
//       parentComment.replies = [];
//     }
//     parentComment.replies.push(childComment);
//   }
//   return childComment;
// });
// console.log(commentsWithReplies);
