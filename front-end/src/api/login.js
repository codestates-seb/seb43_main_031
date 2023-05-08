export default function login(email, password) {
  console.info("login", email, password);
  // TODO: fetch API로 교체
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "red@naver.com" && password === "1234") {
        resolve({
          email: "red@naver.com",
          name: "김빨강",
        });
      } else if (email === "blue@naver.com" && password === "1234") {
        resolve({
          email: "blue@naver.com",
          name: "이파랑",
        });
      } else if (email === "green@naver.com" && password === "1234") {
        resolve({
          email: "green@naver.com",
          name: "박초록",
        });
      } else {
        reject(new Error("로그인에 실패했습니다. 이메일 또는 비밀번호가 일치하지 않습니다."));
      }
    }, 100);
  });
}
