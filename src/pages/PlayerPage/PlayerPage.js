import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import {
  getPlayer,
  getPlayerInfo,
  getPlayerPairs,
  getPlayerSummaryList,
} from "../../services/firebaseDatabase";
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
  const [playerPairs, setPlayerPairs] = useState({});
  const [selectedPlayerCardStats, setSelectedPlayerCardStats] = useState({});
  const [playerKey, setPlayerKey] = useState("");
  const [champs, setChamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [playerSummary, setPlayerSummary] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(player)) {
      // "player" is name, not a number
      setPlayerKey(player);
    } else {
      getPlayer("").then((ps) => {
        // "player" is a number
        for (const [key, value] of Object.entries(ps)) {
          if (value.account_id === +player) {
            navigate("/player/" + key);
            return;
          }
        }
        setPlayerKey("error");
      });
    }
  }, [player]);

  useEffect(() => {
    if (!playerKey) {
      return;
    }
    getPlayer(playerKey)
      .then((r) => {
        setSelectedPlayerCardStats(r);
        return getPlayerInfo(r.account_id);
      })
      .then((info) => {
        setPlayerInfo(info);
        let champs_ = [];
        champs_ = Object.values(info.championStats);
        champs_.sort((a, b) => b.numberOfMatches - a.numberOfMatches);
        setChamps(champs_);
        return getPlayerPairs(info.summonerId);
      })
      .then((ps) => {
        setPlayerPairs(ps);
        return getPlayerSummaryList();
      })
      .then((psl) => setPlayerSummary(psl))
      .then(() => {
        setLoading(false);
      });
  }, [playerKey]);

  if (selectedPlayerCardStats === null) {
    return <div>player not found</div>;
  }

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
        <PlayerSummaryTab champs={champs} playerInfo={playerInfo} />
      </TabPanel>

      <TabPanel index={1} value={selectedTab}>
        <PlayerChampionsTab champs={champs} />
      </TabPanel>

      <TabPanel index={2} value={selectedTab}>
        <PlayerStatsTab
          playerInfo={playerInfo}
          playerPairs={playerPairs}
          playerSummary={playerSummary}
        />
      </TabPanel>

      <TabPanel index={3} value={selectedTab}>
        <PlayerRecordsTab records={playerInfo.records} />
      </TabPanel>
    </X5pageContentArea>
  );
}
