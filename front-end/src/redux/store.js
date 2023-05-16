import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/boardSlice";
import commentReducer from "./features/commentSlice";
import applyReducer from "./features/applySlice";
import userReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    comment: commentReducer,
    apply: applyReducer,
    user: userReducer,
  },
});
export default store;
