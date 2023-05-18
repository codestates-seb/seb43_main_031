import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import getBoards from "../api/getBoards";
import { guList, dongList } from "../data/SeoulDistricts";

import WelcomeMessage from "../features/boards/WelcomeMessage";
import BoardListArea from "../features/boards/BoardListArea";
import PaginationArea from "../features/boards/PaginationArea";
import SearchToolArea from "../features/boards/SearchToolArea";
import SearchBar from "../features/boards/SearchBar";
import WriteButtonArea from "../features/boards/WriteButtonArea";

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
  const currentUser = useSelector(state => state.user);

  const [searchText, setSearchText] = useState("");
  const [searchInputText, setSearchInputText] = useState("");
  const [selectedGu, setSelectedGu] = useState("지역구");
  const [selectedDong, setSelectedDong] = useState("지역동");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortTypeCreateDate, setSortTypeCreateDate] = useState("");
  const [sortTypeViewCount, setSortTypeViewCount] = useState("");
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards({
      currentPage,
      searchText,
      selectedGu,
      selectedDong,
      sortTypeCreateDate,
      sortTypeViewCount,
    }).then(response => {
      setBoards(response.content);
    });
  }, [currentPage, searchText, sortTypeCreateDate, sortTypeViewCount, selectedGu, selectedDong]);

  useEffect(() => {
    if (selectedGu === "지역구") return;
    setSelectedDong(dongList[selectedGu][0]);
  }, [selectedGu]);

  const onChangePage = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const onSearchTextChange = event => {
    setSearchInputText(event.target.value);
  };

  const onSearchButtonClick = () => {
    setSearchText(searchInputText);
  };

  const onSelectedGu = event => {
    setSelectedGu(event.target.value);
  };

  const onSelectedDong = event => {
    setSelectedDong(event.target.value);
  };

  const onClickSortCreateDate = () => {
    setSortTypeCreateDate("createDate");
  };

  const onClickSortViewCount = () => {
    setSortTypeViewCount("viewCount");
  };

  const onClickWriteBoard = () => {
    if (!currentUser) {
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
      return;
    }
    navigate("/write");
  };

  return (
    <Main>
      <BoardContainerStyle>
        <BoardListWrapperStyle>
          <WelcomeMessage />
          <SearchBar onChange={onSearchTextChange} onClick={onSearchButtonClick} searchInputText={searchInputText} />
          <SearchToolArea
            onSelectedGu={onSelectedGu}
            onSelectedDong={onSelectedDong}
            selectedGu={selectedGu}
            selectedDong={selectedDong}
            onClickSortCreateDate={onClickSortCreateDate}
            onClickSortViewCount={onClickSortViewCount}
          />
          <WriteButtonArea onClickWriteBoard={onClickWriteBoard} />
          <BoardListArea boards={boards} />
          <PaginationArea onChangePage={onChangePage} />
        </BoardListWrapperStyle>
      </BoardContainerStyle>
    </Main>
  );
}
