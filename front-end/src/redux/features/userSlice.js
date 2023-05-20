import { createSlice } from "@reduxjs/toolkit";

// 받아온 토큰을 Bearer로 보내서 올바른 토큰을 보내지 못했다. 이부분은 체크해서 기록하자
const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || [],
    userInfo: {},
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
      state.userInfo = action.payload;
      localStorage.removeItem("token");
    },
  },
});
export const { setUserInfo, setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
