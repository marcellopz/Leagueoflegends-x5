import { ThemeProvider } from "@emotion/react";
import { AuthProvider } from "./contexts/authContext";
import AppRoutes from "./routes/routes";
import { theme } from "./theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
