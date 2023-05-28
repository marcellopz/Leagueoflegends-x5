import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import PrivateRoutes from ".";
import Matchmaking from "../pages/Matchmaking/Matchmaking";
import LoginApp from "../pages/Login/LoginApp";
import TestPage from "../pages/TestPages/TestPage";
import MatchHistory from "../pages/MatchHistory/MatchHistory";
import PatchNotes from "../pages/PatchNotes/PatchNotes";
import PlayerPage from "../pages/PlayerPage/PlayerPage";
import AdminPage from "../pages/AdminPage/AdminPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/home" />} />
        <Route path="auth/:login" element={<LoginApp />} />
        <Route path="test" element={<TestPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="matchmaking" element={<Matchmaking />} />
          <Route path="history" element={<MatchHistory />} />
          <Route path="players" element={<PlayerPage />} />
          <Route path="patchnotes" element={<PatchNotes />} />
          <Route path="home" element={<Home />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}
