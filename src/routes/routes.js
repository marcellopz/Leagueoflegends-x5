import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import PrivateRoutes from ".";
import Matchmaking from "../pages/Matchmaking/Matchmaking";
import LoginApp from "../pages/Login/LoginApp";
import TestPage from "../pages/TestPages/TestPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/home" />} />
        <Route path="auth/:login" element={<LoginApp />} />
        <Route path="test" element={<TestPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="matchmaking" element={<Matchmaking />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}
