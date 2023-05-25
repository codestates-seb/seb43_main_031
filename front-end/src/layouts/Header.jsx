import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import redHoodImg from "../img/red-hood.png";
import { clearToken, setUserInfo } from "../redux/features/userSlice";

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
  @media (max-width: 500px) {
    justify-content: space-evenly;
  }
`;

const HeaderLogoStyle = styled.div`
  display: flex;
  min-width: 125px;
  height: 100%;
  display: flex;
  font-size: 1.3rem;
  font-weight: 700;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 300px) {
    display: none;
  }
`;

const HeaderHome = styled.div`
  font-weight: 600;
  :hover {
    cursor: pointer;
    color: var(--primary-color);
  }
  @media (min-width: 301px) {
    display: none;
  }
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

export default function Header() {
  const user = useSelector(state => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <HeaderWrapperStyle>
      <HeaderStyle>
        <HeaderLogoStyle>
          <img
            src={redHoodImg}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            빨간망토
          </div>
        </HeaderLogoStyle>
        <HeaderMenuStyle>
          {user ? (
            <>
              <HeaderHome
                onClick={() => {
                  navigate("/");
                }}
              >
                홈
              </HeaderHome>
              <HeaderMenuItemStyle>
                <Link to="/boards">게시판</Link>
              </HeaderMenuItemStyle>
              <HeaderMenuItemStyle>
                <Link to="/my-page">마이페이지</Link>
              </HeaderMenuItemStyle>
              <HeaderMenuItemStyle
                onClick={() => {
                  dispatch(setUserInfo(null));
                  dispatch(clearToken(null));
                  navigate("/login");
                }}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    dispatch(clearToken(null));
                    navigate("/login");
                  }
                }}
              >
                로그아웃
              </HeaderMenuItemStyle>
            </>
          ) : (
            <>
              <HeaderHome
                onClick={() => {
                  navigate("/");
                }}
              >
                홈
              </HeaderHome>
              <HeaderMenuItemStyle>
                <Link to="/boards">게시판</Link>
              </HeaderMenuItemStyle>
              <HeaderMenuItemStyle>
                <Link to="/register">회원가입</Link>
              </HeaderMenuItemStyle>
              <HeaderMenuItemStyle
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </HeaderMenuItemStyle>
            </>
          )}
        </HeaderMenuStyle>
      </HeaderStyle>
    </HeaderWrapperStyle>
  );
}
