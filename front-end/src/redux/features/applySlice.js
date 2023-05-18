import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    applyId: 1,
    applyStatus: "APLLY_ACCEPT",
    createdDate: "2023-05-10T17:51:43.126345",
    updateDate: "2023-05-10T17:51:43.126345",
    member: {
      memberId: 1,
    },
    board: {
      boardId: 1,
      member: {
        memberId: 1,
      },
    },
  },
  {
    applyId: 2,
    applyStatus: "APPLY_REQUEST",
    createdDate: "2023-05-10T17:51:46.958235",
    updateDate: "2023-05-10T17:51:46.958235",
    member: {
      memberId: 2,
    },
    board: {
      boardId: 1,
      member: {
        memberId: 1,
      },
    },
  },
];

const applySlice = createSlice({
  name: "apply",
  initialState,
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
