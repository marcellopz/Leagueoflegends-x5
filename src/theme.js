import { createTheme } from "@mui/material";

// CSS theme color values converted to hex
const colors = {
  // Grays
  gray50: "#f9fafb",
  gray100: "#e5e7eb",
  gray200: "#d1d5db",
  gray300: "#9ca3af",
  gray400: "#6b7280",
  gray500: "#374151",
  gray600: "#1e2124", // Removed blue tint
  gray700: "#121314", // Removed blue tint
  gray800: "#0a0b0c", // Removed blue tint, extra dark for depth
  gray900: "#030303", // Removed blue tint

  // Accents (Blue)
  blue300: "#93c5fd",
  blue400: "#60a5fa",
  blue500: "#3b82f6",
  blue600: "#2563eb",

  // Destructive (Red)
  red300: "#fca5a5",
  red400: "#f87171",
  red500: "#ef4444",
  red600: "#dc2626",

  green300: "rgb(134, 239, 172)",
  green400: "rgb(74, 222, 128)",
  green500: "rgb(34, 197, 94)",
  green600: "rgb(22, 163, 74)",
};

export const themeOptions = {
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
          color: colors.gray100,
          backgroundColor: colors.gray800,
          whiteSpace: "nowrap",
          padding: "5px 10px",
          borderRadius: "0.5rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: colors.gray100,
      light: colors.gray200,
      dark: colors.gray400,
      contrastText: colors.gray900,
    },
    secondary: {
      main: colors.gray600,
      light: colors.gray500,
      dark: colors.gray700,
      contrastText: colors.gray300,
    },
    background: {
      bd: colors.gray800,
      default: colors.gray900,
      paper: colors.gray800,
      match: colors.gray800,
    },
    text: {
      primary: colors.gray100,
      secondary: colors.gray400,
    },
    error: {
      main: colors.red500, // Keep red for error states
      light: colors.red400,
      dark: colors.red600,
      contrastText: colors.gray50,
    },
    info: {
      main: colors.blue400, // Blue for informational states only
      light: colors.blue300,
      dark: colors.blue600,
      contrastText: colors.gray900,
    },
    success: {
      main: colors.green500, // Using green for success states
      light: colors.green400,
      dark: colors.green600,
      contrastText: colors.gray900,
    },
    warning: {
      main: colors.gray400, // Using gray instead of orange/yellow
      light: colors.gray300,
      dark: colors.gray500,
      contrastText: colors.gray900,
    },
    divider: colors.gray500,
    navbar: {
      background: colors.gray900,
      text: colors.gray100,
    },
  },
  shape: {
    borderRadius: 8, // 0.5rem = 8px
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
};

export const theme = createTheme(themeOptions);
