import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import CustomTextfield from "../../common-components/CustomTextfield";
import { Button, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { signUpUsernamePwd } = useContext(AuthContext);

  const handleEmailChange = (_email) => {
    setEmail(_email);
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
  };

  const handleRepeatPasswordChange = (pwd) => {
    setRepeatPassword(pwd);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === repeatPassword) {
      signUpUsernamePwd(email, password);
    }
    // Handle form submission here
  };

  return (
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
      <Typography sx={{ fontWeight: 700, marginBottom: 4, fontSize: 26 }}>
        Register
      </Typography>
      <CustomTextfield
        width="350px"
        label="Email"
        onChange={handleEmailChange}
        type="email"
        sx={{ marginBottom: "1.5rem", maxWidth: "90%" }}
      />
      <CustomTextfield
        width="350px"
        label="Password"
        onChange={handlePasswordChange}
        type="password"
        sx={{ marginBottom: "1.5rem", maxWidth: "90%" }}
      />
      <CustomTextfield
        width="350px"
        label="Repeat Password"
        onChange={handleRepeatPasswordChange}
        type="password"
        sx={{ marginBottom: "1.5rem", maxWidth: "90%" }}
      />
      <Button
        variant="outlined"
        sx={{ width: "350px", marginBottom: "1rem", maxWidth: "90%" }}
        type="submit"
        color="info"
      >
        Register
      </Button>
      <IconButton>
        <Link to="auth/login">
          <ChevronLeftIcon />
        </Link>
      </IconButton>
    </form>
  );
}

export default RegisterForm;
