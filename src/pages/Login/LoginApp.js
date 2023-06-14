import { Grid } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import RegisterForm from "./RegisterForm";

export default function LoginApp() {
  const { signed, isNull, isAnonymous } = useContext(AuthContext);
  const routerParams = useParams();

  if (signed && !isNull && !isAnonymous) {
    return <Navigate to="/home" />;
  }

  return (
    <Grid
      container
      sx={{
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
      <Grid
        item
        xs={10}
        md={3}
        sx={{
          borderRadius: 0,
          height: "100%",
          maxWidth: "90%",
          width: "400px",
          boxShadow: "10",
          marginLeft: "8%",
          backgroundColor: "#f9f9f9",
        }}
      >
        {routerParams.login === "register" && <RegisterForm />}
        {routerParams.login === "login" && <LoginForm />}
      </Grid>
    </Grid>
  );
}
