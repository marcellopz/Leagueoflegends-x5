import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";

const TitleValueBox = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "150px",
        maxWidth: "220px",
        gap: "16px",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h3">{value}</Typography>
    </Box>
  );
};

const GeneralStatsBox = ({ stats, players }) => {
  if (!stats || !players) {
    return null;
  }

  return (
    <Box className="grid-item small-item">
      <TitleValueBox title="Number of Games" value={stats.numberOfGames} />
      <div className="small-item-divider" />
      <TitleValueBox
        title="Number of Legends"
        value={Object.keys(players).length}
      />
    </Box>
  );
};

export default GeneralStatsBox;
