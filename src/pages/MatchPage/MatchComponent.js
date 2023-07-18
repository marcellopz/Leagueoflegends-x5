import { CircularProgress, Grid, Tooltip } from "@mui/material";
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

export const KDA = ({ kills, deaths, assists }) => (
  <div className="self-center flex gap-2 text-gray-300 justify-center">
    <p>{kills}</p>
    <p>/</p>
    <p className="text-red-600">{deaths}</p>
    <p>/</p>
    <p>{assists}</p>
  </div>
);

const BaronDragonTurretBans = ({ win, baron, dragon, turret }) => {
  const baronIcon = win ? baronWinUrl : baronLoseUrl;
  const dragonIcon = win ? dragonWinUrl : dragonLoseUrl;
  const turretIcon = win ? turretWinUrl : turretLoseUrl;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Tooltip title="Baron kills">
        <div style={{ display: "flex", marginRight: "12px" }}>
          <img
            src={baronIcon}
            alt="baron"
            style={{ marginRight: "8px" }}
            width={20}
          />
          <p>{baron}</p>
        </div>
      </Tooltip>
      <Tooltip title="Dragon kills">
        <div style={{ display: "flex", marginRight: "12px" }}>
          <img
            src={dragonIcon}
            alt="dragon"
            style={{ marginRight: "8px" }}
            width={20}
          />
          <p>{dragon}</p>
        </div>
      </Tooltip>
      <Tooltip title="Turrets destroyed">
        <div style={{ display: "flex", marginRight: "12px" }}>
          <img
            src={turretIcon}
            alt="turret"
            style={{ marginRight: "8px" }}
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
    <div
      style={{
        display: "flex",
        width: "130px",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "4px",
      }}
    >
      {filteredList.map((item, i) => (
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            width: "35px",
            height: "35px",
            borderRadius: "3px",
            marginRight: "2px",
          }}
          key={i}
        >
          {item > 0 && (
            <img
              src={`${ITEMICONURL}${item}.png`}
              alt={item}
              style={{
                margin: "2px",
              }}
              width="31px"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const PlayerRow = ({ player, role, totalKills }) => (
  <span
    className="flex items-center p-2 flex-wrap justify-between"
    style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
  >
    {/* Champion + spells icons */}
    <div className="flex">
      <div className="relative">
        <div
          style={{
            position: "absolute",
            bottom: "2px",
            right: "7px",
            padding: "2px",
            borderRadius: "5px",
            background: "rgba(0,0,0,0.6)",
            zIndex: 10,
          }}
        >
          <p className="text-xs">{player.stats.champLevel}</p>
        </div>
        <div
          style={{
            overflow: "hidden",
            marginLeft: "5px",
            marginRight: "5px",
          }}
        >
          <img
            src={`${CHAMPIONICONURL}${player.championId}.png`}
            width={70}
            height={70}
            alt={player.championName}
          />
        </div>
      </div>
      <div style={{ marginLeft: "5px" }}>
        <img
          src={summonerSpellsUrl[player.spell1Id]}
          alt={summonerSpells[player.spell1Id]}
          width={30}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <img
          src={summonerSpellsUrl[player.spell2Id]}
          alt={summonerSpells[player.spell2Id]}
          width={30}
          style={{ display: "block" }}
        />
      </div>
    </div>

    {/* Name, KDA, Position */}
    <div className="w-36 text-center">
      <Link to={`/player/${player.identity.player.summonerId}`}>
        <p
          style={{
            fontSize: "16px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {player.identity.player.summonerName}
        </p>
      </Link>

      <KDA
        kills={player.stats.kills}
        deaths={player.stats.deaths}
        assists={player.stats.assists}
      />
      <p className="opacity-50" style={{ fontSize: "14px" }}>
        {capitalizeFirstLetter(role)}
      </p>
    </div>

    {/* General information */}
    <div className="w-40 text-center" style={{ fontSize: "14px" }}>
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
  <div className="text-xl">
    {/* primeira linha, Team 1: Victory ... KDA */}
    <div className="flex justify-between p-2">
      <div className="flex">
        <div className="mr-2">{`Team ${team.teamId / 100}: `}</div>
        {team.win ? (
          <div className="self-center" style={{ color: "rgb(85,255,75)" }}>
            Victory
          </div>
        ) : (
          <div className="self-center" style={{ color: "rgb(255,75,75)" }}>
            Defeat
          </div>
        )}
      </div>
      <KDA
        kills={team.stats.kills}
        deaths={team.stats.deaths}
        assists={team.stats.assists}
      />
    </div>

    {/* segunda linha, dragões e bans */}
    <div
      className="p-2 px-4 flex justify-between flex-wrap gap-2"
      style={{ background: "rgba(255,255,255,0.1)" }}
    >
      <BaronDragonTurretBans
        baron={team.teamStats.baronKills}
        dragon={team.teamStats.dragonKills}
        turret={team.teamStats.towerKills}
        win={team.teamId === 100}
      />
      <div className="flex gap-1 self-end">
        <p className="self-center opacity-30 text-lg mr-2">bans: </p>
        {team.teamStats.bans
          .sort((a, b) => a.pickTurn - b.pickTurn)
          .map((champ, i) => (
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                width: "40px",
                height: "40px",
                borderRadius: "3px",
                marginRight: "2px",
              }}
              key={i}
            >
              <img
                src={`${CHAMPIONICONURL}${champ.championId}.png`}
                alt={champ.championId}
                style={{
                  margin: "2px",
                }}
                width="36px"
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
      <div style={{ display: "flex" }}>
        <div style={{ margin: "auto" }}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ marginTop: "10px", border: "1px solid rgba(255,255,255,0.5)" }}
    >
      <Grid container>
        <Grid item xs={12} lg={6}>
          <TeamMatch team={blueTeam} matchRoles={matchRoles} />
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            borderLeft: {
              lg: "1px solid rgba(255,255,255,0.5)",
              xs: "1px transparent",
            },
            borderTop: {
              lg: "1px transparent",
              xs: "1px solid rgba(255,255,255,0.5)",
            },
          }}
        >
          <TeamMatch team={redTeam} matchRoles={matchRoles} />
        </Grid>
      </Grid>
    </div>
  );
}
