import { Box, Paper } from "@mui/material";
import React, { useContext } from "react";
import PlayerLine from "./PlayerLine";
import useMatchData from "./useMatchData";
import { KeyboardArrowRight } from "@mui/icons-material";
import { theme } from "../../../theme";
import { AuthContext } from "../../../contexts/authContext";
import { Link } from "react-router-dom";
import { KDA } from "../../MatchPage/MatchComponent";
import "./MatchSummary.css";

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
    <div className="match-summary-container">
      {isAdmin && (
        <div
          className="ms-admin-edit-button"
          onClick={() => openDialog(blueTeam, redTeam, match.gameId)}
        >
          edit
        </div>
      )}
      <div className="ms-date">
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
          <div className="ms-team-header">
            <div className="ms-team-title">
              <p className="ms-team-name">Team 1:</p>
              <p
                className={
                  blueWin ? "ms-team-status-victory" : "ms-team-status-defeat"
                }
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
          <div className="ms-team-header">
            <div className="ms-team-title">
              <p className="ms-team-name">Team 2:</p>
              <p
                className={
                  redWin ? "ms-team-status-victory" : "ms-team-status-defeat"
                }
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
          className="ms-view-details-button"
          onClick={toggleExpanded}
        >
          <KeyboardArrowRight sx={{ margin: "auto" }} />
        </Box>
      </Box>
    </div>
  );
}
