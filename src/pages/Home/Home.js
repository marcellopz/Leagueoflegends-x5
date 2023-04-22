import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { getPlayer } from "../../services/firebaseDatabase";
import PlayerDisplay from "./PlayerDisplay";
import { MiscContext } from "../../contexts/miscContext";

export default function Home() {
  const { signOut, signed, isNerd, userObj, isAnonymous } =
    useContext(AuthContext);
  const { getCardbackground } = useContext(MiscContext);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (signed) {
      (async () => {
        const players_ = await getPlayer("");
        setPlayers(players_);
      })();
      getCardbackground();
    }
  }, [signed, getCardbackground]);

  const requestToBeNerd = () => {};

  return (
    <div style={{ width: "100%", margin: "10px" }}>
      <div style={{ marginBottom: "10px" }}>{userObj?.displayName}</div>
      <button style={{ marginBottom: "10px" }} onClick={signOut}>
        Sair
      </button>
      <div style={{ marginBottom: "10px" }}>
        <a href="/matchmaking">Matchmaking</a>
      </div>
      {!isNerd && !isAnonymous && (
        <button style={{ marginBottom: "10px" }} onClick={requestToBeNerd}>
          request to be a nerd
        </button>
      )}
      {isAnonymous && (
        <div style={{ marginBottom: "10px" }}>
          To get the full experience log in and request to be a nerd
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "10px" }}>
        {players &&
          Object.keys(players).map((player) => (
            <PlayerDisplay
              name={player}
              ranks={players[player]}
              label={players[player].name}
              key={player}
              sx={{ margin: "4px", height: "300px" }}
            />
          ))}
      </div>
    </div>
  );
}
