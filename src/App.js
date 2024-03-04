import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ToDoList from "./components/ToDoList";
import BottomAppBar from "./components/BottomAppBar";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <BottomAppBar />
      </Container>
    </div>
  );
}

export default App;
