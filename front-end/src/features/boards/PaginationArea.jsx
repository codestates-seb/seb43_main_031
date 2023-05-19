import React from "react";
import Paging from "../../components/Paging";

function PaginationArea({ currentPage, setCurrentPage, onChangePage }) {
  return (
    <div className="pagination-area">
      <div className="pagination">
        <Paging page={currentPage} setPage={setCurrentPage} onChange={onChangePage} />
      </div>
    </div>
  );
}

export default PaginationArea;
