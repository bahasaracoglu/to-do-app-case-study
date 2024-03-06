import * as React from "react";
import { createContext, useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import { apiurls } from "../constants/apiurls";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import AuthContext from "../context/AuthContex";

export default function FormDialog({ open, handleClose }) {
  const { currentUser } = useContext(AuthContext);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const todoData = {
      body: data.get("body"),
      image_upload: data.get("image_upload"),
      file_upload: data.get("file_upload"),
    };

    console.log("todoData", todoData);
    try {
      if (todoData.image_upload.name) {
        const imageName = new Date().getTime() + todoData.image_upload.name;
        const fileName = new Date().getTime() + todoData.file_upload.name;
        const imageRef = ref(storage, imageName);
        const fileRef = ref(storage, fileName);
        const imageTask = uploadBytesResumable(imageRef, "files");
        const fileTask = uploadBytesResumable(fileRef, "files");

        imageTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                // console.log("Upload is paused");
                break;
              case "running":
                // console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            console.error("Error during upload:", error);
          },
          async () => {
            try {
              const imageDownloadURL = await getDownloadURL(
                imageTask.snapshot.ref
              );
              const fileDownloadURL = await getDownloadURL(
                fileTask.snapshot.ref
              );
              console.log("Image available at", imageDownloadURL);
              console.log("File available at", fileDownloadURL);
              const docData = {
                ...todoData,
                image_upload: imageDownloadURL,
                file_upload: fileDownloadURL,
              };
              axios
                .post(apiurls.TodoApi + currentUser.user_id, docData, {
                  headers: {
                    Authorization: currentUser.token,
                  },
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
              // console.log(res.id);
              // console.log("downloaded", docData);
            } catch (error) {
              console.error("Error getting download URL:", error);
            }
          }
        );
      } else {
        // Dosya seçilmediyse, sadece docData'ya boş bir additionalFile ekleyin

        axios
          .post(
            apiurls.TodoApi + currentUser.user_id,
            { ...todoData, image_upload: "", file_upload: "" },
            {
              headers: {
                Authorization: currentUser.token,
              },
            }
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log(res.id);
        // console.log("downloaded", docData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            onSubmit(event);
            console.log();
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new todo</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Text"
                name="body"
                variant="standard"
                fullWidth="true"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" name="file_upload" />
              </Button>{" "}
              <DialogContentText>File attachment</DialogContentText>
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<ImageIcon />}
              >
                Upload image
                <VisuallyHiddenInput type="file" name="image_upload" />
              </Button>
              <DialogContentText>Upload image for thumbnail</DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
