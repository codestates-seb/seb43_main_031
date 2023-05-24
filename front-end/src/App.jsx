import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import pages
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BoardList from "./pages/BoardList";
import MyPage from "./pages/MyPage";
import Detail from "./pages/detail/Detail";
import Write from "./pages/Write";
import ChatPage from "./pages/ChatPage";

// import layouts
import Header from "./layouts/Header";

// import etc
import GlobalStyles from "./styles/GlobalStyles";

// App
function App() {
  // 배포 환경에서 console.log 지우기
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
  }
  return (
    <div className="App" style={{ backgroundColor: "var(--bg-color)" }}>
      <GlobalStyles />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/boards" element={<BoardList />} />
          <Route path="/boards/:id" element={<Detail />} />
          <Route path="/write" element={<Write />} />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
