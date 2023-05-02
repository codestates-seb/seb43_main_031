import { useState } from "react";
import { login } from "../api/api";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onClickLoginButton() {
    login(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="button" onClick={onClickLoginButton}>
          로그인
        </button>
      </form>
    </div>
  );
}
