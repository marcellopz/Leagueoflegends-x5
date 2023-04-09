import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginForm from "../pages/Login/LoginForm";
import PrivateRoutes from ".";
import Register from "../pages/Login/Register";
import Matchmaking from "../pages/Matchmaking/Matchmaking";
import LoginApp from "../pages/Login/LoginApp";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/home" />} />
        <Route path="auth/:login" element={<LoginApp />} />
        <Route path="test" element={<LoginApp />} />
        <Route element={<PrivateRoutes />}>
          <Route path="matchmaking" element={<Matchmaking />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}
