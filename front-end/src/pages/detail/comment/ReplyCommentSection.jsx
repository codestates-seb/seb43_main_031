import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import styled from "styled-components";
import uuid from "react-uuid";

import UserBox from "../UserBox";
import { addComment, editComment, deleteComment, setComment } from "../../../redux/features/commentSlice";

// 대댓글 컨테이너
const ReplyContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  /* background-color: #e5e5e5; */
  .plusReplyBtn {
    /* margin: 1rem 0 0; */
    background-color: transparent;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }
  }
`;

// 대댓글 작성 폼 박스
const ReplyFormBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;

  .replyInput {
    width: 100%;
    height: 5rem;
    margin-bottom: 1rem;
    padding: 0 1rem 1rem;
    background-color: var(--bg-color);
    border: none;
    border-radius: 1rem;
  }

  .utils {
    align-self: end;
    display: flex;
    gap: 1rem;
    .cancle {
      padding: 0.5rem 0.7rem;
      background-color: transparent;
      border: none;
      border-radius: 1rem;
      color: black;
      cursor: pointer;
    }
    .add {
      padding: 0.5rem 0.7rem;
      background-color: var(--primary-color);
      border: none;
      border-radius: 1rem;
      color: #fff;
      cursor: pointer;
    }
  }
`;

// 대댓글 아이템
const ReplyItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.2rem;
  padding: 0.5rem;
  border-bottom: 1px solid var(--primary-color);

  .reply-msg {
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

function ReplyCommentSection({ parentCommentId, boardId }) {
  const [display, setDisplay] = useState(false); // 대댓글 폼 박스 활성화 상태
  const [text, setText] = useState(""); // 대댓글 인풋 상태
  const [editText, setEditText] = useState(""); // 댓글 수정창 인풋 상태
  const [user, setUser] = useState({
    memberId: 1,
    email: "test@gmail.com",
    nickName: "nickname",
    phone: "010-1234-5678",
    image: "",
  });
  const [openEditor, setOpenEditor] = useState(""); // 댓글 고유id값 담는 상태

  const dispatch = useDispatch();
  const comments = useSelector(state => state.comment);

  const inputRef = useRef(null);

  // 모든 대댓글 조회
  useEffect(() => {
    async () => {
      try {
        const { comments } = await axios(`/comments/replys/${parentCommentId}}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        dispatch(setComment(comments.filter(comment => comment.comment.commentId === parentCommentId)));
      } catch (err) {
        alert("해당 댓글의 답변을 불러오지 못했습니다.");
      }
    };
  }, [dispatch, parentCommentId]);

  // 새로운 대댓글 작성
  const handleSubmit = async e => {
    e.preventDefault();
    if (text === "") return alert("대댓글을 작성해 주세요");
    const newComment = {
      commentId: uuid(), // 고유 아이디값 생성을 위한 리엑트 ID라이브러리 사용
      board: null,
      member: {
        memberId: user.memberId,
      },
      comment: {
        commentId: parentCommentId,
      },
      content: text,
      createdDate: `${new Date()}`,
    };
    await axios
      .post(`/comments`, newComment)
      .then(response => {
        dispatch(addComment(response.data));
        setText("");
      })
      .catch(err => {
        alert("대댓글을 생성하지 못했습니다.");
      });
  };

  // 대댓글 수정하기
  const handleEdit = (id, editText) => {
    const editData = { commentId: id, content: editText };
    axios
      .patch(`/comments/${id}`, editData)
      .then(res => {
        dispatch(editComment(res.data));
      })
      .catch(err => {
        alert("대댓글 수정을 실패하였습니다.");
      });
  };

  // 대댓글 삭제하기
  const handleDelete = id => {
    axios
      .delete(`/comments/${id}`)
      .then(res => {
        console.log(res.status);
        dispatch(deleteComment(res.data));
      })
      .catch(err => {
        alert("대댓글 삭제를 실패하였습니다.");
      });
  };

  return (
    <ReplyContainer>
      <button
        className="plusReplyBtn"
        type="button"
        onClick={() => {
          setDisplay(!display);
        }}
      >
        {display && "숨기기"}
        {!display && (comments.length === 0 ? "대댓글 달기" : `${comments.length} 개의 대댓글 보기`)}
      </button>
      {display && (
        <ReplyFormBox>
          {comments?.map(comment => (
            <ReplyItem key={comment.commnetId}>
              <UserBox infoData={comment} />
              <div className="reply-msg">{comment.content}</div>
              {/* 유저가 해당 댓글의 작성자일 경우만 */}
              {user.memberId === comment.member.memberId && (
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
            </ReplyItem>
          ))}
          <input
            type="text"
            className="replyInput"
            value={text}
            placeholder="댓글추가"
            onChange={e => setText(e.target.value)}
          />
          <div className="utils">
            <button type="button" className="cancle" onClick={() => setDisplay(!display)}>
              취소
            </button>
            <button type="button" className="add" onClick={handleSubmit}>
              답글달기
            </button>
          </div>
        </ReplyFormBox>
      )}
    </ReplyContainer>
  );
}

export default ReplyCommentSection;
