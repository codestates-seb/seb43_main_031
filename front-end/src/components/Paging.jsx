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
    margin: 0 3px;
    padding: 0;
  }

  .pagination li a {
    padding: 10px;
    border: 1px solid #bd181f;
    border-radius: 3px;
    color: black;
    font-size: 13px;
    transition: all 0.3s ease-in-out;
  }

  .pagination li.active a {
    background-color: #ffd3d5;
    color: red;
  }

  .pagination li a:hover {
    background-color: #f0f0f0;
    border-color: #f45050;
  }

  .pagination li.disabled a {
    color: #f45050;
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
