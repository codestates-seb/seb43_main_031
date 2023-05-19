import React from "react";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function BoardListArea({ boards }) {
  const navigate = useNavigate();
  const date = new Date();

  return (
    <div className="board-list-area">
      <div className="board-list">
        {boards.length === 0 && <div style={{ textAlign: "center" }}>등록된 게시글이 없습니다.</div>}
        {boards.map(({ boardId, title, cost, createdDate, completed, viewCount }) => {
          const formattedDate = new Date(createdDate).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <div className="board">
              <div className="board-info" onClick={() => navigate(`/boards/${boardId}`)}>
                <div className="board-title">{title}</div>
                <div className="board-meta">
                  <div>{cost}원</div>
                  <div>{formattedDate}</div>
                  <div>조회수 {viewCount}</div>
                </div>
              </div>
              <div className="completed-checkbox">{completed ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BoardListArea;
