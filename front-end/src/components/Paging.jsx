import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import { useState } from "react";
import styled from "styled-components";

const PagingWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  .pagination {
    display: flex;
    margin: 0;
  }

  .pagination li {
    margin: 0 5px;
    padding: 0;
  }

  .pagination li a {
    display: block;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-decoration: none;
    color: #333;
    font-size: 14px;
    transition: all 0.3s ease-in-out;
  }

  .pagination li.active a {
    background-color: #3498db;
    color: #fff;
  }

  .pagination li a:hover {
    background-color: #f0f0f0;
    border-color: #999;
  }

  .pagination li.disabled a {
    color: #999;
  }
`;
function Paging() {
  const [page, setPage] = useState(1);

  const handlePageChange = pageNumber => {
    setPage(pageNumber);
  };

  return (
    <PagingWrapperStyle>
      <Pagination
        innerClass="pagination"
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={500}
        pageRangeDisplayed={5}
        prevPageText="<"
        nextPageText=">"
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </PagingWrapperStyle>
  );
}

export default Paging;
