import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import styled from "styled-components";
import { setToken, setUserInfo } from "../redux/features/userSlice";

import kakaoLogin from "../img/kakao_login.png";

const Main = styled.div`
  width: 100vw;
  min-height: calc(100vh - 53px);
  padding: 3rem 0;
  background-color: var(--bg-color);
`;

const LoginWrapperStyle = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px auto 20px auto;
  max-width: 300px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px 0 20px 0;

    label {
      padding: 10px;
    }

    .email,
    .password {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px;
      width: 100%;
    }
  }

  .loginButton {
    width: 90%;
    background-color: #bd181f;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px 10px;
    margin: 20px auto 0;
    cursor: pointer;
    &:hover {
      cursor: pointer;
      background-color: #ffe3d5;
      color: #bd181f;
    }
  }

  .kakaoLoginButton {
    width: 90%;
    background-color: var(--kakao-btn-color);
    color: var(--kakao-font-color);
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
    padding: 10px 10px;
    cursor: pointer;
    &:hover {
      cursor: pointer;
      background-color: rgb(221, 199, 5);
    }
  }
`;

const RegisterStyle = styled.div`
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  .goToRegister {
    color: #bd181f;
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickLoginButton = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/members/login`, {
        email,
        password,
      });

      const token = response.headers.authorization;
      const userInfo = response.data;

      dispatch(setToken(token));
      dispatch(setUserInfo(userInfo));
      navigate("/");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 403) {
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else if (status === 500) {
        alert("서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const handleKakaoLogin = () => {
    alert("준비중입니다.");
  };

  return (
    <Main>
      <LoginWrapperStyle>
        <h1>로그인</h1>
        <form>
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
          <br />
          <label htmlFor="password">
            <div className="password">비밀번호</div>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
            />
          </label>

          <br />
          <button className="loginButton" type="button" onClick={onClickLoginButton}>
            로그인
          </button>
        </form>
        <button type="button" className="kakaoLoginButton" onClick={handleKakaoLogin}>
          카카오 로그인
        </button>
      </LoginWrapperStyle>
      <RegisterStyle>
        <div>혹시 회원이 아니신가요?</div>
        <div className="goToRegister" onClick={() => navigate("/register")}>
          회원가입 하러가기
        </div>
      </RegisterStyle>
    </Main>
  );
}
