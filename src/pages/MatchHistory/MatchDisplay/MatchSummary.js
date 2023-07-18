import { Box, Paper } from "@mui/material";
import React, { useContext } from "react";
import PlayerLine from "./PlayerLine";
import useMatchData from "./useMatchData";
import { KeyboardArrowRight } from "@mui/icons-material";
import { theme } from "../../../theme";
import { AuthContext } from "../../../contexts/authContext";
import { Link } from "react-router-dom";
import { KDA } from "../../MatchPage/MatchComponent";

export default function MatchSummary({ match, toggleExpanded, openDialog }) {
  const {
    blueTeam,
    redTeam,
    redKills,
    redDeaths,
    redAssists,
    blueKills,
    blueDeaths,
    blueAssists,
    blueWin,
    redWin,
    gameDuration,
    gameDate,
    gameDurationStr,
  } = useMatchData(match);
  const { isAdmin } = useContext(AuthContext);

  return (
    <div style={{ width: "100%", color: "gainsboro", position: "relative" }}>
      {isAdmin && (
        <div
          style={{ position: "absolute", right: "15px", cursor: "pointer" }}
          onClick={() => openDialog(blueTeam, redTeam, match.gameId)}
        >
          edit
        </div>
      )}
      <div
        style={{
          color: "rgba(255,255,255,0.5)",
          textAlign: "center",
          width: "100%",
          marginBottom: "5px",
        }}
      >
        {`Played on ${gameDate} - Duration: ${gameDurationStr}`}
      </div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Paper
          sx={{
            borderRadius: "7px",
            background: "transparent",
            flexGrow: 1,
            padding: "5px",
            color: theme.palette.text.primary,
            border: "1px solid rgba(255,255,255,0.3)",
            maxWidth: "50%",
          }}
        >
          <div className="flex p-1 text-xl justify-between pr-4">
            <div className="flex">
              <p className="mr-2">Team 1:</p>
              <p
                style={{
                  color: blueWin ? "rgb(85,255,75)" : "rgb(255,75,75)",
                }}
              >
                {blueWin ? "Victory" : "Defeat"}
              </p>
            </div>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <KDA
                kills={blueKills}
                deaths={blueDeaths}
                assists={blueAssists}
              />
            </Box>
          </div>
          {blueTeam.map((p) => (
            <PlayerLine
              player={p}
              key={p.participantId}
              totalKills={blueKills}
              gameDuration={gameDuration}
            />
          ))}
        </Paper>
        <Paper
          sx={{
            borderRadius: "7px",
            background: "transparent",
            flexGrow: 1,
            padding: "5px",
            color: theme.palette.text.primary,
            border: "1px solid rgba(255,255,255,0.3)",
            maxWidth: "50%",
          }}
        >
          <div className="flex p-1 text-xl justify-between pr-4">
            <div className="flex">
              <p className="mr-2">Team 2:</p>
              <p
                style={{
                  color: redWin ? "rgb(85,255,75)" : "rgb(255,75,75)",
                }}
              >
                {redWin ? "Victory" : "Defeat"}
              </p>
            </div>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <KDA kills={redKills} deaths={redDeaths} assists={redAssists} />
            </Box>
          </div>
          {redTeam.map((p) => (
            <PlayerLine
              player={p}
              key={p.participantId}
              totalKills={redKills}
              gameDuration={gameDuration}
            />
          ))}
        </Paper>
        <Box
          component={Link}
          to={`/match/match${match.gameId}`}
          sx={{
            width: "3%",
            minWidth: "30px",
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "7px",
            display: "flex",
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={toggleExpanded}
        >
          <KeyboardArrowRight sx={{ margin: "auto" }} />
        </Box>
      </Box>
    </div>
  );
}
