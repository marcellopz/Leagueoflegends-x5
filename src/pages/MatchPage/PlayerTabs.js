import React, { useState } from "react";
import { CHAMPIONICONURL } from "../../common-components/resources";
import { formatNumber } from "../../utils/utils";
import { Link } from "react-router-dom";
import "./PlayerTabs.css";

const Tab = ({ setTabState, tabState, n, champId }) => (
  <div
    className={`pt-tab ${tabState === n ? "pt-tab-active" : "pt-tab-inactive"}`}
    onClick={() => setTabState(n)}
  >
    <div className="pt-tab-content">
      <img
        src={`${CHAMPIONICONURL}${champId}.png`}
        width={40}
        height={40}
        alt={champId}
      />
    </div>
  </div>
);

const StatBox = ({ number, text }) => (
  <div className="pt-stat-box">
    <p className="pt-stat-number">{formatNumber(number)}</p>
    <p className="pt-stat-text">{text}</p>
  </div>
);

export default function PlayerTabs({ matchData }) {
  const [tabState, setTabState] = useState(0);
  const curr_p = matchData.participants[tabState];

  return (
    <div className="pt-container">
      <div className="pt-tabs-row">
        {matchData.participants.map((p, i) => (
          <Tab
            champId={p.championId}
            n={i}
            setTabState={setTabState}
            tabState={tabState}
            key={i}
          />
        ))}
      </div>
      <div>
        <Link to={`/player/${curr_p.identity.player.summonerId}`}>
          <p className="pt-player-name">
            {curr_p.identity.player.summonerName}
          </p>
        </Link>

        <div className="pt-stats-container">
          <StatBox
            number={(
              (curr_p.stats.kills + curr_p.stats.assists) /
              curr_p.stats.deaths
            ).toFixed(2)}
            text="KDA"
          />
          <StatBox number={curr_p.stats.doubleKills} text="Double Kills" />
          <StatBox number={curr_p.stats.tripleKills} text="Triple Kills" />
          <StatBox number={curr_p.stats.quadraKills} text="Quadra Kills" />
          <StatBox number={curr_p.stats.pentaKills} text="Penta Kills" />
          <StatBox
            number={(
              curr_p.stats.totalDamageDealtToChampions / curr_p.stats.kills
            ).toFixed(2)}
            text="Damage per kill"
          />
          <StatBox
            number={curr_p.stats.totalDamageDealtToChampions}
            text="Damage to champions"
          />
          <StatBox
            number={curr_p.stats.damageDealtToTurrets}
            text="Damage to turrets"
          />
          <StatBox
            number={curr_p.stats.largestKillingSpree}
            text="Largest Killing Spree"
          />
          <StatBox number={curr_p.stats.goldEarned} text="Gold earned" />
          <StatBox number={curr_p.stats.wardsKilled} text="Wards destroyed" />
          <StatBox number={curr_p.stats.wardsPlaced} text="Wards Placed" />
          <StatBox number={curr_p.stats.visionScore} text="Vision Score" />
          <StatBox
            number={curr_p.stats.visionWardsBoughtInGame}
            text="Vision Wards Bought"
          />
          <StatBox number={curr_p.stats.totalHeal} text="Total Healing" />
          <StatBox
            number={curr_p.stats.totalDamageTaken}
            text="Total Damage Taken"
          />
        </div>
      </div>
    </div>
  );
}
