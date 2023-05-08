import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../api/login";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onClickLoginButton() {
    login(email, password)
      .then(response => {
        setUser(response);
        navigate("/boards");
      })
      .catch(error => {
        alert(error);
      });
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label htmlFor="email">
          Email
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
          Password
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
        <button type="button" onClick={onClickLoginButton}>
          로그인
        </button>
      </form>
    </div>
  );
}
