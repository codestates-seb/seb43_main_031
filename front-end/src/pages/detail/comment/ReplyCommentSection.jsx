import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";
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

// 현재 문제상황
// 댓글 컴포넌트에서 전달받은 parentComment props가 해당 댓글 comment의 commentId로 받아와서 대댓글 컴포넌트에서 해당데이터를 사용할때 아예 댓글 자체가 나오지 않고, -> 이 원인은 댓글이 1개가 아닌 여러개가 나오게 되면 당연히 오류가 날것이다.

// 댓글 comment데이터 자체를 내려주면 댓글들은 잘 렌더링이 된다.
// 댓글 컴포넌트에서 map을 이용해 렌더링을 할때, 왜 1개의 comment가 아닌 서버에 저장된 댓글데이터가 다 담겨져 오는걸까?

// 애초에 댓글 컴포넌트의 멥핑시, 1개의 comment.commentId를 내려줘야하는데 문제를 찾지 못하겠다..

function ReplyCommentSection({ parentComment }) {
  console.log(parentComment); // ???

  const inputRef = useRef(null);
  const [display, setDisplay] = useState(false); // 대댓글 폼 박스 활성화 상태
  const [text, setText] = useState(""); // 대댓글 인풋 상태
  const [editText, setEditText] = useState(""); // 댓글 수정창 인풋 상태
  const [openEditor, setOpenEditor] = useState(""); // 댓글 고유id값 담는 상태

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.userInfo);
  const token = useSelector(state => state.user.token);
  const comments = useSelector(state => state.comment);
  console.log(comments);

  // 전역 comments 데이터 중에서 대댓글에 해당하는 것만 핉터링
  const replyComments = comments.filter(item => item.board === null && item.comment !== null);
  // console.log(replyComments);

  // 모든 대댓글 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments/replys/${parentComment}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(setComment(response.data.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // fetchData 함수 호출

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // 새로운 대댓글 작성
  const handleSubmit = async e => {
    e.preventDefault();
    if (text === "") return alert("대댓글을 작성해 주세요");
    try {
      const newComment = {
        commentId: Number(parentComment),
        content: text,
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, newComment, {
        headers: {
          Authorization: `${token}`,
        },
      });
    } catch (err) {
      alert("댓글을 생성하지 못했습니다.");
    }
  };

  // 대댓글 수정하기
  const handleEdit = async (id, editText) => {
    try {
      const editData = { commentId: id, content: editText };
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/comments/${id}`, editData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const { commentId, content } = response.data;
      dispatch(editComment({ commentId, content }));
    } catch (err) {
      alert("대댓글 수정을 실패하였습니다.");
    }
  };

  // 대댓글 삭제하기
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

  // 체인지시 리렌더링 방지 함수
  const handleChange = useCallback(
    e => {
      setEditText(e.target.value);
    },
    [setEditText]
  );

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
        {!display && (replyComments.length === 0 ? "대댓글 달기" : `${replyComments.length} 개의 대댓글 보기`)}
      </button>
      {display && (
        <ReplyFormBox>
          {replyComments?.map(comment => (
            <ReplyItem key={comment.commnetId}>
              <UserBox infoData={comment} />
              <div className="reply-msg">{comment.content}</div>
              {/* 유저가 해당 댓글의 작성자일 경우만 */}
              {currentUser.memberId === comment.member.memberId && (
                // 해당 댓글/대댓글 id가 빈문자가 아니면 수정버튼 클릭시 수정인풋창 보이게
                <EditForm>
                  {openEditor === comment.commentId && (
                    <input
                      ref={inputRef}
                      type="text"
                      defaultValue={comment.content}
                      key={comment.content}
                      onChange={handleChange}
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
