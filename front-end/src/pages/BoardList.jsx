import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import getBoards from "../api/getBoards";
import { dongList } from "../data/SeoulDistricts";

import Paging from "../components/Paging";
import Loading from "./Loading";
import WelcomeMessage from "../features/boards/WelcomeMessage";
import BoardListArea from "../features/boards/BoardListArea";
import SearchToolArea from "../features/boards/SearchToolArea";
import SearchBar from "../features/boards/SearchBar";
import WriteButtonArea from "../features/boards/WriteButtonArea";
import { setBoard } from "../redux/features/boardSlice";

const Main = styled.div`
  background-color: var(--bg-color);
  padding: 30px;
  min-height: calc(100vh - 53px);
`;

const BoardContainerStyle = styled.div`
  max-width: 600px;
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
  padding: 0 14px;
  background-color: #fff;
  border-radius: 0.5rem;

  .welcome-message {
    font-size: 2.5rem;
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

    .search-icon {
      margin: 0 8px;
      font-size: large;
      :hover {
        cursor: pointer;
      }
    }
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
    margin: 0 0 20px;
  }

  .location-search-dropdown {
    width: 80px;
    margin-right: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #ffd3c2;
    border: none;
    color: #bd181f;
    :hover {
      cursor: pointer;
      background-color: #ffc3c2;
      color: red;
    }
  }

  .sort-buttons-area {
    float: right;
  }

  .sort-button {
    width: 80px;
    margin-left: 10px;
    border-radius: 5px;
    border: none;
    background-color: #ffd3c2;
    color: #bd181f;
    padding: 6px 10px;
    :hover {
      cursor: pointer;
      background-color: #ffc3c2;
      color: red;
    }
  }

  .write-button-area {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .write-button {
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
    .viewCount,
    .createdData {
      font-size: 1rem;
    }
  }
  .completed-checkbox {
    float: right;
    width: 40px;
    margin-left: 20px;
    font-size: 2rem;
    color: #bd181f;
  }

  @media (max-width: 450px) {
    .welcome-message {
      font-size: 2rem;
    }
    .location-search-dropdown {
      width: 60px;
      padding: 3px;
    }
    .sort-button {
      width: 55px;
      padding: 4px;
    }
    .viewCount,
    .createdDate {
      display: none;
    }
  }
`;
export default function BoardList() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchInputText, setSearchInputText] = useState("");
  const [selectedGu, setSelectedGu] = useState("지역구");
  const [selectedDong, setSelectedDong] = useState("지역동");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("createdDate"); // ["viewCount", "createDate"]
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.userInfo);
  const boards = useSelector(state => state.board);

  useEffect(() => {
    setIsLoading(true);
    getBoards({
      currentPage,
      searchText,
      selectedGu,
      selectedDong,
      sortType,
    }).then(response => {
      setTotalItemsCount(response.totalElements);
      setItemsCountPerPage(response.size);
      dispatch(setBoard(response.content));
      setIsLoading(false);
    });
  }, [currentPage, searchText, sortType, selectedGu, selectedDong]);

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
    console.log("clicked");
    setSearchText(searchInputText);
    setCurrentPage(1);
  };

  const onSelectedGu = event => {
    setSelectedGu(event.target.value);
    setCurrentPage(1);
  };

  const onSelectedDong = event => {
    setSelectedDong(event.target.value);
    setCurrentPage(1);
  };

  const onClickSortCreateDate = () => {
    setSortType("createDate");
    setCurrentPage(1);
  };

  const onClickSortViewCount = () => {
    setSortType("viewCount");
    setCurrentPage(1);
  };

  const onClickAllList = () => {
    setSelectedGu("지역구");
    setSelectedDong("지역동");
    setSearchText("");
  };

  const onClickWriteBoard = () => {
    if (!currentUser) {
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
      return;
    }
    navigate("/write");
  };

  if (isLoading) return <Loading />;
  return (
    <Main>
      <BoardContainerStyle>
        <BoardListWrapperStyle>
          <WelcomeMessage />
          <SearchBar
            onChange={onSearchTextChange}
            onSearchButtonClick={onSearchButtonClick}
            searchInputText={searchInputText}
          />
          <SearchToolArea
            onSelectedGu={onSelectedGu}
            onSelectedDong={onSelectedDong}
            selectedGu={selectedGu}
            selectedDong={selectedDong}
            onClickSortCreateDate={onClickSortCreateDate}
            onClickSortViewCount={onClickSortViewCount}
          />
          <WriteButtonArea onClickWriteBoard={onClickWriteBoard} onClickAllList={onClickAllList} />
          <BoardListArea boards={boards} />
          <Paging
            page={currentPage}
            onChange={onChangePage}
            totalItemsCount={totalItemsCount}
            itemsCountPerPage={itemsCountPerPage}
          />
        </BoardListWrapperStyle>
      </BoardContainerStyle>
    </Main>
  );
}
