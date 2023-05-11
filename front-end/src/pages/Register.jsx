import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import kakaoLogin from "../img/kakao_login.png";

import {
  validateNickName,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validatePasswordCheck,
} from "../data/validator";

const RegisterWrapperStyle = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto 20px auto;
  max-width: 300px;
  height: 680px;
  background-color: #fff;
  border-radius: 5px;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 10px 0 20px 0;

    label {
      padding: 8px;
    }

    .nickName,
    .email,
    .password,
    .passwordCheck,
    .phoneNumber {
      font-size: 1rem;
      font-weight: bold;
    }

    input {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px;
      width: 100%;
      margin-top: 3px;
    }
    .registerButton {
      width: 90%;
      background-color: #bd181f;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 1.2rem;
      font-weight: bold;
      padding: 10px 10px;
      margin: auto;
      margin-top: 20px;
      &:hover {
        cursor: pointer;
        background-color: #ffe3d5;
        color: #bd181f;
      }
    }
    .kakaoLoginButton {
      width: 70%;
      margin: auto;
      padding: 10px;
      cursor: pointer;
    }
  }
`;
const LoginToGoStyle = styled.div`
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  .goToLogin {
    color: #bd181f;
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default function Register() {
  const navigate = useNavigate();

  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [nickNameErrorMessage, setNickNameErrorMessage] = useState("닉네임을 2자 이상 입력해주세요");
  const [emailErrorMessage, setEmailErrorMessage] = useState("이메일 형식을 확인해주세요");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("영문,숫자,특문을 조합해서 8자 이상 입력해주세요");
  const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState("비밀번호가 일치하지 않습니다");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("휴대폰 번호를 확인해주세요");

  const [isNickNameValid, setIsNickNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const handleNickName = event => {
    const nickNamevalue = event.target.value;
    setNickName(nickNamevalue);
    const { isNickNameValid, nickNameErrorMessage } = validateNickName(nickNamevalue);
    setIsNickNameValid(isNickNameValid);
    setNickNameErrorMessage(nickNameErrorMessage);
  };
  // console.log(isNickNameValid, nickNameErrorMessage);

  const handleEmail = event => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    const { isEmailValid, emailErrorMessage } = validateEmail(emailValue);
    setIsEmailValid(isEmailValid);
    setEmailErrorMessage(emailErrorMessage);
  };
  // console.log(isEmailValid, emailErrorMessage);

  const handlePassword = event => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    const { isPasswordValid, passwordErrorMessage } = validatePassword(passwordValue);
    setIsPasswordValid(isPasswordValid);
    setPasswordErrorMessage(passwordErrorMessage);
  };
  // console.log(isPasswordValid, passwordErrorMessage);

  const handlePasswordCheck = event => {
    const passwordCheckValue = event.target.value;
    setpasswordCheck(passwordCheckValue);
    const { isPasswordCheckValid = false, passwordCheckErrorMessage = "" } = validatePasswordCheck(
      password,
      passwordCheckValue
    );
    setIsPasswordCheckValid(isPasswordCheckValid);
    setPasswordCheckErrorMessage(passwordCheckErrorMessage);
  };
  // console.log(isPasswordCheckValid, passwordCheckErrorMessage);

  const handlePhoneNumber = event => {
    const phoneNumberValue = event.target.value;
    setPhoneNumber(phoneNumberValue);
    const { isPhoneNumberValid, phoneNumberErrorMessage } = validatePhoneNumber(phoneNumberValue);
    setIsPhoneNumberValid(isPhoneNumberValid);
    setPhoneNumberErrorMessage(phoneNumberErrorMessage);
  };
  // console.log(isPhoneNumberValid, phoneNumberErrorMessage);

  const handleRegister = event => {
    event.preventDefault();
    if (!isNickNameValid || !isEmailValid || !isPasswordValid || !isPasswordCheckValid || !isPhoneNumberValid) {
      alert("회원가입에 실패하였습니다. 다시 입력해주세요.");
      return;
    }
    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  };

  const handleKakaoLogin = () => {
    alert("준비중입니다.");
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <RegisterWrapperStyle>
        <h1>회원가입</h1>

        <form>
          <label htmlFor="nickName">
            <div className="nickName">닉네임</div>
            <input
              type="nickName"
              id="nickName"
              placeholder="닉네임을 입력해주세요. (2자이상)"
              value={nickName}
              onChange={handleNickName}
            />
            {isNickNameValid ? null : <div style={{ color: "red", padding: "3px" }}>{nickNameErrorMessage}</div>}
          </label>

          <label htmlFor="emal">
            <div className="email">이메일</div>
            <input type="email" id="email" placeholder="이메일을 입력해주세요." value={email} onChange={handleEmail} />
            {isEmailValid ? null : <div style={{ color: "red", padding: "3px" }}>{emailErrorMessage}</div>}
          </label>
          <label htmlFor="password">
            <div className="password">비밀번호</div>
            <input
              type="password"
              id="password"
              placeholder="영문,숫자,특문 조합 8자 이상 입력해주세요."
              value={password}
              onChange={handlePassword}
            />
            {isPasswordValid ? null : <div style={{ color: "red", padding: "3px" }}>{passwordErrorMessage}</div>}
          </label>

          <label htmlFor="passwordCheck">
            <div className="passwordCheck">비밀번호 확인</div>
            <input
              type="password"
              id="passwordCheck"
              placeholder="비밀번호를 확인해주세요."
              value={passwordCheck}
              onChange={handlePasswordCheck}
            />
            {isPasswordCheckValid ? null : (
              <div style={{ color: "red", padding: "3px" }}>{passwordCheckErrorMessage}</div>
            )}
          </label>

          <label htmlFor="phoneNumber">
            <div className="phoneNumber">휴대폰 번호</div>
            <input
              type="phoneNumber"
              id="phoneNumber"
              placeholder="전화번호를 입력하세요. (01012345678)"
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
            {isPhoneNumberValid ? null : <div style={{ color: "red", padding: "3px" }}>{phoneNumberErrorMessage}</div>}
          </label>

          <button className="registerButton" type="button" onClick={handleRegister}>
            가입하기
          </button>
        </form>
        <img className="kakaoLoginButton" src={kakaoLogin} alt="logo" onClick={handleKakaoLogin} />
      </RegisterWrapperStyle>
      <LoginToGoStyle>
        <div>이미 계정이 있으신가요?</div>
        <div className="goToLogin" onClick={() => navigate("/login")}>
          로그인 하러가기
        </div>
      </LoginToGoStyle>
    </div>
  );
}
