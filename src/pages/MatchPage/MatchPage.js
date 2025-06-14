import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import {
  getMatchRoles,
  getMatchesFullMatch,
} from "../../services/firebaseDatabase";
import {
  convertSecondsToMinutesAndSeconds2,
  timeSince,
} from "../../utils/utils";
import MatchComponent from "./MatchComponent";
import { Grid } from "@mui/material";
import DamageChart from "./DamageChart";
import PlayerTabs from "./PlayerTabs";
import "./MatchPage.css";

const MatchDetails = ({ date, matchData }) => (
  <div className="match-details-container">
    <p>{`Match played on ${date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    })} (${timeSince(date)})`}</p>
    <p>{`Game Duration: ${convertSecondsToMinutesAndSeconds2(
      matchData.gameDuration
    )}`}</p>
    <p>{`Match ID: ${matchData.gameId}`}</p>
  </div>
);

const ExtraInfo = ({ matchData }) => (
  <Grid container sx={{ marginTop: "1px" }} spacing={3}>
    <Grid item xs={12} lg={4}>
      <DamageChart matchData={matchData} />
    </Grid>
    <Grid item xs={12} lg={8}>
      <PlayerTabs matchData={matchData} />
    </Grid>
  </Grid>
);

export default function MatchPage() {
  const { matchid } = useParams();
  const [matchData, setMatchData] = useState();
  const [matchRoles, setMatchRoles] = useState();
  const date = matchData ? new Date(matchData.gameCreationDate) : null;

  useEffect(() => {
    getMatchesFullMatch(matchid).then((match) => setMatchData(match));
    getMatchRoles(matchid).then((roles) => setMatchRoles(roles));
  }, []);

  if (!matchid || !matchData) {
    return null;
  }

  return (
    <X5pageContentArea title="Match details">
      <div className="match-page-container">
        <MatchDetails date={date} matchData={matchData} />
        <MatchComponent matchData={matchData} matchRoles={matchRoles} />
        <ExtraInfo matchData={matchData} />
      </div>
    </X5pageContentArea>
  );
}
