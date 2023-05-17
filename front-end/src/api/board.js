import axios from "./core/instance";

// try-catch문이 지저분해 보여 잘 안 쓰려고 하는 경향이 있다. -> 그럼 어떻게??
export const postBoard = async board => {
  try {
    await axios.post("/boards", board);
    return "success";
  } catch (error) {
    console.log(error);
    return "fail";
  }
};
