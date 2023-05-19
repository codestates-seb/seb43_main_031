import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setApply } from "../../redux/features/applySlice";

// 모달 밖 배경
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
// 모달창
const ModalView = styled.div`
  width: 20rem;
  height: 15rem;
  background-color: var(--sub-btn-color);
  border-radius: 0.7rem;

  display: flex;
  flex-direction: column;

  .title {
    padding: 2rem;
    font-size: 1.7rem;
    font-weight: 600;
  }
  .desc {
    padding: 2rem;
  }
  .utils {
    display: flex;
    align-self: end;
    gap: 1rem;
    margin-right: 1.5rem;
  }
`;

// 공통 버튼
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem 1rem;
  background-color: ${props => props.bg};
  color: ${props => props.color};
  border: none;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0.3rem 0.4rem 1rem rgba(0, 0, 0, 0.03);
  }
`;

function ApplyModal({ setModalOpen, applyData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialApplys = useSelector(state => state.apply);

  // 기존 저장된 신청글과 모달 클릭시 전달된 특정 신청글과 id 값 비교하여 맞는 신청글찾기
  const selectedApply = initialApplys.find(item => item.applyId === applyData.applyId);

  // 채택 승인 이벤트(채택상태수정)
  const handleMoveChat = async id => {
    if (selectedApply) {
      try {
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/applys/accept/${id}`);
        dispatch(setApply(response.data));
        navigate("/chat");
      } catch (err) {
        alert("채택이 정상적으로 되지 못했습니다.");
      }
    }
  };
  return (
    <ModalBackdrop onClick={() => setModalOpen(false)}>
      <ModalView onClick={event => event.stopPropagation()}>
        <div className="title">신청 채택</div>
        <div className="desc">해당 신청을 채택 하시겠습니까?</div>
        <div className="utils">
          <Button
            type="button"
            bg="var(--primary-color)"
            color="#fff"
            onClick={() => handleMoveChat(selectedApply.applyId)}
          >
            확인
          </Button>
          <Button type="button" bg="var(--cancle-btn-color)" color="#111" onClick={() => setModalOpen(false)}>
            취소
          </Button>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

export default ApplyModal;
