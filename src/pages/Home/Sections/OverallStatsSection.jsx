import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { SideStatBox } from "../../GameStats/OverallStats";
import "./OverallStatsSection.css";

const OverallStatsSection = ({ stats }) => {
  // Organize stats into logical categories for better presentation
  const objectiveStats = useMemo(() => {
    if (!stats || !stats.redSide || !stats.blueSide) return [];

    return [
      {
        title: "Barons killed",
        redSideStat: stats.redSide.baronKills,
        blueSideStat: stats.blueSide.baronKills,
      },
      {
        title: "Dragons killed",
        redSideStat: stats.redSide.dragonKills,
        blueSideStat: stats.blueSide.dragonKills,
      },
      {
        title: "Rift Heralds killed",
        redSideStat: stats.redSide.riftHeraldKills,
        blueSideStat: stats.blueSide.riftHeraldKills,
      },
      {
        title: "Turrets destroyed",
        redSideStat: stats.redSide.towerKills,
        blueSideStat: stats.blueSide.towerKills,
      },
    ];
  }, [stats]);

  const firstObjectiveStats = useMemo(() => {
    if (!stats || !stats.redSide || !stats.blueSide) return [];

    return [
      {
        title: "First bloods",
        redSideStat: stats.redSide.firstBlood,
        blueSideStat: stats.blueSide.firstBlood,
      },
      {
        title: "Killed the first Baron",
        redSideStat: stats.redSide.firstBaron,
        blueSideStat: stats.blueSide.firstBaron,
      },
      {
        title: "Killed the first Dragon",
        redSideStat: stats.redSide.firstDragon,
        blueSideStat: stats.blueSide.firstDragon,
      },
      {
        title: "Destroyed the first tower",
        redSideStat: stats.redSide.firstTower,
        blueSideStat: stats.blueSide.firstTower,
      },
      {
        title: "Destroyed the first inhibitor",
        redSideStat: stats.redSide.firstInhibitor,
        blueSideStat: stats.blueSide.firstInhibitor,
      },
      {
        title: "Wins",
        redSideStat: stats.redSide.wins,
        blueSideStat: stats.blueSide.wins,
      },
    ];
  }, [stats]);

  // Guard against missing stats for rendering
  if (!stats || !stats.redSide || !stats.blueSide) {
    return null;
  }

  return (
    <Box className="overall-stats-section-container" id="overall-stats-section">
      <Box className="stats-grid-container">
        {/* Objectives Stats Grid */}
        <Box className="stats-category">
          <Typography variant="h6" className="category-title">
            Objectives Taken Side Comparison
          </Typography>
          <Box className="stats-items-grid">
            {objectiveStats.map((stat, index) => (
              <Box key={`objective-${index}`} className="stat-item">
                <SideStatBox
                  title={stat.title}
                  redSideStat={stat.redSideStat || 0}
                  blueSideStat={stat.blueSideStat || 0}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* First Objectives Stats Grid */}
        <Box className="stats-category">
          <Typography variant="h6" className="category-title">
            First Objectives & Wins Side Comparison
          </Typography>
          <Box className="stats-items-grid">
            {firstObjectiveStats.map((stat, index) => (
              <Box key={`first-objective-${index}`} className="stat-item">
                <SideStatBox
                  title={stat.title}
                  redSideStat={stat.redSideStat || 0}
                  blueSideStat={stat.blueSideStat || 0}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OverallStatsSection;
