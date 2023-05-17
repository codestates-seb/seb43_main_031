// 프록시 설정이 되어있을 땐 baseURL을 주석처리 해야 합니다.
// 실제 배포시 사용될 것 같습니다.

import axios from "axios";

// 인증이 필요없는 경우
export const instance = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: { "Content-Type": "application/json" },
});

export default instance;

// form-data의 경우
export const fileAxios = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// 인증이 필요한 경우
const token = "토큰 값";
export const authAxios = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
