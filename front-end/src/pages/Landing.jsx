import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";

import mapClick from "../img/mapClick.jpeg";
import Footer from "../layouts/Footer";

import chatMobile from "../img/chat-mobile.png";
import detailMobile from "../img/detail-mobile.png";
import boardLaptop from "../img/list-laptop.png";

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

const AnimatedSDelay = styled.span`
  animation: ${fadeIn} 1s ease-in-out;
  animation-fill-mode: both;
  &:nth-child(1) {
    animation-delay: 0.3s;
  }
  &:nth-child(2) {
    animation-delay: 1.1s;
  }
`;

const SharedSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 24px;
`;

const SectionOne = styled(SharedSection)`
  background-color: #fae7e7;
  span {
    font-size: 3rem;
    color: #743e3e;
    font-weight: 700;
    text-shadow: #12000358 0px 4px 4px;
    opacity: 0;
    transition: all 3s;
    .hightLight {
      display: inline;
      color: rgb(208, 68, 71);
    }
  }
  img {
    margin-top: 3rem;
    height: 25rem;
    width: 25rem;
    border-radius: 20px;
    box-shadow: #12000358 0px 4px 8px;
  }
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
  @media (max-width: 450px) {
    font-size: 2rem;
    text-align: center;
    .sub-content {
      font-size: 1rem;
    }
  }

  .sub-content {
    margin: 1rem 2rem 1rem 0;
    font-size: 1.5rem;
  }
`;

const ImgChatMobile = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: 40px;
  position: relative;

  .detail-mobile {
    width: 300px;
    height: 370px;
    position: absolute;
    top: 90px;
    left: 90px;
    z-index: 1;
    animation: ${fadeIn} 4s ease-in-out;
    animation-fill-mode: both;
  }

  .chat-mobile {
    width: 300px;
    height: 370px;
    animation: ${fadeIn} 3s ease-in-out;
    animation-fill-mode: both;
  }
`;

const SectionTwo = styled(SharedSection)`
  background-color: #db8787;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
    .chat-mobile {
      width: 200px;
      height: 250px;
      margin: 1rem 5rem 0rem -2rem;
    }
    .detail-mobile {
      width: 200px;
      height: 250px;
      position: absolute;
      top: 49px;
      left: 69px;
      z-index: 1;
    }
  }
`;

const SectionThree = styled(SharedSection)`
  width: 100%;
  height: 900px;
  text-align: center;
  background-color: #fff;

  display: flex;
  flex-direction: column;
`;

const SpanThreeWrapper = styled(SpanWrapper)`
  display: flex;
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
          <AnimatedSDelay>
            우리동네 <p className="hightLight">심부름</p>은
          </AnimatedSDelay>
          <AnimatedSDelay>빨간망토에서</AnimatedSDelay>
          <img src={mapClick} alt="map" />
        </SpanWrapper>
      </SectionOne>
      <SectionTwo ref={sectionTwoRef}>
        <AnimatedSDelay>
          <SpanTwoWrapper>
            <span>1:1 채팅으로</span>
            <span>간편하고 빠르게 매칭</span>
            <span className="sub-content">연결된 사람과 원활히 소통하여 윈윈할 수 있는 활동을 할 수 있어요!</span>
          </SpanTwoWrapper>
        </AnimatedSDelay>
        <ImgChatMobile>
          <img src={detailMobile} alt="detail-mobile" className="detail-mobile" />
          <img src={chatMobile} alt="chat-mobile" className="chat-mobile" />
        </ImgChatMobile>
      </SectionTwo>
      <ObserverPattern>
        <SpanThreeWrapper>
          <AnimatedSDelaySecond>
            <p>이웃과 함께하는 동네 생활</p>
          </AnimatedSDelaySecond>
          <AnimatedSDelaySecond>
            <span>우리 동네 다양한 이야기를 함께 나눠요</span>
          </AnimatedSDelaySecond>
        </SpanThreeWrapper>
        <ImgBoardLaptop>
          <img src={boardLaptop} alt="board-laptop" />
        </ImgBoardLaptop>
        <GoToLogin type="button">소통하러 가기</GoToLogin>
      </ObserverPattern>
      <Footer />
    </>
  );
}

const ImgBoardLaptop = styled.div`
  margin: 0;
  position: relative;
  top: 0;
  left: 0;
  opacity: 1;
  animation: ${fadeIn} 1s ease-in;

  & > img {
    width: 50rem;
    height: 40rem;
  }
`;

const GoToLogin = styled.button`
  padding: 1rem;
  background-color: var(--primary-color);
  border: none;
  border-radius: 2rem;
  color: #fff;
  font-size: 1.4rem;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const AnimatedSDelaySecond = styled.span`
  animation: ${fadeIn} 1s ease-in-out;
  animation-fill-mode: both;
  &:nth-child(1) {
    animation-delay: 0.3s;
  }
  &:nth-child(2) {
    animation-delay: 1.1s;
  }

  & > p {
    color: var(--primary-color);
    font-size: 4rem;
    font-weight: 900;
    text-shadow: var(--bg-color) 3px 4px 2px;
    margin-bottom: 1rem;
  }

  & > span {
    color: var(--font-color-light);
  }
`;

function ObserverPattern({ children }) {
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  return (
    <SectionThree
      ref={ref}
      style={{
        transition: "all 1s ease-in-out",
        opacity: inView ? 1 : 0,
      }}
    >
      {children}
    </SectionThree>
  );
}
