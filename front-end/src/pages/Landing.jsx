import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

import mapClick from "../img/mapClick.jpeg";
import Footer from "../layouts/Footer";

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
  text-align: center;
`;

const SectionTwo = styled(SharedSection)`
  background-color: #db8787;
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
        <SpanWrapper>
          <span>1:1 채팅으로</span>
          <span>간편하고 빠르게 매칭</span>
        </SpanWrapper>
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
