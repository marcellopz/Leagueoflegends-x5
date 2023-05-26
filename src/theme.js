import { createTheme } from "@mui/material";

export const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      // main: "#e65100",
      main: "#909090",
    },
    secondary: {
      main: "#e4ca07",
    },
    background: {
      bd: "#080808",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
};

export const theme = createTheme(themeOptions);
