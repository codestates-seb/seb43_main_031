export const validateNickName = userInputNickName => {
  if (userInputNickName.length >= 2 && userInputNickName.length <= 8) {
    return { isNickNameValid: true, nickNameErrorMessage: "" };
  }
  return { isNickNameValid: false, nickNameErrorMessage: "닉네임을 2자 이상 8자 이하로 입력해주세요" };
};

export const validateEmail = userInputEmail => {
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  if (emailRegex.test(userInputEmail)) {
    return { isEmailValid: true, nickNameEemailErrorMessagerrorMessage: "" };
  }
  return { isEmailValid: false, emailErrorMessage: "이메일 형식을 확인해주세요" };
};

export const validatePassword = userInputPassword => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])(?=\S+$).{8,16}$/;
  if (passwordRegex.test(userInputPassword)) {
    return { isPasswordValid: true, passwordErrorMessage: "" };
  }
  return { isPasswordValid: false, passwordErrorMessage: "영문,숫자,특문을 조합해서 8자 이상 입력해주세요" };
};

export const validatePasswordCheck = (userInputPassword, userInputPasswordCheck) => {
  const password = userInputPassword.trim();
  const passwordCheck = userInputPasswordCheck.trim();

  if (password === passwordCheck) {
    return { isPasswordCheckValid: true, passwordCheckErrorMessage: "" };
  }
  return { isPasswordCheckValid: false, passwordCheckErrorMessage: "비밀번호가 일치하지 않습니다" };
};

export const validatePhoneNumber = userInputPhoneNumber => {
  const phoneNumberRegex = /^(010|011|019)\d{3,4}\d{4}$/;
  if (phoneNumberRegex.test(userInputPhoneNumber)) {
    return { isPhoneNumberValid: true, phoneNumberErrorMessage: "" };
  }
  return { isPhoneNumberValid: false, phoneNumberErrorMessage: "휴대폰 번호를 확인해주세요" };
};
