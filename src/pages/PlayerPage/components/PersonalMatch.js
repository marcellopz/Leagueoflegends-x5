import React, { useEffect, useState } from "react";
import {
  convertSecondsToMinutesAndSeconds,
  timeSince,
} from "../../../utils/utils";
import {
  CHAMPIONICONURL,
  ITEMICONURL,
  summonerSpells,
  summonerSpellsUrl,
} from "../../../common-components/resources";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
import { ArrowRight } from "@mui/icons-material";
import { getMatchRoles } from "../../../services/firebaseDatabase";
import "./PersonalMatch.css";

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
    <div className="pm-items-container">
      {filteredList.map((item, i) => (
        <div className="pm-item-box" key={i}>
          {item > 0 && (
            <img
              src={`${ITEMICONURL}${item}.png`}
              alt={item}
              className="pm-item-image"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const roles = {
  top: 1,
  jungle: 2,
  mid: 3,
  adc: 4,
  support: 5,
};

const TeamSection = ({ players, playerId, matchRoles }) => {
  const blueTeam = players
    .filter((p) => p.teamId === 100)
    .sort(
      (a, b) =>
        roles[matchRoles[a.summonerId]] - roles[matchRoles[b.summonerId]]
    );
  const redTeam = players
    .filter((p) => p.teamId === 200)
    .sort(
      (a, b) =>
        roles[matchRoles[a.summonerId]] - roles[matchRoles[b.summonerId]]
    );
  return (
    <div className="pm-teams-container">
      <div className="pm-team pm-blue-team">
        {blueTeam.map((p, i) => (
          <div className="pm-player-row" key={i}>
            <img
              src={`${CHAMPIONICONURL}${p.championId}.png`}
              className="pm-player-champion"
              alt={p.championId}
            />
            <Link
              to={`/player/${p.summonerId}`}
              className={`pm-player-name ${
                p.summonerId === playerId ? "pm-player-highlighted" : ""
              }`}
              title={p.summonerName}
            >
              {p.summonerName}
            </Link>
          </div>
        ))}
      </div>
      <div className="pm-team">
        {redTeam.map((p, i) => (
          <div className="pm-player-row" key={i}>
            <img
              src={`${CHAMPIONICONURL}${p.championId}.png`}
              className="pm-player-champion"
              alt={p.championId}
            />
            <Link
              to={`/player/${p.summonerId}`}
              className={`pm-player-name pm-player-name-red ${
                p.summonerId === playerId ? "pm-player-highlighted" : ""
              }`}
              title={p.summonerName}
            >
              {p.summonerName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const MultiKillChips = ({ largestKillingSpree, largestMultiKill }) => {
  let text = "";
  switch (largestMultiKill) {
    case 2:
      text = "Double kill";
      break;
    case 3:
      text = "Triple kill";
      break;
    case 4:
      text = "Quadra kill";
      break;
    case 5:
      text = "Penta kill";
      break;
    default:
      text = "";
  }
  return (
    <div className="pm-multikill-container">
      {text && (
        <Chip
          label={text}
          size="small"
          variant="filled"
          sx={{ margin: "auto" }}
        />
      )}
      {largestKillingSpree > 0 && (
        <Chip
          label={`Killing spree: ${largestKillingSpree}`}
          size="small"
          variant="filled"
          sx={{ margin: "auto" }}
        />
      )}
    </div>
  );
};

export default function PersonalMatch({ game, gameId }) {
  const [matchRoles, setMatchRoles] = useState({});

  useEffect(() => {
    getMatchRoles(gameId).then((r) => setMatchRoles(r));
    return () => {};
  }, [gameId]);

  return (
    <div className={`pm-container ${game.stats.win ? "pm-win" : "pm-lose"}`}>
      <div className="pm-header">
        <div>
          {`${matchRoles[game.summonerId]?.toUpperCase?.() ?? ""} - ${timeSince(
            new Date(game.date)
          )} - ${convertSecondsToMinutesAndSeconds(game.gameDuration)}`}
        </div>
        <div>{game.stats.win ? "Victory" : "Defeat"}</div>
      </div>
      <div className="pm-content">
        <div className="pm-champion-section">
          <div className="pm-champion-icon-container">
            <img
              src={`${CHAMPIONICONURL}${game.championId}.png`}
              className="pm-champion-icon"
              alt={game.championName}
            />
          </div>
          <div className="pm-spells-container">
            <img
              src={summonerSpellsUrl[game.spellsIds[0]]}
              alt={summonerSpells[game.spellsIds[0]]}
              className="pm-spell pm-spell-top"
            />
            <img
              src={summonerSpellsUrl[game.spellsIds[1]]}
              alt={summonerSpells[game.spellsIds[1]]}
              className="pm-spell"
            />
          </div>
        </div>

        <div className="pm-stats-container">
          <div className="pm-kda">
            {`${game.stats.kills} / ${game.stats.deaths} / ${game.stats.assists}`}
          </div>
          <div className="pm-kda-ratio">{`${(
            (game.stats.kills + game.stats.assists) /
            game.stats.deaths
          ).toFixed(2)} KDA`}</div>
          <MultiKillChips
            largestKillingSpree={game.stats.largestKillingSpree}
            largestMultiKill={game.stats.largestMultiKill}
          />
        </div>

        <ItemsSection game={game} />
        <TeamSection
          players={game.participants}
          playerId={game.summonerId}
          matchRoles={matchRoles}
        />
        <Link
          to={`/match/${gameId}`}
          className="pm-details-link"
          title="View match details"
        >
          <ArrowRight fontSize="small" />
        </Link>
      </div>
    </div>
  );
}
