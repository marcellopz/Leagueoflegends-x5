import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { getPlayer } from "../../services/firebaseDatabase";
import { MiscContext } from "../../contexts/miscContext";
import CardDisplay from "../../common-components/CardDisplay/CardDisplay";
import X5pageContentArea from "../../common-components/X5pageContentArea";

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
    <X5pageContentArea>
      {isAnonymous && (
        <div style={{ marginBottom: "10px" }}>
          To get the full experience log in and request to be a nerd
        </div>
      )}
      <CardDisplay players={players} />
    </X5pageContentArea>
  );
}
