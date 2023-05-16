import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Footer from "../layouts/Footer";

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
  font-size: 24px;
  background-color: ${props => props.backgroundColor};
`;

export default function Landing() {
  const [backgroundColor, setBackgroundColor] = useState("#FAE7E7");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      if (scrollTop > windowHeight / 2) {
        setBackgroundColor("#DB8787");
      } else {
        setBackgroundColor("#FAE7E7");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <StyledSection backgroundColor={backgroundColor}>
        <h1>Landing Page</h1>
      </StyledSection>
      <StyledSection id="section2" backgroundColor="#DB8787">
        <h1>Section 2</h1>
      </StyledSection>
      <Footer />
    </>
  );
}
