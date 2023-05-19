import { createSlice } from "@reduxjs/toolkit";

const applySlice = createSlice({
  name: "apply",
  initialState: [],
  reducers: {
    addApply(state, action) {
      return [...state, { ...action.payload }];
    },
    deleteApply(state, action) {
      return state.filter(item => item.applyId !== action.payload);
    },
    setApply(state, action) {
      return action.payload;
    },
    filterApplyByBoardId(state, action) {
      return action.payload.filter(apply => apply.board.boardId === action.payload.id);
    },
  },
});

export const { addApply, deleteApply, setApply, filterApplyByBoardId } = applySlice.actions;
export default applySlice.reducer;
