import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";
import axios from "axios";

import styled from "styled-components";

import { addApply, deleteApply, setApply } from "../../redux/features/applySlice";

import UserBox from "./UserBox";
import DetailSubHeader from "./SubHeader";
import ApplyModal from "./ApplyModal";

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
function ApplySection({ boardData }) {
  const { id, memberId } = boardData;

  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({
    memberId: 1,
    email: "test@gmail.com",
    nickName: "nickname",
    phone: "010-1234-5678",
    image: "",
  });

  const dispatch = useDispatch();
  const applys = useSelector(state => state.apply);

  // 렌더링 시 모든 신청글 조회
  useEffect(() => {
    window.scrollTo(0, 0);
    async () => {
      try {
        const { applys } = await axios(`/applys/boardId/${id}}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(setApply(applys.filter(apply => apply.board.boardId === id)));
      } catch (err) {
        alert("질문을 불러오지 못했습니다.");
      }
    };
  }, [dispatch, id]);

  // 신청 생성하기
  const handleSubmit = async e => {
    e.preventDefault();
    const newApply = {
      boardId: id,
      applyId: uuid(),
      applyStatus: false,
      createdDate: `${new Date()}`,
    };
    await axios
      .post(`/applys`, newApply)
      .then(response => {
        dispatch(addApply(response.data));
      })
      .catch(err => {
        alert("신청을 성공적으로 보내지 못했습니다.");
      });
  };

  // 신청 삭제하기
  const handleDelete = id => {
    axios
      .delete(`/apply/${id}`)
      .then(res => {
        console.log(res.status);
        dispatch(deleteApply(res.data));
      })
      .catch(err => {
        alert("신청 삭제를 실패하였습니다.");
      });
  };

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <StyledContainer>
      <DetailSubHeader count={applys.length} title="개의 신청" />
      {applys.map(apply => {
        return (
          <StyledListBlock key={apply.applyId}>
            <StyledItemContents>
              <UserBox infoData={apply} />
              <UtilBox>
                {user.memberId === apply.board.memberId ? (
                  <button className="acceptedBtn" type="button" onClick={showModal}>
                    채택하기
                  </button>
                ) : null}
                {modalOpen && <ApplyModal setModalOpen={setModalOpen} />}
                {user.memberId === apply.board.memberId ? (
                  <div className="fixAndDelete">
                    <button type="button" onClick={() => handleDelete(apply.applyId)}>
                      삭제
                    </button>
                  </div>
                ) : null}
              </UtilBox>
            </StyledItemContents>
          </StyledListBlock>
        );
      })}
      <ApplyBtn onClick={handleSubmit}>신청하기</ApplyBtn>
    </StyledContainer>
  );
}

export default ApplySection;
