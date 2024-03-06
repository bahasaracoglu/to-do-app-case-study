import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import ToDoList from "./ToDoList";
import FormDialog from "./FormDialog";
import axios from "axios";
import { apiurls } from "../constants/apiurls";
import AuthContext from "../context/AuthContex";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function BottomAppBar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [todoList, setTodoList] = useState([]);

  const fetchData = () => {
    axios
      .get(apiurls.TodoApi + currentUser.user_id, {
        headers: {
          Authorization: currentUser.token,
        },
      })
      .then(function (response) {
        console.log("response", response);
        setTodoList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <FormDialog open={open} handleClose={handleClose} fetchData={fetchData} />
      <Paper square sx={{ pb: "50px", mt: "20px" }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ p: 2, pb: 0 }}
        >
          To Do App
        </Typography>
        <ToDoList fetchData={fetchData} todoList={todoList} />
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab
            color="secondary"
            aria-label="add"
            onClick={handleClickOpen}
          >
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
