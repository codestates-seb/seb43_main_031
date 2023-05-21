import styled from "styled-components";

const FooterStyle = styled.footer`
  position: relative;
  bottom: 0;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  background-color: #120003;
  color: #fff;
  padding: 10px;
  position: relative;
  height: 160px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  a {
    margin-top: 1rem;
    &:hover {
      color: var(--sub-color);
    }
  }
`;

const CopyrightText = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const ContributorText = styled.p`
  font-size: 12px;
  margin: 0;
  padding: 1px;
`;

export default function Footer() {
  return (
    <FooterStyle>
      <ContentWrapper>
        <CopyrightText>ⓒ Copyright 2023 빨간망토</CopyrightText>
        <ContributorText>Front: 강수암 오다경 최예슬</ContributorText>
        <ContributorText>Back: 남지훈 백철현 전지영</ContributorText>
        <a href="https://github.com/codestates-seb/seb43_main_031" target="_blank" rel="noreferrer">
          github repository 바로가기
        </a>
      </ContentWrapper>
    </FooterStyle>
  );
}
