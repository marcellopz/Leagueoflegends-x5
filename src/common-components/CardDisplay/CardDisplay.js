import React, { useMemo } from "react";
import CardComponent from "./CardComponent";
import DisplayBox from "./DisplayBox";

export default function CardDisplay({ players }) {
  const cards = useMemo(() => {
    return players
      ? Object.keys(players)
          .filter((player) => !players[player].hide)
          .map((player) => (
            <CardComponent
              name={player}
              ranks={players[player]}
              label={players[player].name}
              key={player}
              sx={{ margin: "4px", height: "300px" }}
            />
          ))
      : [];
  }, [players]);

  return <DisplayBox cards={cards} />;
}
