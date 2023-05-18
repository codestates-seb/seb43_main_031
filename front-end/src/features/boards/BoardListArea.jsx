import React from "react";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function BoardListArea({ boards }) {
  const navigate = useNavigate();

  return (
    <div className="board-list-area">
      <div className="board-list">
        {boards.length === 0 && <div style={{ textAlign: "center" }}>등록된 게시글이 없습니다.</div>}
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
              <div className="completed-checkbox">{completed ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BoardListArea;
