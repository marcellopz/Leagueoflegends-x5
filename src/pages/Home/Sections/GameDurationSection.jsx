import React from "react";
import { Box, Typography, Button } from "@mui/material";
import GameDurationHistogram from "../GraphComponents/GameDurationHistogram";
import "./GameDurationSection.css";

const GameDurationSection = ({ stats }) => {
  return (
    <Box className="game-duration-section-container" id="game-duration-section">
      <Box className="game-duration-content">
        <Box className="game-duration-graph">
          <GameDurationHistogram stats={stats} />
        </Box>
        <Box className="game-duration-placeholder">
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            This section is incomplete. Future features could include:
          </Typography>
          <ul className="feature-list">
            <li>Average game duration by champion</li>
            <li>Game duration trends over time</li>
            <li>Win rate analysis by game duration</li>
            <li>Correlation between game duration and other factors</li>
          </ul>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }} disabled>
            Coming Soon
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GameDurationSection;
