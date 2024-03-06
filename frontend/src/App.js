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
import { useContext } from "react";
import AuthContext, { AuthProvider } from "./context/AuthContex";

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
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
      element: (
        <RequireAuth>
          <ToDoPage />
        </RequireAuth>
      ),
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
