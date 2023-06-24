import React from "react";
import PersonalMatch from "./PersonalMatch";

export default function SummaryMatches({ games }) {
  return (
    <div>
      {Object.entries(games)
        .reverse()
        .map(([gameId, game], i) => (
          <div key={i} style={{ marginTop: "15px" }}>
            <PersonalMatch game={game} gameId={gameId} />
          </div>
        ))}
    </div>
  );
}
