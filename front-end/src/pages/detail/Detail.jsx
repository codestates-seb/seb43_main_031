import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AiFillHeart, AiFillClockCircle } from "react-icons/ai";
import { BsFillCaretRightFill } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { BiWon, BiMap, BiDumbbell } from "react-icons/bi";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import RedShoesImg from "../../img/shoes.png";
import DetailSubSection from "./DetailSubSection";
import dummyData from "../../db.json";

// 나중에 layouts로 이동 예정
const Main = styled.div`
  width: 100vw;
`;

// 상세페이지 래퍼
const DetailWrapper = styled.div`
  max-width: 600px;
  display: block;
  margin: 3rem auto 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
`;

// 본문 내용 섹션
const DetailContentsSection = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// 본문 헤더 박스
const ContentsSectionHeader = styled.div`
  border-bottom: 2px solid var(--bg-color);

  .header-title {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    h2 {
      font-weight: 700;
      font-size: 1.5rem;
      flex: 1 0 0;
    }
  }

  .sub-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 3rem 1rem 1rem;
    .author-util {
      span {
        margin-right: 1rem;
      }
    }
    .interest {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
`;

// 본문 바디 박스
const ContentsSectionBody = styled.div`
  /* height: 100%; */
  border-bottom: 2px solid var(--bg-color);
`;

// 태그와 수정삭제 컨트롤러 부분
const BodyUtils = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  .tags {
    display: flex;
    div {
      margin-right: 1rem;
      padding: 0.4rem 1rem;
      color: var(--primary-color);
      background-color: #ffd3d5;
      border-radius: 4rem;
    }
  }

  .utils {
    display: flex;

    button {
      flex: 2 0 0;
      color: var(--sub-btn-color);
      font-size: 0.8rem;
      background-color: transparent; // 투명하게
      border: none;
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

// 메인 내용 부분
const BodyMain = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  margin-top: 1rem;
  .main-title {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.3rem;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .main-msg,
  .main-cost,
  .main-expire,
  .main-location {
    margin-bottom: 2em;
  }
`;

// 달린 답변 갯수 헤더
const SubHeaderWrapper = styled.div`
  display: flex;
  align-items: end;
  padding: 1rem 2rem;

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

// 새로운 글 작성 박스
const DetailSubForm = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  input {
    width: 100%;
    height: 3rem;
    border: none;
    border-radius: 0.4rem;
    background-color: var(--bg-color);
  }
  button {
    width: 20%;
    align-self: end;
    padding: 0.7rem;
    background-color: var(--primary-color);
    border: none;
    border-radius: 1.5rem;
    color: #fff;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
      background-color: var(--sub-btn-color);
    }
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

function Detail() {
  const [isLogin, setIslogin] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(dummyData);
  const [inputValue, setInputValue] = useState("");

  // 렌더링 시 데이터 패칭
  // useEffect(() => {
  //   window.scrollTo(0, 0); // 페이지 맨 위로
  //   async () => {
  //     try {
  //       const { data } = await axios(`http://localhost:8080/boards/{boardId}`, {
  //         headers: {
  //           Authorization: localStorage.getItem("token"), // 토큰 보내기
  //         },
  //       });
  //     } catch (err) {
  //       alert("해당 게시글을 불러오지 못했습니다.");
  //     }
  //   };
  // }, []);

  return (
    <>
      {isPending && <div>로딩중입니다.</div>}
      {isLogin && (
        <Main>
          <DetailWrapper>
            <DetailContentsSection>
              <ContentsSectionHeader>
                <div className="header-title">
                  <div>
                    <img src={RedShoesImg} alt="title-logo" style={{ width: "40px", height: "40px" }} />
                  </div>
                  <h2>강아지 산책 해주실 분 구합니다!</h2>
                </div>
                <div className="sub-header">
                  <div className="author-util">
                    <span style={{ fontWeight: "700" }}>작성자</span>
                    <span style={{ fontSize: "0.8rem" }}>작성일자</span>
                  </div>
                  <div className="interest">
                    <AiFillHeart style={{ width: "20px", height: "20px", color: "var(--primary-color)" }} />
                    <div>0</div>
                  </div>
                </div>
              </ContentsSectionHeader>
              <ContentsSectionBody>
                <BodyUtils>
                  <div className="tags">
                    <div>지역구</div>
                    <div>지역동</div>
                  </div>
                  <div className="utils">
                    <button type="button">수정</button>
                    <button type="button">삭제</button>
                  </div>
                </BodyUtils>
                <BodyMain>
                  <section className="main-msg">
                    <div className="main-title">
                      <CgFileDocument />
                      <p>상세내용</p>
                    </div>
                    <Viewer initialValue="여기에 메세지가 보여질껍니다" />
                  </section>
                  <section className="main-cost">
                    <div className="main-title">
                      <BiWon />
                      <p>수고비</p>
                    </div>
                    <p>시급 10000원</p>
                  </section>
                  <section className="main-expire">
                    <div className="main-title">
                      <AiFillClockCircle />
                      <p>만료일</p>
                    </div>
                    <p>23년 05월 22일</p>
                  </section>
                  <seciton className="main-location">
                    <div className="main-title">
                      <BiMap />
                      <p>상세주소</p>
                    </div>
                    <p>역삼동 223-2</p>
                  </seciton>
                </BodyMain>
              </ContentsSectionBody>
            </DetailContentsSection>
            <DetailSubHeader count={3} title="개의 문의" />
            {data &&
              data.comments.map((comment, index) => {
                return (
                  <DetailSubSection
                    key={index}
                    type="comments"
                    el={comment}
                    userId={comment.memberId}
                    commentId={comment.commentId}
                    boardId={comment.boardId}
                    createdDate={comment.createdDate}
                    content={comment.content}
                  />
                );
              })}
            <DetailSubForm>
              <h2>문의합니다</h2>
              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
              <button type="button">문의하기</button>
            </DetailSubForm>
            <DetailSubHeader count={3} title="개의 신청" />
            {data &&
              data.applys.map((apply, index) => {
                return (
                  <DetailSubSection
                    key={index}
                    type="applys"
                    el={apply}
                    userId={apply.memberId}
                    applyId={apply.applyId}
                    boardId={apply.boardId}
                    createdDate={apply.createdDate}
                    updatedDate={apply.updatedDate}
                    content={apply.content}
                  />
                );
              })}
            <DetailSubForm>
              <h2>신청합니다</h2>
              <input type="text" />
              <button type="button">신청하기</button>
            </DetailSubForm>
          </DetailWrapper>
        </Main>
      )}
    </>
  );
}

export default Detail;
