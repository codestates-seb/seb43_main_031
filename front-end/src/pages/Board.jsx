import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import styled from "styled-components";
import { AiFillGithub } from "react-icons/ai";

export default function BoardPage({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
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
        <div>안녕하세요, {user.name}님!</div>
        <h2>게시글 목록</h2>
        <ul>
          <li>
            <Link to="/detail/1">게시글1</Link>
          </li>
          <li>게시글 2</li>
          <li>게시글 3</li>
        </ul>
      </div>
    </div>
  );
}
