import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Footer from "../layouts/Footer";

const SharedSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const SectionOne = styled(SharedSection)`
  background-color: #fae7e7;
  opacity: 0;
  transition: all 3s;
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
        <p>우리동네 심부름은</p>
        <p>빨간망토에서</p>
      </SectionOne>
      <SectionTwo ref={sectionTwoRef}>
        <h1>Section 2</h1>
      </SectionTwo>
      <SectionThree>
        <h1>Section 3</h1>
      </SectionThree>
      <SectionFour>
        <h1>Section 4</h1>
      </SectionFour>
      <Footer />
    </>
  );
}
