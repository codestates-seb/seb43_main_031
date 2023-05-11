import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import uuid from "react-uuid";

import UserBox from "../UserBox";
import { addComment } from "../../../redux/features/commentSlice";

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
  margin: 2rem 0;
  padding: 0.5rem;
  border-bottom: 1px solid var(--primary-color);

  .utils {
    display: flex;
    justify-content: space-between;

    & > .fixAndDelete {
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

  .reply-msg {
    margin: 1rem;
    padding: 1rem;
  }
`;

function ReplyCommentSection({ responseTo }) {
  const [display, setDisplay] = useState(false); // 대댓글 폼 박스 활성화 상태
  const [local, setLocal] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState({
    memberId: 1,
    email: "test@gmail.com",
    nickName: "nickname",
    phone: "010-1234-5678",
    image: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comment);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    setLocal(comments.filter(comment => comment.responseTo === responseTo));
  }, [comments, responseTo]);

  // 새로운 대댓글 작성
  const handleSubmit = e => {
    e.preventDefault();
    const newData = {
      boardId: id, // params로 받은 id
      commentId: uuid(), // 고유 아이디값 생성을 위한 리엑트 ID라이브러리 사용
      content: text,
      responseTo, // 대댓글 연결을 위한 상태 추가
      createdDate: `${new Date()}`,
    };
    dispatch(addComment(newData));
    setText("");
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
        {!display && (local.length === 0 ? "대댓글 달기" : `${local.length} 개의 대댓글 보기`)}
      </button>
      {display && (
        <ReplyFormBox>
          {local?.map(comment => (
            <ReplyItem key={comment.commnetId}>
              <div className="utils">
                <UserBox infoData={comment} />
                {user === comment.memberId && (
                  <div className="fixAndDelete">
                    <button type="button">수정</button>
                    <button type="button">삭제</button>
                  </div>
                )}
              </div>
              <div className="reply-msg">{comment.content}</div>
            </ReplyItem>
          ))}
          <input
            type="text"
            className="replyInput"
            value={text}
            placeholder="댓글추가"
            onChange={e => setText(e.target.value)}
            onClick={handleSubmit}
          />
          <div className="utils">
            <button type="button" className="cancle" onClick={() => setDisplay(!display)}>
              취소
            </button>
            <button type="button" className="add">
              답글달기
            </button>
          </div>
        </ReplyFormBox>
      )}
    </ReplyContainer>
  );
}

export default ReplyCommentSection;
