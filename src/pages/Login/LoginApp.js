import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CustomTextfield from "../../common-components/CustomTextfield";
import { AuthContext } from "../../contexts/authContext";

export default function LoginApp() {
  const { signInGoogle, signed, signInUsernamePwd, signInAsGuest } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (_email) => {
    setEmail(_email);
  };

  const handlePasswordChange = (_password) => {
    setPassword(_password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInUsernamePwd(email, password);
  };

  async function handleGoogleLogin() {
    await signInGoogle();
  }

  if (signed) {
    return <Navigate to="/home" />;
  }

  return (
    <Box
      sx={{
        // backgroundImage: `url("https://i.imgur.com/oPmgJyq.png")`,
        backgroundImage: `url("https://i.imgur.com/oI1K47k.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <Paper
        sx={{
          borderRadius: 0,
          height: "100%",
          minWidth: "400px",
          width: "30%",
          boxShadow: "10",
          marginLeft: "50px",
          //   backgroundColor: "#8caeb5d4",
          backgroundColor: "#f9f9f9",
        }}
      >
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit}
        >
          <Typography sx={{ fontWeight: 700, marginBottom: 4, fontSize: 23 }}>
            Sign In
          </Typography>
          <CustomTextfield
            width="250px"
            label="Email"
            onChange={handleEmailChange}
            type="email"
            sx={{ marginBottom: "1rem" }}
          />
          <CustomTextfield
            width="250px"
            label="Password"
            onChange={handlePasswordChange}
            type="password"
            sx={{ marginBottom: "1rem" }}
          />
          <Button
            variant="outlined"
            sx={{ width: "250px", marginBottom: "0.4rem" }}
            type="submit"
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            startIcon={
              <img
                src="data:image/svg+xml;charset=utf8;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjEwIDEwIDI4IDI4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMzUuOTk5OSAyNC4yNzQxQzM1Ljk5OTkgMjMuNDU4NCAzNS45MzI0IDIyLjYzODQgMzUuNzg4NCAyMS44MzU5SDI0LjI0MTdWMjYuNDU2NUgzMC44NTRDMzAuNTc5NiAyNy45NDY3IDI5LjY5NzkgMjkuMjY0OSAyOC40MDcgMzAuMTAyNlYzMy4xMDA3SDMyLjM1MTlDMzQuNjY4NCAzMS4wMTA4IDM1Ljk5OTkgMjcuOTI0NiAzNS45OTk5IDI0LjI3NDFaIiBmaWxsPSIjNDI4NUY0Ii8+CjxwYXRoIGQ9Ik0yNC4yNDE3IDM1Ljk5ODRDMjcuNTQzNCAzNS45OTg0IDMwLjMyNzcgMzQuOTM1OSAzMi4zNTY0IDMzLjEwMThMMjguNDExNSAzMC4xMDM3QzI3LjMxNCAzMC44MzU2IDI1Ljg5NzEgMzEuMjUgMjQuMjQ2MiAzMS4yNUMyMS4wNTI2IDMxLjI1IDE4LjM0NDcgMjkuMTM4MiAxNy4zNzMxIDI2LjI5ODhIMTMuMzAyMlYyOS4zODk1QzE1LjM4MDQgMzMuNDQxMiAxOS42MTMxIDM1Ljk5ODQgMjQuMjQxNyAzNS45OTg0WiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNMTcuMzY4NSAyNi4yOThDMTYuODU1NyAyNC44MDc4IDE2Ljg1NTcgMjMuMTk0MSAxNy4zNjg1IDIxLjcwMzlWMTguNjEzM0gxMy4zMDIyQzExLjU2NTkgMjIuMDAzNyAxMS41NjU5IDI1Ljk5ODIgMTMuMzAyMiAyOS4zODg2TDE3LjM2ODUgMjYuMjk4WiIgZmlsbD0iI0ZCQkMwNCIvPgo8cGF0aCBkPSJNMjQuMjQxNyAxNi43NDkyQzI1Ljk4NyAxNi43MjI3IDI3LjY3MzggMTcuMzY2NCAyOC45Mzc4IDE4LjU0OEwzMi40MzI5IDE1LjEyMjNDMzAuMjE5OCAxMy4wODU0IDI3LjI4MjUgMTEuOTY1NSAyNC4yNDE3IDEyLjAwMDhDMTkuNjEzMSAxMi4wMDA4IDE1LjM4MDQgMTQuNTU4IDEzLjMwMjIgMTguNjE0MkwxNy4zNjg2IDIxLjcwNDhDMTguMzM1NyAxOC44NjExIDIxLjA0ODEgMTYuNzQ5MiAyNC4yNDE3IDE2Ljc0OTJaIiBmaWxsPSIjRUE0MzM1Ii8+Cjwvc3ZnPgo="
                alt="google icon"
              />
            }
            sx={{ width: "250px", marginBottom: "0.6rem" }}
            onClick={handleGoogleLogin}
          >
            <Typography>Log in with Google</Typography>
          </Button>
          <Link to="/register">
            <Typography>Register</Typography>
          </Link>
        </form>
      </Paper>
    </Box>
  );
}
