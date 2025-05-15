import React, { useContext, useEffect, useState } from "react";
import { getOverallStats, getPlayer } from "../../services/firebaseDatabase";
import { MiscContext } from "../../contexts/miscContext";
import CardDisplay from "../../common-components/CardDisplay/CardDisplay";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import { Box, Typography } from "@mui/material";
import OverallStats from "../GameStats/OverallStats";
import "./home.css";
import GeneralStatsBox from "./GeneralStatsBox";
import GamesGraph from "./GamesGraph";
import { AuthContext } from "../../contexts/authContext";

export default function Home() {
  const { isAnonymous } = useContext(AuthContext);
  const { getCardbackground } = useContext(MiscContext);
  const [players, setPlayers] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stats_ = await getOverallStats();
      setStats(stats_);
      setLoading(false);
    })();
    return () => {
      setLoading(true);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const players_ = await getPlayer("");
      setPlayers(players_);
    })();
    getCardbackground();
  }, [getCardbackground]);

  return (
    <X5pageContentArea noBackground removeMarginTop loading={loading}>
      <Box className="grid-container">
        <Box
          className="grid-item big-item"
          sx={{
            minHeight: "470px",
          }}
        >
          <Typography variant="h5" marginBottom={1} fontWeight={500}>
            Legend Cards
          </Typography>
          <CardDisplay players={players} />
          {isAnonymous && (
            <span>
              To see the card images, please log in and request permission.
            </span>
          )}
        </Box>
        <GeneralStatsBox stats={stats} players={players} />
        <GamesGraph stats={stats} />
      </Box>
      <OverallStats stats={stats} hideMainStats />
    </X5pageContentArea>
  );
}
