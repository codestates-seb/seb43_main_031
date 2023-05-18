import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import pages
import { useSelector } from "react-redux";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BoardList from "./pages/BoardList";
import MyPage from "./pages/MyPage";
import Detail from "./pages/detail/Detail";
import Write from "./pages/Write";
// import layouts
import Header from "./layouts/Header";
// import Footer from "./layouts/Footer";

// import etc
import GlobalStyles from "./styles/GlobalStyles";

// App
function App() {
  const currentUser = useSelector(state => state.user);

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
