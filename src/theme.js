import { createTheme } from "@mui/material";

export const themeOptions = {
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
          color: "#e0f7fa",
          backgroundColor: "#1a1f25",
          whiteSpace: "nowrap",
          padding: "5px 10px",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#67e8f9",
    },
    background: {
      bd: "#181e29",
      default: "#12181d",
      paper: "#1c2a35",
      match: "#0d1a22",
    },
    text: {
      primary: "#e0e0e0",
    },
    navbar: {
      background: "#05070d",
      text: "#e0e0e0",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
};

export const theme = createTheme(themeOptions);
