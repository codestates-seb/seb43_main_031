import { authAxios } from "./core/instance";

export const postBoard = async board => {
  try {
    await authAxios.post("/boards", board);
    return "success";
  } catch (error) {
    console.log(error);
    return "fail";
  }
};
