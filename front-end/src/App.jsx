// import libraries
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import pages
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
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing>Landing Page...</Landing>,
    },
    {
      path: "/login",
      element: <Login setUser={setUser} />,
    },
    {
      path: "/register",
      element: <Register>Register Page</Register>,
    },
    {
      path: "/my-page",
      element: <MyPage>My Page</MyPage>,
    },
    {
      path: "/boards",
      element: <BoardList user={user} />,
    },
    {
      path: "/boards/:id",
      element: <Detail />,
    },
    {
      path: "/write",
      element: <Write>Write Page</Write>,
    },
  ]);

  return (
    <div className="App" style={{ backgroundColor: "var(--bg-color)" }}>
      <GlobalStyles />
      <Header user={user} setUser={setUser} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
