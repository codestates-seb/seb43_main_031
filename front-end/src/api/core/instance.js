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
export const authAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

// 요청 전 헤더에 토큰을 추가하는 인터셉터 추가
authAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
