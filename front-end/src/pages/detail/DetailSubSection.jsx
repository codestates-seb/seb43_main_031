import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

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

// 리스트 아이템 윗부분 정보 박스
const StyledTopContents = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1.2rem;

  .msg {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
// 리스트 아이템 아랫부분 정보 박스
const StyledBottomContents = styled.div`
  display: flex;
  justify-content: space-between;

  .userInfo {
    display: flex;
    .author {
      margin-right: 1rem;
    }
  }

  .utils {
    display: flex;
  }

  button {
    flex: 2 0 0;
    color: var(--sub-btn-color);
    font-size: 0.8rem;
    background-color: transparent; // 투명하게
    border: none;
    cursor: pointer;
    &:hover {
      color: var(--primary-color);
    }
  }
`;
// 문의(코멘츠), 신청(답변)글 컴포넌트 -> 모양 비슷 -> 공통으로 사용
function DetailSubSection({ type, el, userId, commentId, applyId, boardId, createdDate, content }) {
  const [isEdit, setIsEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <StyledContainer>
      <StyledListBlock>
        <StyledTopContents>
          <div className="msg">{content}</div>
          {applyId ? <AiOutlineCheckCircle style={{ width: "1.8rem", height: "1.8rem" }} /> : null}
        </StyledTopContents>
        <StyledBottomContents>
          <div className="userInfo">
            <div className="author">{userId}</div>
            <div className="createdAt">{createdDate}</div>
          </div>
          <div className="utils">
            <button type="button">수정</button>
            <button type="button">삭제</button>
          </div>
        </StyledBottomContents>
      </StyledListBlock>
    </StyledContainer>
  );
}

export default DetailSubSection;
