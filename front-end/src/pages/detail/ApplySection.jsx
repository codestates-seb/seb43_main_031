import React, { useState } from "react";
import styled from "styled-components";
import UserBox from "./UserBox";

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
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  box-shadow: 0 0.1rem 0.7rem 0.1rem rgba(0, 0, 0, 0.1);
`;

// 신청 아이템
const StyledItemContents = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 아이템 정보들
const UtilBox = styled.div`
  .acceptedBtn {
    margin-bottom: 0.9rem;
    padding: 0.7rem 1rem;
    background-color: var(--sub-color);
    border: none;
    border-radius: 5rem;
    cursor: pointer;

    &:hover {
      background-color: rgba(227, 235, 124, 0.6);
    }
  }
  .fixAndDelete {
    display: flex;
    justify-content: center;
    & > button {
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
`;

// 신청 버튼
const ApplyBtn = styled.button`
  width: 100%;
  margin: 1rem auto;
  padding: 1rem;
  border: none;
  border-radius: 2rem;
  background-color: var(--primary-color);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(190, 24, 31, 0.8);
  }
`;

// 신청 컴포넌트
function ApplySection({ applysData, boardData }) {
  const { id, memberId } = boardData;
  const findBoardInApplysData = applysData.filter(apply => apply.boardId === boardData.id);
  // console.log(findBoardInApplysData);

  const [user, setUser] = useState({
    memberId: 1,
    email: "test@gmail.com",
    nickName: "nickname",
    phone: "010-1234-5678",
    image: "",
  });

  return (
    <StyledContainer>
      {applysData.map(apply => {
        return (
          <StyledListBlock key={apply.applyId}>
            <StyledItemContents>
              <UserBox infoData={apply} />
              <UtilBox>
                {user.memberId === apply.boardId ? (
                  <button className="acceptedBtn" type="button">
                    채택하기
                  </button>
                ) : null}
                {user.memberId === apply.memberId ? (
                  <div className="fixAndDelete">
                    <button type="button">삭제</button>
                  </div>
                ) : null}
              </UtilBox>
            </StyledItemContents>
          </StyledListBlock>
        );
      })}
      <ApplyBtn>신청하기</ApplyBtn>
    </StyledContainer>
  );
}

export default ApplySection;
