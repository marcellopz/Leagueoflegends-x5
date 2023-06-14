import React from "react";
import PersonalMatch from "./PersonalMatch";

export default function SummaryMatches({ games }) {
  return (
    <div>
      {Object.values(games)
        .reverse()
        .map((game, i) => (
          <div key={i} style={{ marginTop: "15px" }}>
            <PersonalMatch game={game} />
          </div>
        ))}
    </div>
  );
}
