import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";
import { NavbarProvider } from "../contexts/navbarContext";

export default function PrivateRoutes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>loading123</div>;
  }

  return signed ? <Outlet /> : <Navigate to="auth/login" />;
}

export function NavbarRoutes() {
  return (
    <NavbarProvider>
      <Outlet />
    </NavbarProvider>
  );
}
