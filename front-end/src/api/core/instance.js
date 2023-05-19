import axios from "axios";

// 인증이 필요없는 경우
export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: { "Content-Type": "application/json" },
});

export default instance;

// form-data의 경우
export const fileAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// 인증이 필요한 경우
// 토큰 => 전역으로 저장된 값을 받아오는 방법으로 수정할 예정
const token = localStorage.getItem("token");
export const authAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    Authorization: `${token}`,
  },
});
