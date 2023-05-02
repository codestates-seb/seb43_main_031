// import libraries
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import pages
import LoginPage from "./pages/LoginPage";
import BoardPage from "./pages/BoardPage";
// import components
import Header from "./components/Header";
import Footer from "./components/Footer";
// import etc

// App
function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Lending Page...</div>,
    },
    {
      path: "/login",
      element: <LoginPage setUser={setUser} />,
    },
    {
      path: "/register",
      element: <div>Register Page</div>,
    },
    {
      path: "/my-page",
      element: <div>My Page</div>,
    },
    {
      path: "/board",
      element: <BoardPage user={user} />,
    },
    {
      path: "/article/:id",
      element: <div>Article Page</div>,
    },
    {
      path: "/write",
      element: <div>Write Page</div>,
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
