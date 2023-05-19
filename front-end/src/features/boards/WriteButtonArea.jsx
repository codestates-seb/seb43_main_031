import React from "react";

function WriteButtonArea({ onClickWriteBoard }) {
  return (
    <div className="write-button-area">
      <button type="button" className="write-button" onClick={onClickWriteBoard}>
        글 작성하기
      </button>
    </div>
  );
}

export default WriteButtonArea;
