import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import { getMatchesFullMatch } from "../../services/firebaseDatabase";
import {
  convertSecondsToMinutesAndSeconds2,
  timeSince,
} from "../../utils/utils";
import MatchComponent from "./MatchComponent";

export default function MatchPage() {
  const { matchid } = useParams();
  const [matchData, setMatchData] = useState();
  const date = matchData ? new Date(matchData.gameCreationDate) : null;

  useEffect(() => {
    getMatchesFullMatch(matchid).then((match) => setMatchData(match));
  }, []);
  console.log(matchData);

  console.log(matchid);
  if (!matchid || !matchData) {
    return null;
  }
  return (
    <X5pageContentArea title="Match details">
      <div style={{ margin: "5px 20px 20px 20px" }}>
        <div style={{ opacity: "0.7" }}>
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
        <MatchComponent matchData={matchData} />
      </div>
    </X5pageContentArea>
  );
}
