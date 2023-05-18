import axios from "./core/instance";

export const postBoard = async board => {
  try {
    await axios.post("/boards", board);
    return "success";
  } catch (error) {
    console.log(error);
    return "fail";
  }
};
