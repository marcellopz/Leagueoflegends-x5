import { Box, Button, Paper, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginApp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    // Handle login with Google logic here
  };
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
          backgroundColor: "#8caeb5d4",
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
        >
          <TextField
            id="email-input"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            id="password-input"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            sx={{ marginBottom: "1rem" }}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{ marginBottom: "1rem" }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            onClick={handleGoogleLogin}
            sx={{ marginBottom: "1rem" }}
          >
            Log In with Google
          </Button>
          <Link href="/register">Register</Link>
        </form>
        {/* <div>xd</div> */}
      </Paper>
    </Box>
  );
}
