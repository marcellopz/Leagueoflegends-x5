import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import PrivateRoutes, { NavbarRoutes } from ".";
import Matchmaking from "../pages/Matchmaking/Matchmaking";
import LoginApp from "../pages/Login/LoginApp";
import MatchHistory from "../pages/MatchHistory/MatchHistory";
import AdminPage from "../pages/AdminPage/AdminPage";
import PlayerList from "../pages/PlayerList/PlayerList";
import PlayerPage from "../pages/PlayerPage/PlayerPage";
import GameStats from "../pages/GameStats/GameStats";
import PageNotFoundComponent from "./PageNotFoundComponent";
import MatchPage from "../pages/MatchPage/MatchPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/home" />} />
        <Route path="auth/:login" element={<LoginApp />} />
        <Route element={<NavbarRoutes />}>
          <Route path="matchmaking" element={<Matchmaking />} />
          <Route path="history" element={<MatchHistory />} />
          <Route path="players" element={<PlayerList />} />
          <Route path="player/:player" element={<PlayerPage />} />
          <Route path="home" element={<Home />} />
          <Route path="gamestats" element={<GameStats />} />
          <Route path="match/:matchid" element={<MatchPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="*" element={<PageNotFoundComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
