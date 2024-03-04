import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ToDoList from "./components/ToDoList";
import BottomAppBar from "./components/BottomAppBar";
import { Container } from "@mui/material";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";

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
      element: <BottomAppBar />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Container maxWidth="sm">
        <BottomAppBar />
      </Container> */}
    </div>
  );
}

export default App;
