import React from "react";
import styled from "styled-components";

import { BsFillCaretRightFill } from "react-icons/bs";

// 달린 답변 갯수 헤더
const SubHeaderWrapper = styled.div`
  display: flex;
  align-items: end;
  padding: 2rem 0;

  .arrow {
    width: 2rem;
    height: 2rem;
    color: var(--primary-color);
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;

// 서브헤더 컴포넌트
function DetailSubHeader({ count, title }) {
  return (
    <SubHeaderWrapper>
      <BsFillCaretRightFill className="arrow" />
      <h2>{count > 0 && `${count} ${title}`}</h2>
    </SubHeaderWrapper>
  );
}

export default DetailSubHeader;
