import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import { getPlayer, getPlayerInfo } from "../../services/firebaseDatabase";
import { isObjEmpty } from "../../utils/utils";
import PlayerBanner from "./PlayerBanner";
import PlayerSummaryTab from "./PlayerSummaryTab";
import PlayerChampionsTab from "./PlayerChampionsTab";
import PlayerStatsTab from "./PlayerStatsTab";
import PlayerRecordsTab from "./PlayerRecordsTab";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {children}
    </div>
  );
}

export default function PlayerPage() {
  const { player } = useParams();
  const [playerInfo, setPlayerInfo] = useState({});
  const [playerCardStats, setPlayerCardStats] = useState({});
  const [selectedPlayerCardStats, setSelectedPlayerCardStats] = useState({});
  const [playerKey, setPlayerKey] = useState("");
  const [champs, setChamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

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

    let champs_ = [];
    champs_ = Object.values(playerInfo.championStats);
    champs_.sort((a, b) => b.numberOfMatches - a.numberOfMatches);
    setChamps(champs_);
    setLoading(false);
  }, [playerCardStats, playerInfo, player]);

  return (
    <X5pageContentArea loading={loading} removeMarginTop>
      <PlayerBanner
        champs={champs}
        playerInfo={playerInfo}
        playerKey={playerKey}
        selectedPlayerCardStats={selectedPlayerCardStats}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <TabPanel index={0} value={selectedTab}>
        <PlayerSummaryTab
          champs={champs}
          playerInfo={playerInfo}
          playerKey={playerKey}
          selectedPlayerCardStats={selectedPlayerCardStats}
        />
      </TabPanel>

      <TabPanel index={1} value={selectedTab}>
        <PlayerChampionsTab champs={champs} />
      </TabPanel>

      <TabPanel index={2} value={selectedTab}>
        <PlayerStatsTab
          champs={champs}
          playerInfo={playerInfo}
          playerKey={playerKey}
          selectedPlayerCardStats={selectedPlayerCardStats}
        />
      </TabPanel>

      <TabPanel index={3} value={selectedTab}>
        <PlayerRecordsTab
          champs={champs}
          playerInfo={playerInfo}
          playerKey={playerKey}
          selectedPlayerCardStats={selectedPlayerCardStats}
        />
      </TabPanel>
    </X5pageContentArea>
  );
}
