import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import { getPlayer, getPlayerInfo } from "../../services/firebaseDatabase";
import { floatToPercentageString, isObjEmpty } from "../../utils/utils";
import CardComponent from "../../common-components/CardDisplay/CardComponent";
import { Typography } from "@mui/material";

export default function PlayerPage() {
  const { player } = useParams();
  const [playerInfo, setPlayerInfo] = useState({});
  const [playerCardStats, setPlayerCardStats] = useState({});
  const [selectedPlayerCardStats, setSelectedPlayerCardStats] = useState({});
  const [playerKey, setPlayerKey] = useState("");
  const [champs, setChamps] = useState([]);

  let champs_ = [];

  useEffect(() => {
    (async () => {
      const _playerInfo = await getPlayerInfo(player);
      setPlayerInfo(_playerInfo);
    })();
    (async () => {
      const _playerCardStats = await getPlayer("");
      setPlayerCardStats(_playerCardStats);
    })();
  }, [player]);

  useEffect(() => {
    if (isObjEmpty(playerCardStats)) {
      return;
    }
    Object.keys(playerCardStats).forEach((key) => {
      if (playerCardStats[key].account_id === +player) {
        setSelectedPlayerCardStats(playerCardStats[key]);
        setPlayerKey(key);
      }
    });
    champs_ = Object.values(playerInfo.championStats);
    champs_.sort((a, b) => b.numberOfMatches - a.numberOfMatches);
    setChamps(champs_);
  }, [playerCardStats, playerInfo]);

  return (
    <X5pageContentArea loading={false}>
      <div style={{ width: "100%", display: "flex" }}>
        <CardComponent
          name={playerKey}
          ranks={selectedPlayerCardStats}
          label={selectedPlayerCardStats.name}
          sx={{ marginLeft: "20px", height: "300px" }}
        />
        <div style={{ margin: "20px" }}>
          <Typography sx={{ fontSize: 25, marginBottom: "10px" }}>
            {playerInfo.summonerName}
          </Typography>
          <Typography>
            {`Number of matches: ${playerInfo.numberOfMatches}`}
          </Typography>
          <Typography>{`Win rate: ${floatToPercentageString(
            playerInfo.winRate
          )}`}</Typography>
        </div>
        <div>
          {champs.map((champ) => (
            <div key={champ.championName}>{champ.championName}</div>
          ))}
        </div>
      </div>
    </X5pageContentArea>
  );
}
