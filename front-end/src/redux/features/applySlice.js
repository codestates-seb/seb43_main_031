import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    applyId: 1,
    applyStatus: "APPLY_REQUEST",
    createdDate: "2023-05-10T17:51:43.126345",
    updateDate: "2023-05-10T17:51:43.126345",
    member: {
      memberId: 1,
    },
    board: {
      boardId: 1,
      memberId: 1,
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
      memberId: 1,
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
  },
});

export const { addApply, deleteApply, setApply } = applySlice.actions;
export default applySlice.reducer;
