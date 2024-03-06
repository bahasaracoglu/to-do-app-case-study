import * as React from "react";
import { useEffect, useContext } from "react";
import List from "@mui/material/List";

import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import axios from "axios";
import { apiurls } from "../constants/apiurls";
import AuthContext from "../context/AuthContex";

function ToDoList({ fetchData, todoList }) {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = (todo_id) => {
    axios
      .delete(apiurls.TodoApi + currentUser.user_id + "/" + todo_id, {
        headers: {
          Authorization: currentUser.token,
        },
      })
      .then(function (response) {
        console.log(response);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <List sx={{ mb: 2 }}>
      {todoList.map(({ body, image_upload, file_upload, todo_id }) => (
        <React.Fragment key={todo_id}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={image_upload} />
            </ListItemAvatar>
            <ListItemText
              primary={body}
              secondary={
                file_upload ? (
                  <a
                    href={file_upload}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Attached file
                  </a>
                ) : (
                  ""
                )
              }
            />
            <IconButton edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(todo_id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemButton>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

export default ToDoList;
