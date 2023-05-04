import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillGithub } from "react-icons/ai";
export default function BoardPage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.user) {
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  }, []);

  if (!props.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div>
      <h1>BoardPage</h1>
      <div>
        <div>
          <AiFillGithub className="icons" />
          <p>안녕하세요</p>
        </div>
        <div>안녕하세요, {props.user.name}님!</div>
        <h2>게시글 목록</h2>
        <ul>
          <li>게시글 1</li>
          <li>게시글 2</li>
          <li>게시글 3</li>
        </ul>
      </div>
    </div>
  );
}
