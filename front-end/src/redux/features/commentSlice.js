import { createSlice } from "@reduxjs/toolkit";

// 로컬스토리지에서 초기상태 가져와 사용, 없으면 빈배열
const initialState = localStorage.getItem("comment") ? [...JSON.parse(localStorage.getItem("comment"))] : [];

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment(state, action) {
      const { commentId, memberId, content, boardId, responseTo, createdDate } = action.payload;
      return [...state, { ...action.payload }];
    },
    editComment(state, action) {
      const { commentId, content } = action.payload;
      return state.map(item => (item.commentId === commentId ? (item.content = content) : item));
    },
    deleteComment(state, action) {
      if (state.find(item => item.commentId === action.payload)) {
        return state.filter(item => item.commentId !== action.payload.commentId);
      }
    },
  },
});

export const { addComment, editComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
