import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || [],
    userInfo: null,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken(state, action) {
      state.token = action.payload;
      localStorage.removeItem("token");
    },
  },
});
export const { setUserInfo, setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
