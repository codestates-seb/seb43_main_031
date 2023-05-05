import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import styled from "styled-components";
import getBoards from "../api/getBoards";

const areaGu = ["강남구", "강동구"];
const areaDong = {
  강남구: ["개포동", "논현동", "대치동"],
  강동구: ["강일동", "고덕동", "길동"],
};

const BoardListWrapperStyle = styled.div`
  /* * {
    border: 1px solid #ddd;
  } */

  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: 30px auto;
  padding: 0 20px;

  .welcome-message {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
  }

  .search-bar {
    width: 100%;
    margin: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px;
    margin-bottom: 20px;
  }

  .input-text {
    border: none;
    outline: none;
    flex: 1;
  }

  .sarch-tool-area {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto 20px auto;
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

  .write-button-area {
    margin-bottom: 20px;
  }

  .write-button {
    float: right;
  }
  .board {
    border: 1px solid blue;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .board-info {
    flex: 1;
  }
  .board-title {
    font-size: 1.2rem;
    line-height: 1.5rem;
    margin-bottom: 10px;
  }
  .board-meta {
    display: flex;
    gap: 20px;
  }
  .completed-checkbox {
    float: right;
    width: 40px;
    margin-left: 20px;
    font-size: 2rem;
  }
`;
export default function BoardList({ user }) {
  const navigate = useNavigate();
  const [selectedGu, setSelectedGu] = useState(areaGu[0]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards().then(response => {
      console.log(response.data);
      setBoards(response.data);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <BoardListWrapperStyle>
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
      <div className="board-list-area">
        <div className="board-list">
          {boards.map(board => {
            return (
              <div className="board">
                <div className="board-info">
                  <div className="board-title">{board.title}</div>
                  <div className="board-meta">
                    <div>{board.cost}</div>
                    <div>{board.createDate}</div>
                  </div>
                </div>
                <div className="completed-checkbox">
                  {board.completed ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pagination-area">
        <div className="pagination"></div>
      </div>
    </BoardListWrapperStyle>
  );
}
