import { CircularProgress, Tooltip } from "@mui/material";
import React from "react";
import useSingleMatchData from "./useSingleMatchData";
import {
  CHAMPIONICONURL,
  ITEMICONURL,
  baronLoseUrl,
  baronWinUrl,
  dragonLoseUrl,
  dragonWinUrl,
  summonerSpells,
  summonerSpellsUrl,
  turretLoseUrl,
  turretWinUrl,
} from "../../common-components/resources";
import {
  capitalizeFirstLetter,
  floatToPercentageString,
  formatNumber,
} from "../../utils/utils";
import { Link } from "react-router-dom";
import "./MatchComponent.css";

export const KDA = ({ kills, deaths, assists }) => (
  <div className="kda-container">
    <p>{kills}</p>
    <p>/</p>
    <p className="kda-deaths">{deaths}</p>
    <p>/</p>
    <p>{assists}</p>
  </div>
);

const BaronDragonTurretBans = ({ win, baron, dragon, turret }) => {
  const baronIcon = win ? baronWinUrl : baronLoseUrl;
  const dragonIcon = win ? dragonWinUrl : dragonLoseUrl;
  const turretIcon = win ? turretWinUrl : turretLoseUrl;
  return (
    <div className="team-objectives">
      <Tooltip title="Baron kills">
        <div className="objective-item">
          <img
            src={baronIcon}
            alt="baron"
            className="objective-icon"
            width={20}
          />
          <p>{baron}</p>
        </div>
      </Tooltip>
      <Tooltip title="Dragon kills">
        <div className="objective-item">
          <img
            src={dragonIcon}
            alt="dragon"
            className="objective-icon"
            width={20}
          />
          <p>{dragon}</p>
        </div>
      </Tooltip>
      <Tooltip title="Turrets destroyed">
        <div className="objective-item">
          <img
            src={turretIcon}
            alt="turret"
            className="objective-icon"
            width={20}
          />
          <p>{turret}</p>
        </div>
      </Tooltip>
    </div>
  );
};

const ItemsSection = ({ game }) => {
  const itemList = [
    game.stats.item0,
    game.stats.item1,
    game.stats.item2,
    game.stats.item3,
    game.stats.item4,
    game.stats.item5,
  ];
  const filteredList = itemList.filter((i) => i > 0);
  while (filteredList.length < 6) {
    filteredList.push(0);
  }

  return (
    <div className="items-container">
      {filteredList.map((item, i) => (
        <div className="item-slot" key={i}>
          {item > 0 && (
            <img
              src={`${ITEMICONURL}${item}.png`}
              alt={item}
              className="item-icon"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const PlayerRow = ({ player, role, totalKills }) => (
  <span className="player-row">
    {/* Champion + spells icons */}
    <div className="player-champion-container">
      <div className="champion-wrapper">
        <div className="champion-level">
          <p className="champion-level-text">{player.stats.champLevel}</p>
        </div>
        <div className="champion-icon-wrapper">
          <img
            src={`${CHAMPIONICONURL}${player.championId}.png`}
            width={70}
            height={70}
            alt={player.championName}
          />
        </div>
      </div>
      <div className="spells-container">
        <img
          src={summonerSpellsUrl[player.spell1Id]}
          alt={summonerSpells[player.spell1Id]}
          width={30}
          className="spell-icon"
        />
        <img
          src={summonerSpellsUrl[player.spell2Id]}
          alt={summonerSpells[player.spell2Id]}
          width={30}
          className="spell-icon-bottom"
        />
      </div>
    </div>

    {/* Name, KDA, Position */}
    <div className="player-info">
      <Link to={`/player/${player.identity.player.summonerId}`}>
        <p className="player-name">{player.identity.player.gameName}</p>
      </Link>

      <KDA
        kills={player.stats.kills}
        deaths={player.stats.deaths}
        assists={player.stats.assists}
      />
      <p className="player-role">{capitalizeFirstLetter(role)}</p>
    </div>

    {/* General information */}
    <div className="player-stats">
      <p>{`Lv ${player.stats.champLevel} | ${formatNumber(
        player.stats.goldEarned
      )} G`}</p>
      <p>
        {`${
          player.stats.totalMinionsKilled + player.stats.neutralMinionsKilled
        } CS | ${player.stats.visionScore} VS`}
      </p>
      <p>{`Kill participation: ${floatToPercentageString(
        (player.stats.kills + player.stats.assists) / totalKills
      )}`}</p>
    </div>

    {/* Itens */}
    <div>
      <ItemsSection game={player} />
    </div>
  </span>
);

const roles = {
  top: 1,
  jungle: 2,
  mid: 3,
  adc: 4,
  support: 5,
};

const TeamMatch = ({ team, matchRoles }) => (
  <div className="team-match-container">
    {/* primeira linha, Team 1: Victory ... KDA */}
    <div className="team-header">
      <div className="team-status-container">
        <div className="team-id">{`Team ${team.teamId / 100}: `}</div>
        {team.win ? (
          <div className="team-status-victory">Victory</div>
        ) : (
          <div className="team-status-defeat">Defeat</div>
        )}
      </div>
      <KDA
        kills={team.stats.kills}
        deaths={team.stats.deaths}
        assists={team.stats.assists}
      />
    </div>

    {/* segunda linha, dragões e bans */}
    <div className="team-stats-row">
      <BaronDragonTurretBans
        baron={team.teamStats.baronKills}
        dragon={team.teamStats.dragonKills}
        turret={team.teamStats.towerKills}
        win={team.teamId === 100}
      />
      <div className="bans-container">
        <p className="bans-label">bans: </p>
        {team.teamStats.bans
          .sort((a, b) => a.pickTurn - b.pickTurn)
          .map((champ, i) => (
            <div className="champion-ban" key={i}>
              <img
                src={`${CHAMPIONICONURL}${champ.championId}.png`}
                alt={champ.championId}
                className="champion-ban-img"
              />
            </div>
          ))}
      </div>
    </div>

    <div>
      {team.players
        .sort(
          (a, b) =>
            roles[matchRoles[a.identity.player.summonerId]] -
            roles[matchRoles[b.identity.player.summonerId]]
        )
        .map((p) => (
          <PlayerRow
            player={p}
            role={matchRoles[p.identity.player.summonerId]}
            totalKills={team.stats.kills}
            key={p.championId}
          />
        ))}
    </div>
  </div>
);

export default function MatchComponent({ matchData, matchRoles }) {
  const { blueTeam, redTeam } = useSingleMatchData(matchData);

  if (typeof matchData === "undefined" || typeof matchRoles === "undefined") {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="match-container">
      <div className="grid-container">
        <div className="grid-item">
          <TeamMatch team={blueTeam} matchRoles={matchRoles} />
        </div>
        <div className="grid-item grid-item-right">
          <TeamMatch team={redTeam} matchRoles={matchRoles} />
        </div>
      </div>
    </div>
  );
}
