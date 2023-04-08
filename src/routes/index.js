import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>loading</div>;
  }

  return signed ? <Outlet /> : <Navigate to="/login" />;
}
