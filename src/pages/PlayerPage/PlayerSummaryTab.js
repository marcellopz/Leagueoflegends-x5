import React from "react";
import PersonalChampionStats from "./components/PersonalChampionStats";

export default function PlayerSummaryTab({
  champs,
  playerInfo,
  playerKey,
  selectedPlayerCardStats,
}) {
  console.log({ champs, playerInfo, playerKey, selectedPlayerCardStats });
  return (
    <div>
      PlayerSummary
      <div>
        {champs.map((champ) => (
          // <div key={champ.championName}>{champ.championName}</div>
          <PersonalChampionStats key={champ.championName} champ={champ} />
        ))}
      </div>
    </div>
  );
}
