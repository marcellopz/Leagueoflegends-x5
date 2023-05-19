import React from "react";
import useMatchData from "./useMatchData";

export default function MatchDetails({ match }) {
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
  return <div style={{ color: "white" }}>Soon</div>;
}
