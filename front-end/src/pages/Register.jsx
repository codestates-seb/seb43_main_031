import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import kakaoLogin from "../img/kakao_login.png";

const RegisterWrapperStyle = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px auto 20px auto;
  max-width: 300px;
  height: 600px;
  background-color: #fff;
`;

export default function Register() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      <RegisterWrapperStyle>
        <h1>회원가입</h1>
        <form>
          <label htmlFor="emal">
            <div className="nickName">닉네임</div>
            <input type="nickName" id="nickName" placeholder="닉네임을 입력해주세요." value={nickName} />
          </label>
          <br />
          <label htmlFor="emal">
            <div className="email">이메일</div>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요."
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
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div className="password">비밀번호 확인</div>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div className="password">휴대폰 번호</div>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <br />
          <button className="loginButton" type="button">
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
    </div>
  );
}
