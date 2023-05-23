import { Box, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PlayerLine from "./PlayerLine";
import useMatchData from "./useMatchData";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function MatchSummary({ match, expanded, toggleExpanded }) {
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
  const [summaryWidth, setSummaryWidth] = useState();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSummaryWidth(ref.current?.clientWidth);
    });
    setSummaryWidth(ref.current?.clientWidth);
  }, []);

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
          width: "47%",
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
            width={summaryWidth}
          />
        ))}
      </Paper>
      <Paper
        sx={{
          borderRadius: "7px",
          background: redWin ? colorWin : colorLose,
          width: "47%",
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
            width={summaryWidth}
          />
        ))}
      </Paper>
      <Box
        sx={{
          width: "3%",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "7px",
          display: "flex",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={toggleExpanded}
      >
        {expanded ? (
          <ExpandLess sx={{ margin: "auto" }} />
        ) : (
          <ExpandMore sx={{ margin: "auto" }} />
        )}
      </Box>
    </Box>
  );
}
