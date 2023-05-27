import { createTheme } from "@mui/material";

export const themeOptions = {
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
          color: "#f0fffe",
          backgroundColor: "#0B0C10",
          whiteSpace: "nowrap",
          padding: "5px 10px",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      // main: "#e65100",
      main: "#66FCF1",
    },
    secondary: {
      main: "#45A29E",
    },
    background: {
      bd: "#0B0C10",
      default: "#0B0C10",
      paper: "#1F2833",
      match: "#041218",
    },
    text: {
      primary: "#f0fffe",
    },
    navbar: {
      background: "#0B0C10",
      text: "#f0fffe",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
};

export const theme = createTheme(themeOptions);
