import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: [],
  reducers: {
    editBoard(state, action) {
      const ind = state.findIndex(a => a.id === action.payload.id);

      return [...state.slice(0, ind), action.payload, ...state.slice(ind + 1)];
    },
    deleteBoard(state, action) {
      return state.filter(a => a.id !== action.payload.id);
    },
    setBoard(state, action) {
      return action.payload;
    },
  },
});

export const { editBoard, deleteBoard, setBoard } = boardSlice.actions;
export default boardSlice.reducer;
