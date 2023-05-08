import React from "react";
import styled from "styled-components";
import redHoodImg from "../img/red-hood.png";

const HeaderWrapperStyle = styled.div`
  width: 100vw;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  line-height: 50px;
  max-width: 720px;
  margin: auto;
`;

const HeaderLogoStyle = styled.div`
  display: flex;
  min-width: 125px;
  height: 100%;
  display: flex;
  font-size: 1.3rem;
  font-weight: 700;
`;

const HeaderMenuStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-right: 8px;
`;

const HeaderMenuItemStyle = styled.div`
  :hover {
    cursor: pointer;
    color: var(--primary-color);
  }
`;

export default function Header({ user, setUser }) {
  return (
    <HeaderWrapperStyle>
      <HeaderStyle>
        <HeaderLogoStyle>
          <img src={redHoodImg} alt="logo" />
          <div>빨간망토</div>
        </HeaderLogoStyle>
        <HeaderMenuStyle>
          <HeaderMenuItemStyle>
            <a href="/write">글 작성하기</a>
          </HeaderMenuItemStyle>
          <HeaderMenuItemStyle>
            <a href="/my-page">마이페이지</a>
          </HeaderMenuItemStyle>
          {user ? (
            <HeaderMenuItemStyle
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
            </HeaderMenuItemStyle>
          ) : (
            <HeaderMenuItemStyle
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              로그인
            </HeaderMenuItemStyle>
          )}
        </HeaderMenuStyle>
      </HeaderStyle>
    </HeaderWrapperStyle>
  );
}
