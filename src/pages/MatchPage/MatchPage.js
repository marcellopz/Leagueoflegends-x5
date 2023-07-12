import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import { getMatchesFullMatch } from "../../services/firebaseDatabase";
import {
  convertSecondsToMinutesAndSeconds2,
  timeSince,
} from "../../utils/utils";

export default function MatchPage() {
  const { matchid } = useParams();
  const [matchData, setMatchData] = useState();
  const date = new Date(matchData.gameCreationDate);

  useEffect(() => {
    getMatchesFullMatch(matchid).then((match) => setMatchData(match));
  }, []);
  console.log(matchData);

  console.log(matchid);
  if (!matchid) {
    return null;
  }
  return (
    <X5pageContentArea title="Match details">
      <div style={{ opacity: "0.7", marginLeft: "20px" }}>
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
    </X5pageContentArea>
  );
}
