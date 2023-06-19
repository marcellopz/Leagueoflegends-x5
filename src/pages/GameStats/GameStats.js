import React, { useEffect, useState } from "react";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import { getOverallStats } from "../../services/firebaseDatabase";
import OverallStats from "./OverallStats";
import ChampionStats from "./ChampionStats";

export default function GameStats() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stats_ = await getOverallStats();
      setStats(stats_);
    })();
    setLoading(false);
  }, []);
  return (
    <X5pageContentArea title="Stats" loading={loading}>
      <OverallStats stats={stats} />
      <ChampionStats champions={stats.champions} />
    </X5pageContentArea>
  );
}
