import { createSlice } from "@reduxjs/toolkit";

export const replySlice = createSlice({
  name: "reply",
  initialState: [],
  reducers: {
    addReply(state, action) {
      return [...state, action.payload];
    },
    editReply(state, action) {
      const { commentId, content } = action.payload;
      return state.map(item => (item.commentId === commentId ? { ...item, content } : item));
    },
    deleteReply(state, action) {
      return state.filter(item => item.commentId !== action.payload);
    },
    setReply(state, action) {
      return action.payload;
    },
  },
});

export const { addReply, editReply, deleteReply, setReply } = replySlice.actions;
export default replySlice.reducer;
