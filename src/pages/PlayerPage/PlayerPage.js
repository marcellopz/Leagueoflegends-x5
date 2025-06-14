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
import "./PlayerPage.css";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} className="pp-tabpanel">
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
        setPlayerKey(player);
      });
    }
  }, [player, navigate]);

  useEffect(() => {
    if (!playerKey) {
      return;
    }
    getPlayer(playerKey)
      .then((r) => {
        setSelectedPlayerCardStats(r);
        if (r === null) {
          return getPlayerInfo(playerKey);
        }
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
      .finally(() => {
        setLoading(false);
      });
  }, [playerKey]);

  if (playerInfo === null) {
    return (
      <div className="pp-container">
        <div className="pp-no-data">No player data</div>
      </div>
    );
  }

  return (
    <X5pageContentArea loading={loading} removeMarginTop>
      <div className="pp-container">
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
      </div>
    </X5pageContentArea>
  );
}
