export default function Header(props) {
  return (
    <header>
      <h1>빨간망토</h1>
      <nav>
        <ul>
          {props.user ? (
            <li
              onClick={() => {
                props.setUser(null);
                window.location.href = "/login";
              }}
            >
              로그아웃
            </li>
          ) : (
            <li
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              로그인
            </li>
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
