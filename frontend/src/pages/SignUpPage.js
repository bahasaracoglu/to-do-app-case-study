import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiurls } from "../constants/apiurls";
import { Snackbar } from "@mui/material";

function SignUpPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [state, setState] = React.useState({
    openSnackBar: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSnackBar } = state;

  const handleCloseSnackBar = () => {
    setState({ ...state, openSnackBar: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const signupData = {
      name_surname: data.get("firstName") + " " + data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log("loginDasignupDatata", signupData);
    axios
      .post(apiurls.SingUpApi, signupData)
      .then(function (response) {
        console.log("response", response);
        setMessage(response.data.message);
        setState({ ...state, openSnackBar: true });
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message);
        setState({ ...state, openSnackBar: true });
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackBar}
        onClose={handleCloseSnackBar}
        message={message}
        key={vertical + horizontal}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUpPage;
