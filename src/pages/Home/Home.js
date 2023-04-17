import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { getPlayer } from "../../services/firebaseDatabase";
import PlayerDisplay from "./PlayerDisplay";

export default function Home() {
  const { signOut, signed } = useContext(AuthContext);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (signed) {
      (async () => {
        const players_ = await getPlayer("");
        setPlayers(players_);
      })();
    }
  }, [signed]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "10px" }}>
        {players &&
          Object.keys(players).map((player) => (
            <PlayerDisplay
              name={player}
              ranks={players[player]}
              key={player}
              sx={{ margin: "4px", height: "300px" }}
            />
          ))}
      </div>
      <button onClick={signOut}>Sair</button>
      <div style={{ margin: "10px" }}>
        <a href="/matchmaking">Matchmaking</a>
      </div>
    </div>
  );
}
