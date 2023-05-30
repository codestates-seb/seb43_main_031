import { authAxios } from "./core/instance";

export const patchMember = async (memberId, member) => {
  try {
    const response = await authAxios.patch(`/members/${memberId}`, member);
    return response;
  } catch (error) {
    console.log(error);
    return "fail";
  }
};

export const deleteMember = async memberId => {
  try {
    await authAxios.delete(`/members/${memberId}`);
    return "success";
  } catch (error) {
    console.log(error);
    return "fail";
  }
};
