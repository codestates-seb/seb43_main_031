import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Main({ Children }) {
  return <StyledContainer>{Children}</StyledContainer>;
}

export default Main;
