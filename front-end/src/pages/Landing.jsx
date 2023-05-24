import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";

import mapClick from "../img/mapClick.jpeg";
import Footer from "../layouts/Footer";

import chatMobile from "../img/chat-mobile.png";
import detailMobile from "../img/detail-mobile.png";
import boardLaptop from "../img/list-laptop.png";

// 공통 섹션 프레임
const SharedSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 24px;
`;

// 공통 텍스트 래퍼
const SpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: black;
`;

// 에니메이션 페이드인
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

// 에니메이션 딜레이
const FadeInDelay = styled.span`
  animation: ${fadeIn} 1s ease-in-out;
  animation-fill-mode: both;
  &:nth-child(1) {
    animation-delay: 0.3s;
  }
  &:nth-child(2) {
    animation-delay: 1.1s;
  }
`;

// 에니메이션 투명도
const opcityIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 에니메이션 투명도 딜레이
const OpcityInDelay = styled.div`
  animation: ${opcityIn} 1s ease-in-out;
  animation-fill-mode: both;
  &:nth-child(1) {
    animation-delay: 0.3s;
  }
  &:nth-child(2) {
    animation-delay: 1.1s;
  }
  &:nth-child(3) {
    animation-delay: 1.9s;
  }
`;

// 첫번째 페이지
const SectionOne = styled(SharedSection)`
  background-color: #fae7e7;
  display: flex;
  gap: 5rem;
  img {
    margin-top: 3rem;
    height: 25rem;
    width: 25rem;
    border-radius: 20px;
    box-shadow: #12000358 0px 4px 8px;
    @media (max-width: 450px) {
      height: 15rem;
      width: 15rem;
    }
  }
  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

// 첫번째 페이지 안 버튼 레퍼
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  & button {
    height: 3rem;
    width: 13rem;
    margin-top: 5rem;
    font-size: 1.5rem;
    color: #fff;
    font-weight: 600;
    border-style: none;
    border-radius: 20px;
    background-color: rgb(208, 68, 71);
    &:hover {
      background-color: var(--primary-color);
    }
    @media (max-width: 450px) {
      margin-top: 3rem;
    }
  }
`;

// 첫번째 페이지 안 텍스트 레퍼
const SpanOneWrapper = styled(SpanWrapper)`
  margin-top: 3rem;
  color: #743e3e;
  font-weight: 700;
  @media (max-width: 450px) {
    margin-top: 0;
    text-align: center;
  }
  & span {
    font-size: 2.5rem;
    text-shadow: #12000358 0px 4px 4px;
    transition: all 3s;
    .hightLight {
      display: inline;
      color: rgb(208, 68, 71);
    }
  }
  .subTitle {
    font-size: 1.5rem;
    margin-top: 2.5rem;
    @media (max-width: 450px) {
      margin-top: 1rem;
      text-align: center;
    }
  }
`;

// 두번째 페이지
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

// 두번째 페이지 안 텍스트 레퍼
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

// 두번째 페이지 안 모바일 사진
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

// 세번째 페이지
const SectionThree = styled(SharedSection)`
  width: 100%;
  height: 900px;
  text-align: center;
  background-color: #fff;

  display: flex;
  flex-direction: column;
`;

// 세번째 페이지 안 텍스트 래퍼
const SpanThreeWrapper = styled(SpanWrapper)`
  display: flex;
`;

// 세번째 페이지 안 랩탑 사진
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

// 세번째 페이지 안 로그인 이동 버튼
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

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <SectionOne>
        <img src={mapClick} alt="map" />
        <SpanOneWrapper>
          <FadeInDelay>
            우리 동네 <p className="hightLight">심부름</p>은
          </FadeInDelay>
          <FadeInDelay>빨간망토에서</FadeInDelay>
          <OpcityInDelay>
            <p className="subTitle">가까운 거리로 부담 없이 이용해 보세요!</p>
            <ButtonWrapper>
              <button type="button" onClick={() => navigate("/boards")}>
                도와주러 가기
              </button>
            </ButtonWrapper>
          </OpcityInDelay>
        </SpanOneWrapper>
      </SectionOne>
      <ObserverPatternSecond>
        <FadeInDelay>
          <SpanTwoWrapper>
            <span>1:1 채팅으로</span>
            <span>간편하고 빠르게 매칭</span>
            <span className="sub-content">연결된 사람과 원활히 소통하여 윈윈할 수 있는 활동을 할 수 있어요!</span>
          </SpanTwoWrapper>
        </FadeInDelay>
        <ImgChatMobile>
          <img src={detailMobile} alt="detail-mobile" className="detail-mobile" />
          <img src={chatMobile} alt="chat-mobile" className="chat-mobile" />
        </ImgChatMobile>
      </ObserverPatternSecond>
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
        <GoToLogin type="button" onClick={() => navigate("/login")}>
          소통하러 가기
        </GoToLogin>
      </ObserverPattern>
      <Footer />
    </>
  );
}

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

function ObserverPatternSecond({ children }) {
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  return (
    <SectionTwo
      ref={ref}
      style={{
        transition: "all 1s ease-in-out",
        opacity: inView ? 1 : 0,
      }}
    >
      {children}
    </SectionTwo>
  );
}
