import React from "react";

export default function Header({ user, setUser }) {
  return (
    <header>
      <h1>빨간망토</h1>
      <nav>
        <ul>
          {user ? (
            <div
              onClick={() => {
                setUser(null);
                window.location.href = "/login";
              }}
              onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") {
                  setUser(null);
                  window.location.href = "/login";
                }
              }}
            >
              로그아웃
            </div>
          ) : (
            <div
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              로그인
            </div>
          )}
          <li>
            <a href="/register">회원가입</a>
          </li>
          <li>
            <a href="/board">게시판</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
