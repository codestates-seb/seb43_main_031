import styled from "styled-components";
import LoadingSpinner from "../img/Loading_spinner.gif";

const StyledBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
`;

const LoadingText = styled.div`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 3rem;
  color: var(--font-color-light);
`;

// 로딩화면
function Loading() {
  return (
    <StyledBg>
      <LoadingText>로딩중입니다. 잠시만 기다려주세요😃</LoadingText>
      <img src={LoadingSpinner} alt="Loading" />
    </StyledBg>
  );
}

export default Loading;
