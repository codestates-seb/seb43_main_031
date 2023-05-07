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
    border: 1px solid #afababed;
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
    padding: 3px;
    border-radius: 5px;
    background-color: #ffd3c2;
    border: none;
    color: #bd181f;
  }

  .sort-buttons-area {
    float: right;
  }

  .sort-button {
    margin-left: 10px;
    border-radius: 5px;
    border: none;
    background-color: #ffd3c2;
    color: #bd181f;
    padding: 4px 10px;
  }

  .write-button-area {
    margin-bottom: 20px;
  }

  .write-button {
    float: right;
    border-radius: 5px;
    border: none;
    background-color: #f8f8a0;
    font-weight: bold;
    padding: 8px 16px;
    :hover {
      background-color: yellow;
      cursor: pointer;
    }
  }

  .board {
    border: none;
    border-radius: 10px;
    -webkit-box-shadow: 0px 2px 6px 1px rgba(255, 211, 194, 1);
    -moz-box-shadow: 0px 2px 6px 1px rgba(255, 211, 194, 1);
    box-shadow: 0px 2px 6px 1px rgba(255, 211, 194, 1);
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 15px;
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
    color: #bd181f;
  }
`;
export default function BoardList({ user }) {
  const navigate = useNavigate();
  const [selectedGu, setSelectedGu] = useState(areaGu[0]);
  const [boards, setBoards] = useState([]);
  const [data, setData] = useState([]);
  const date = new Date("");

  useEffect(() => {
    getBoards().then(response => {
      // console.log(response.data);
      setBoards(response.data);
      setData(response.data);
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

  function sortByViews() {
    const sortedBoards = [...boards].sort((a, b) => b.viewCount - a.viewCount);
    setBoards(sortedBoards);
  }

  function sortByDate() {
    const sortedBoards = [...boards].sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      return dateB - dateA;
    });
    setBoards(sortedBoards);
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
          <button type="button" className="sort-button" onClick={sortByViews}>
            조회순
          </button>
          <button type="button" className="sort-button" onClick={sortByDate}>
            최신순
          </button>
        </div>
      </div>
      <div className="write-button-area">
        <button type="button" className="write-button" onClick={() => navigate("/write")}>
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
