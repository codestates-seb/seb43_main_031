import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import styled from "styled-components";

const areaGu = ["강남구", "강동구"];
const areaDong = {
  강남구: ["개포동", "논현동", "대치동"],
  강동구: ["강일동", "고덕동", "길동"],
};

const BoardWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: 30px auto;

  .welcome-message {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 10px;
    text-align: center;
  }

  .search-bar {
    width: 70%;
    margin: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px;
    margin-bottom: 10px;
  }
  .input-text {
    border: none;
    outline: none;
    flex: 1;
  }
  .sarch-tool-area {
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: auto;
  }
  .location-search-dropdown {
    margin-right: 10px;
  }
  .sort-buttons-area {
    float: right;
  }
  .sort-button {
    margin-left: 10px;
  }
`;
export default function BoardPage({ user }) {
  const navigate = useNavigate();
  const [selectedGu, setSelectedGu] = useState(areaGu[0]);

  // useEffect(() => {
  //   if (!user) {
  //     alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  // if (!user) {
  //   return <div>로그인이 필요합니다.</div>;
  // }

  return (
    <BoardWrapperStyle>
      <div className="welcome-message">도와주세요 여러분</div>

      <div className="search-bar">
        <input className="input-text" placeholder="여기에 검색어를 입력해주세요." />
        <div className="search-icon">🔍</div>
      </div>
      <div className="sarch-tool-area">
        <div className="locacation-search-dropdowns-area">
          <select
            className="location-search-dropdown"
            onChange={e => {
              setSelectedGu(e.target.value);
            }}
          >
            {areaGu.map(gu => (
              <option key={gu}>{gu}</option>
            ))}
          </select>
          <select className="location-search-dropdown">
            {areaDong[selectedGu].map(dong => {
              return <option key={dong}>{dong}</option>;
            })}
          </select>
        </div>
        <div className="sort-buttons-area">
          <button type="button" className="sort-button">
            조회순
          </button>
          <button type="button" className="sort-button">
            최신순
          </button>
        </div>
      </div>
      <div className="write-button-area">
        <button type="button" className="write-button">
          글 작성하기
        </button>
      </div>
      <div className="article-list-area">
        <ul className="article-list">
          <li className="article">강아지 산책</li>
          <li className="article">바퀴 잡아줘</li>
          <li className="article">고양이 산책</li>
          <li className="article">장보기</li>
        </ul>
      </div>
      <div className="pagination-area">
        <div className="pagination"></div>
      </div>
    </BoardWrapperStyle>
  );
}
