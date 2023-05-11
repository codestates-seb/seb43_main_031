import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";

import styled from "styled-components";

import getBoards from "../api/getBoards";
import { guList, dongList } from "../data/SeoulDistricts";
import Paging from "../components/Paging";

// main레이아웃으로 뺄 예정
const Main = styled.div`
  width: 100vw;
  height: 100%;
  padding: 3rem 0;
  background-color: var(--bg-color);
`;

const BoardContainerStyle = styled.div`
  max-width: 600px;
  height: 100vh;
  display: block;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.5rem;
`;

const BoardListWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #fff;
  border-radius: 0.5rem;

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
    :hover {
      cursor: pointer;
    }
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
    margin-bottom: 20px;
  }
  .board-info {
    flex: 1;
    cursor: pointer;
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
  const [searchText, setSearchText] = useState("");
  const [searchInputText, setSearchInputText] = useState("");
  const [selectedGu, setSelectedGu] = useState(guList[0]);
  const [selectedDong, setSelectedDong] = useState(dongList[selectedGu][0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("createdDate");
  const [boards, setBoards] = useState([]);
  // const date = new Date("");

  useEffect(() => {
    getBoards({
      page: currentPage,
      searchText,
      gu: selectedGu,
      dong: selectedDong,
      sort: sortType,
    }).then(response => {
      setBoards(response.boards);
    });
  }, [currentPage, searchText, selectedGu, selectedDong, sortType]);

  useEffect(() => {
    setSelectedDong(dongList[selectedGu][0]);
  }, [selectedGu]);

  // function sortByViews() {
  //   const sortedBoards = [...boards].sort((a, b) => b.viewCount - a.viewCount);
  //   setBoards(sortedBoards);
  // }

  // function sortByDate() {
  //   const sortedBoards = [...boards].sort((a, b) => {
  //     const dateA = new Date(a.createDate);
  //     const dateB = new Date(b.createDate);
  //     return dateB - dateA;
  //   });
  //   setBoards(sortedBoards);
  // }

  const onChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <Main>
      <BoardContainerStyle>
        <BoardListWrapperStyle>
          <div className="welcome-message">도와주세요 여러분</div>
          <div className="search-bar">
            <input
              className="input-text"
              placeholder="여기에 검색어를 입력해주세요."
              value={searchInputText}
              onChange={event => {
                setSearchInputText(event.target.value);
              }}
            />
            <div
              className="search-icon"
              onClick={() => {
                setSearchText(searchInputText);
              }}
            >
              🔍
            </div>
          </div>
          <div className="sarch-tool-area">
            <div className="locacation-search-dropdowns-area">
              <select
                className="location-search-dropdown"
                onChange={event => {
                  setSelectedGu(event.target.value);
                }}
              >
                {guList.map(gu => (
                  <option key={gu}>{gu}</option>
                ))}
              </select>
              <select
                className="location-search-dropdown"
                onChange={event => {
                  console.log(event.target.value);
                  setSelectedDong(event.target.value);
                }}
              >
                {dongList[selectedGu].map(dong => {
                  return <option key={dong}>{dong}</option>;
                })}
              </select>
            </div>
            <div className="sort-buttons-area">
              <button
                type="button"
                className="sort-button"
                onClick={() => {
                  setSortType("views");
                }}
              >
                조회순
              </button>
              <button
                type="button"
                className="sort-button"
                onClick={() => {
                  setSortType("createdDate");
                }}
              >
                최신순
              </button>
            </div>
          </div>
          <div className="write-button-area">
            <button
              type="button"
              className="write-button"
              onClick={() => {
                if (!user) {
                  alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
                  navigate("/login");
                  return;
                }
                navigate("/write");
              }}
            >
              글 작성하기
            </button>
          </div>
          <div className="board-list-area">
            <div className="board-list">
              {boards.map(({ id, title, cost, createDate, completed }) => {
                return (
                  <div className="board">
                    <div className="board-info" onClick={() => navigate(`/boards/${id}`)}>
                      <div className="board-title">{title}</div>
                      <div className="board-meta">
                        <div>{cost}</div>
                        <div>{createDate}</div>
                      </div>
                    </div>
                    <div className="completed-checkbox">
                      {completed ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pagination-area">
            <div className="pagination">
              <Paging page={currentPage} setPage={setCurrentPage} />
            </div>
          </div>
        </BoardListWrapperStyle>
      </BoardContainerStyle>
    </Main>
  );
}
