import { createSlice } from "@reduxjs/toolkit";

// 로컬스토리지에서 초기상태 가져와 사용, 없으면 빈배열
const initialState = localStorage.getItem("comment") ? [...JSON.parse(localStorage.getItem("comment"))] : [];

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment(state, action) {
      const { commentId, content, boardId, responseTo, createdDate } = action.payload;
      return [...state, { ...action.payload }];
    },
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
