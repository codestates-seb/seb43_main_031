import React from "react";

function WriteButtonArea({ onClickWriteBoard, onClickAllList }) {
  return (
    <div className="write-button-area">
      <button type="button" className="write-button " onClick={onClickAllList}>
        글 전체보기
      </button>
      <button type="button" className="write-button" onClick={onClickWriteBoard}>
        글 작성하기
      </button>
    </div>
  );
}

export default WriteButtonArea;
