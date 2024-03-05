import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ToDoPage from "./pages/ToDoPage";

function App() {
  const router = createBrowserRouter([
    { path: "*", element: <Navigate to="/login" /> },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
    {
      path: "/todo-list",
      element: <ToDoPage />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/*  */}
    </div>
  );
}

export default App;
