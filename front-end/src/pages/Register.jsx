import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import kakaoLogin from "../img/kakao_login.png";

const RegisterWrapperStyle = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto 20px auto;
  max-width: 300px;
  height: 580px;
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
      padding: 10px;
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
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      <RegisterWrapperStyle>
        <h1>회원가입</h1>
        <form>
          <label htmlFor="nickName">
            <div className="nickName">닉네임</div>
            <input type="nickName" id="nickName" placeholder="닉네임을 입력해주세요." value={nickName} />
          </label>
          <label htmlFor="emal">
            <div className="email">이메일</div>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div className="password">비밀번호</div>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <label htmlFor="passwordCheck">
            <div className="passwordCheck">비밀번호 확인</div>
            <input
              type="passwordCheck"
              id="passwordCheck"
              placeholder="비밀번호를 확인해주세요."
              value={passwordCheck}
            />
          </label>
          <label htmlFor="phoneNumber">
            <div className="phoneNumber">휴대폰 번호</div>
            <input type="phoneNumber" id="phoneNumber" placeholder="비밀번호를 입력하세요." value={phoneNumber} />
          </label>
          <button className="registerButton" type="button">
            가입하기
          </button>
        </form>
        <img
          className="kakaoLoginButton"
          src={kakaoLogin}
          alt="logo"
          onClick={() => {
            navigate("/kakao-login");
          }}
        />
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
