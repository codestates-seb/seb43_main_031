import { fileAxios } from "./core/instance";

export const postImage = async formData => {
  try {
    const response = await fileAxios.post("/images", formData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
