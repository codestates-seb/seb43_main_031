import styled from "styled-components";

const FooterStyle = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  background-color: #120003;
  color: white;
  padding: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
        <CopyrightText>ⓒ Copyright ⓒ 2023 빨간망토</CopyrightText>
        <ContributorText>Front: 강수암 오다경 최예슬</ContributorText>
        <ContributorText>Back: 남지훈 백철현 전지영</ContributorText>
      </ContentWrapper>
    </FooterStyle>
  );
}
