import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import uuid from "react-uuid";
import axios from "axios";

import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";
import { addApply, deleteApply, setApply, setIsApplied } from "../../redux/features/applySlice";

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
  background-color: ${props => props.bg};
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

const GoChat = styled.button`
  padding: 1rem;
  background-color: #fff;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

// 신청 버튼
const ApplyBtn = styled.button`
  width: 100%;
  margin: 1rem auto;
  padding: 1rem;
  border: none;
  border-radius: 2rem;
  background-color: ${props => props.bg || "var(--primary-color)"};
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.hoverBg || "rgba(190, 24, 31, 0.8)"};
  }
`;

// 신청 컴포넌트
function ApplySection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedApply, setSelectedApply] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.userInfo);
  const token = useSelector(state => state.user.token);
  const applys = useSelector(state => state.apply.applies) || [];
  const isApplied = useSelector(state => state.apply.isApplied);

  // 렌더링 시 모든 신청글 조회
  useEffect(() => {
    (async () => {
      try {
        const response = await axios(`${process.env.REACT_APP_BASE_URL}/applys/boardId/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(setApply(response.data.data));
      } catch (err) {
        alert("신청을 불러오지 못했습니다.");
      }
    })();
  }, [dispatch, id]);

  // 신청 생성하기
  const handleSubmit = async e => {
    if (currentUser === null) {
      alert("신청을 하기 위해선 로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    try {
      e.preventDefault();
      const newApply = {
        boardId: Number(id),
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/applys`, newApply, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(addApply(response.data.data));
      dispatch(setIsApplied(true));
    } catch (err) {
      if (currentUser !== null) return alert("신청을 생성하지 못했습니다.");
    }
  };

  // 신청 삭제하기
  const handleDelete = async id => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/applys/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch(deleteApply(id));
      dispatch(setIsApplied(false));
    } catch (err) {
      alert("신청 삭제를 실패하였습니다.");
    }
  };

  // 채팅방 가기
  const goChatRoom = id => {
    navigate(`/chat/${id}`);
  };

  if (applys.length === undefined) return null;

  return (
    <StyledContainer>
      <DetailSubHeader count={applys.length} title="개의 신청" />
      {applys.map(apply => {
        const handleShowModal = () => {
          setModalOpen(true);
          setSelectedApply(apply); // 선택된 apply 데이터를 저장합니다.
        };
        return (
          <StyledListBlock key={apply.applyId} bg={apply.applyStatus === "APLLY_ACCEPT" && "var(--sub-color)"}>
            <StyledItemContents>
              <UserBox infoData={apply} />
              {/* 신청글이 채택된 것들중에 현재 접속한 유저가 게시글 작성자이거나 신청을 작성한 유저이면 채팅방 갈수 있도록 */}
              {apply.applyStatus === "APLLY_ACCEPT" &&
              currentUser !== null &&
              (currentUser.memberId === apply.board.member.memberId ||
                currentUser.memberId === apply.member.memberId) ? (
                <GoChat onClick={() => goChatRoom(apply.applyId)}>채팅방 가기</GoChat>
              ) : (
                <UtilBox>
                  {/* 게시글 작성자가 유저일때  */}
                  {currentUser !== null &&
                  currentUser.memberId === apply.board.member.memberId &&
                  apply.applyStatus === "APPLY_REQUEST" ? (
                    <button className="acceptedBtn" type="button" onClick={handleShowModal}>
                      채택하기
                    </button>
                  ) : null}
                  {/* 신청글 작성자가 유저일때 */}
                  {currentUser !== null &&
                  currentUser.memberId === apply.member.memberId &&
                  apply.applyStatus === "APPLY_REQUEST" ? (
                    <div className="fixAndDelete">
                      <button type="button" onClick={() => handleDelete(apply.applyId)}>
                        삭제
                      </button>
                    </div>
                  ) : null}
                  {modalOpen && <ApplyModal setModalOpen={setModalOpen} applyData={selectedApply} />}
                </UtilBox>
              )}
            </StyledItemContents>
          </StyledListBlock>
        );
      })}
      {isApplied ? (
        <ApplyBtn
          onClick={handleSubmit}
          disabled={isApplied}
          bg={isApplied && "var(--cancle-btn-color)"}
          hoverBg={isApplied && "none"}
        >
          신청완료
        </ApplyBtn>
      ) : (
        <ApplyBtn onClick={handleSubmit} disabled={isApplied}>
          신청하기
        </ApplyBtn>
      )}
    </StyledContainer>
  );
}

export default ApplySection;
