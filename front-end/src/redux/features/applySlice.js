import { createSlice } from "@reduxjs/toolkit";

const applySlice = createSlice({
  name: "apply",
  initialState: {
    applies: [],
    isApplied: false,
  },
  reducers: {
    addApply(state, action) {
      return {
        ...state,
        applies: [...state.applies, action.payload],
      };
    },
    deleteApply(state, action) {
      return {
        ...state,
        applies: state.applies.filter(item => item.applyId !== action.payload),
      };
    },
    setApply(state, action) {
      return {
        ...state,
        applies: action.payload,
      };
    },
    setIsApplied(state, action) {
      return {
        ...state,
        isApplied: action.payload,
      };
    },
  },
});

export const { addApply, deleteApply, setApply, setIsApplied } = applySlice.actions;
export default applySlice.reducer;
