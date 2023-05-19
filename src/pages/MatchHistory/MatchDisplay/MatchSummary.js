import { Box, Paper } from "@mui/material";
import React, { useRef } from "react";
import PlayerLine from "./PlayerLine";
import useMatchData from "./useMatchData";

export default function MatchSummary({ match }) {
  const {
    blueTeam,
    redTeam,
    blueMaxTanked,
    redMaxTanked,
    redKils,
    blueKills,
    redMaxDamage,
    redMaxGold,
    blueMaxDamage,
    blueMaxGold,
    blueWin,
    redWin,
  } = useMatchData(match);
  const ref = useRef(null);

  const colorWin = "#003c7a";
  const colorLose = "#8f0101";
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        color: "gainsboro",
      }}
      ref={ref}
    >
      <Paper
        sx={{
          borderRadius: "7px",
          background: blueWin ? colorWin : colorLose,
          width: "49%",
          padding: "5px",
          color: "gainsboro",
        }}
      >
        {blueTeam.map((p) => (
          <PlayerLine
            player={p}
            key={p.participantId}
            totalKills={blueKills}
            maxDamage={blueMaxDamage}
            maxGold={blueMaxGold}
            maxTank={blueMaxTanked}
          />
        ))}
      </Paper>
      <Paper
        sx={{
          borderRadius: "7px",
          background: redWin ? colorWin : colorLose,
          width: "49%",
          padding: "5px",
          color: "gainsboro",
        }}
      >
        {redTeam.map((p) => (
          <PlayerLine
            player={p}
            key={p.participantId}
            totalKills={redKils}
            maxDamage={redMaxDamage}
            maxGold={redMaxGold}
            maxTank={redMaxTanked}
          />
        ))}
      </Paper>
    </Box>
  );
}
