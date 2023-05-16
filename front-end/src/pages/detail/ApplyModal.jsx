import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

function ApplyModal({ setModalOpen }) {
  const navigate = useNavigate();
  const handleMoveChat = () => {
    navigate("/");
  };
  return (
    <ModalBackdrop onClick={() => setModalOpen(false)}>
      <ModalView>
        <div className="title">신청 채택</div>
        <div className="desc">해당 신청을 채택 하시겠습니까?</div>
        <div className="utils">
          <Button type="button" bg="var(--primary-color)" color="#fff" onClick={handleMoveChat}>
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
