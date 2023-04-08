import { AuthProvider } from "./contexts/authContext";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
