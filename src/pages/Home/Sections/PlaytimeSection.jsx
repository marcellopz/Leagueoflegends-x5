import React from "react";
import { Box } from "@mui/material";
import HourlyDistribution from "../GraphComponents/HourlyDistribution";
import WeekDayDistribution from "../GraphComponents/WeekDayDistribution";
import GameDurationHistogram from "../GraphComponents/GameDurationHistogram";
import "./PlaytimeSection.css";

const PlaytimeSection = ({ stats }) => {
  return (
    <Box className="playtime-section-container" id="playtime-section">
      <Box className="playtime-graphs-container">
        <Box className="hourly-distribution-container">
          <HourlyDistribution stats={stats} />
        </Box>
        <Box className="weekday-distribution-container">
          <WeekDayDistribution stats={stats} />
        </Box>
        <Box className="game-duration-container">
          <GameDurationHistogram stats={stats} />
        </Box>
      </Box>
    </Box>
  );
};

export default PlaytimeSection;
