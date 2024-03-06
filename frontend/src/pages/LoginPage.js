import * as React from "react";
import { useState, useContext } from "react";
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
import AuthContext from "../context/AuthContex";
import { Snackbar } from "@mui/material";

function LoginPage() {
  const { setCurrentUser } = useContext(AuthContext);
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
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(loginData);
    axios
      .post(apiurls.LoginApi, loginData)
      .then(function (response) {
        console.log(response);

        setCurrentUser({
          name_surname: response.data.name_surname,
          email: response.data.email,
          token: response.data.token,
          user_id: response.data.user_id,
        });

        navigate("/todo-list");
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message);
        setState({ ...state, openSnackBar: true });
        setTimeout(() => {}, 3000);
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
