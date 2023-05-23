import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

import Footer from "../layouts/Footer";

import chatMobile from "../img/chat-mobile.png";
import detailMobile from "../img/detail-mobile.png";

const SharedSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 24px;
`;

const SectionOne = styled(SharedSection)`
  background-color: #fae7e7;
  opacity: 0;
  transition: all 3s;
`;

const SpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: black;
`;

const SpanTwoWrapper = styled(SpanWrapper)`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;

  .sub-content {
    margin: 1rem 2rem 1rem 0;
    font-size: 1.5rem;
  }
`;

const ImgChatMobile = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  position: relative;

  .detail-mobile {
    width: 300px;
    height: 370px;
    position: absolute;
    top: 90px;
    left: 58px;
    z-index: 1;
  }

  .chat-mobile {
    width: 300px;
    height: 370px;
  }
`;

const SectionTwo = styled(SharedSection)`
  background-color: #db8787;
  flex-direction: row;
`;

const SectionThree = styled(SharedSection)`
  background-color: #fff;
`;

const SectionFour = styled(SharedSection)`
  background-color: #fae7e7;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedSpan = styled.span`
  animation: ${fadeIn} 1s ease-in-out;
  animation-fill-mode: both;
  &:nth-child(1) {
    animation-delay: 0.3s;
  }
  &:nth-child(2) {
    animation-delay: 1.2s;
  }
`;

export default function Landing() {
  const sectionOneRef = useRef(null);
  const sectionTwoRef = useRef(null);

  useEffect(() => {
    const observerOne = new IntersectionObserver(entries => {
      const { target } = entries[0];
      if (entries[0].isIntersecting) {
        target.style.opacity = 1;
      }
      if (!entries[0].isIntersecting) {
        target.style.opacity = 0;
      }
    });

    observerOne.observe(sectionOneRef.current);
  }, []);

  return (
    <>
      <SectionOne ref={sectionOneRef}>
        <SpanWrapper>
          <AnimatedSpan>우리동네 심부름은</AnimatedSpan>
          <AnimatedSpan>빨간망토에서</AnimatedSpan>
        </SpanWrapper>
      </SectionOne>
      <SectionTwo ref={sectionTwoRef}>
        <SpanTwoWrapper>
          <span>1:1 채팅으로</span>
          <span>간편하고 빠르게 매칭</span>
          <span className="sub-content">연결된 사람과 원활히 소통하여 윈윈할 수 있는 활동을 할 수 있어요!</span>
        </SpanTwoWrapper>
        <ImgChatMobile>
          <img src={detailMobile} alt="detail-mobile" className="detail-mobile" />
          <img src={chatMobile} alt="chat-mobile" className="chat-mobile" />
        </ImgChatMobile>
      </SectionTwo>
      <SectionThree>
        <SpanWrapper>
          <span>이웃과 함께하는 동네 생활</span>
          <span>우리 동네 다양한 이야기를 함께 나눠요</span>
        </SpanWrapper>
      </SectionThree>
      <SectionFour>
        <h1>도와주러 가기</h1>
      </SectionFour>
      <Footer />
    </>
  );
}
