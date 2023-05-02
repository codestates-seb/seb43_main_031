import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Lending Page...</div>,
  },
  {
    path: "/login",
    element: <div>Login Page</div>,
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
    element: <div>Board Page</div>,
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
