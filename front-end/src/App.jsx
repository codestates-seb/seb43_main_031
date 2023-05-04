// import libraries
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import pages
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Board from "./pages/Board";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import Write from "./pages/Write";
// import layouts
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
// import etc

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
      path: "/board",
      element: <Board user={user} />,
    },
    {
      path: "/detail/:id",
      element: <Detail>Detail Page</Detail>,
    },
    {
      path: "/write",
      element: <Write>Write Page</Write>,
    },
  ]);

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
