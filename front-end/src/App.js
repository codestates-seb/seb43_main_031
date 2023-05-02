import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BoardPage from "./pages/BoardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Lending Page...</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
    element: <BoardPage />,
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

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
