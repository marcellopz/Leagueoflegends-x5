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
    gameDuration,
    colorWin,
    colorLose,
  } = useMatchData(match);
  const ref = useRef(null);
  const [summaryWidth, setSummaryWidth] = useState();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSummaryWidth(ref.current?.clientWidth);
    });
    setSummaryWidth(ref.current?.clientWidth);
  }, []);

  return (
    <div style={{ width: "100%", color: "gainsboro" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Paper
          sx={{
            borderRadius: "7px",
            background: blueWin ? colorWin : colorLose,
            width: summaryWidth > 350 ? "47%" : "49%",
            padding: "5px",
            color: "gainsboro",
          }}
          ref={ref}
        >
          {blueTeam.map((p) => (
            <PlayerLine
              player={p}
              key={p.participantId}
              totalKills={blueKills}
              maxDamage={blueMaxDamage}
              maxGold={blueMaxGold}
              maxTank={blueMaxTanked}
              gameDuration={gameDuration}
              width={summaryWidth}
            />
          ))}
        </Paper>
        <Paper
          sx={{
            borderRadius: "7px",
            background: redWin ? colorWin : colorLose,
            width: summaryWidth > 350 ? "47%" : "49%",
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
              gameDuration={gameDuration}
              width={summaryWidth}
            />
          ))}
        </Paper>
        {summaryWidth > 350 && (
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
        )}
      </Box>
      {summaryWidth < 350 && (
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "7px",
            display: "flex",
            ":hover": {
              cursor: "pointer",
            },
            margin: "7px 0",
            height: "30px",
          }}
          onClick={toggleExpanded}
        >
          {expanded ? (
            <ExpandLess sx={{ margin: "auto" }} />
          ) : (
            <ExpandMore sx={{ margin: "auto" }} />
          )}
        </Box>
      )}
    </div>
  );
}
