import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { getPlayer } from "../../services/firebaseDatabase";
import { MiscContext } from "../../contexts/miscContext";
import CardDisplay from "../../common-components/CardDisplay/CardDisplay";

export default function Home() {
  const { signed, isAnonymous } = useContext(AuthContext);
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

  return (
    <div
      style={{
        width: "100%",
        // height: "100vh",
        paddingTop: "50px",
      }}
    >
      {isAnonymous && (
        <div style={{ marginBottom: "10px" }}>
          To get the full experience log in and request to be a nerd
        </div>
      )}
      <CardDisplay players={players} />
    </div>
  );
}
