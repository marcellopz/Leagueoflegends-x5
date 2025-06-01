import React, { useContext, useEffect, useState } from "react";
import { getOverallStats, getPlayer } from "../../services/firebaseDatabase";
import { MiscContext } from "../../contexts/miscContext";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import MainSection from "./Sections/MainSection";
import PlaytimeSection from "./Sections/PlaytimeSection";
import OverallStatsSection from "./Sections/OverallStatsSection";
import "./home.css";

export default function Home() {
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
      <MainSection stats={stats} players={players} />
      <PlaytimeSection stats={stats} />
      <OverallStatsSection stats={stats} />
    </X5pageContentArea>
  );
}
