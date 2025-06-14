import React, { useMemo } from "react";
import { floatToPercentageString } from "../../../utils/utils";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { Typography } from "@mui/material";
import { CHAMPIONICONURL } from "../../../common-components/resources";
import "./SummaryLastGames.css";

export default function SummaryLastGames({ games }) {
  const wins = useMemo(
    () =>
      games.reduce((accumulator, game) => {
        return accumulator + game.stats.win;
      }, 0),
    [games]
  );

  const winRate = wins / games.length;
  const losses = games.length - wins;

  const kills = useMemo(
    () =>
      games.reduce((accumulator, game) => {
        return accumulator + game.stats.kills;
      }, 0),
    [games]
  );

  const deaths = useMemo(
    () =>
      games.reduce((accumulator, game) => {
        return accumulator + game.stats.deaths;
      }, 0),
    [games]
  );

  const assists = useMemo(
    () =>
      games.reduce((accumulator, game) => {
        return accumulator + game.stats.assists;
      }, 0),
    [games]
  );

  const gameGroupsPerChamp = useMemo(() => {
    const groups = {};

    games.forEach((game) => {
      const fieldValue = game.championName;

      if (groups.hasOwnProperty(fieldValue)) {
        groups[fieldValue].push(game);
      } else {
        groups[fieldValue] = [game];
      }
    });
    let arr = Object.values(groups);
    arr.sort((a, b) => b.length - a.length);

    return arr;
  }, [games]);

  if (games.length === 0 || !games) {
    return null;
  }

  const getAvg = (a) => (a / games.length).toFixed(1);

  return (
    <div className="slg-container">
      <div className="slg-header">
        <Typography>{`Stats of last ${games.length} games:`}</Typography>
      </div>

      <div className="slg-content">
        <div className="slg-stats-section">
          <div className="slg-stats-row">
            <CircularProgressWithLabel
              value={winRate}
              size={100}
              label={floatToPercentageString(winRate)}
              labelFontSize={20}
            />
            <div className="slg-stats-details">
              <Typography className="slg-stats-text">{`${games.length}G ${wins}W ${losses}L`}</Typography>
              <Typography className="slg-stats-text">{`${getAvg(
                kills
              )} / ${getAvg(deaths)} / ${getAvg(assists)}`}</Typography>
              <Typography className="slg-kda-text">{`${(
                (kills + assists) /
                deaths
              ).toFixed(2)}:1 KDA`}</Typography>
            </div>
          </div>
        </div>

        <div className="slg-champions-section">
          <div className="slg-champions-grid">
            {gameGroupsPerChamp.slice(0, 6).map((champ) => {
              const champId = champ[0].championId;
              const n = champ.length;
              let champWins = 0;
              // let champKills = 0;
              // let champDeaths = 0;
              // let champAssists = 0;
              champ.forEach((match) => {
                // champKills += match.stats.kills;
                // champDeaths += match.stats.deaths;
                // champAssists += match.stats.assists;
                champWins += match.stats.win;
              });
              return (
                <div key={champId} className="slg-champion-item">
                  <div className="slg-champion-icon-container">
                    <img
                      src={`${CHAMPIONICONURL}${champId}.png`}
                      alt={champId}
                      className="slg-champion-icon"
                    />
                  </div>
                  <div className="slg-champion-stats">
                    <Typography
                      className={`slg-winrate ${
                        champWins / n > 0.6
                          ? "slg-winrate-high"
                          : "slg-winrate-normal"
                      }`}
                    >
                      {floatToPercentageString(champWins / n)}
                    </Typography>
                    <Typography className="slg-record">{`${champWins}W ${
                      n - champWins
                    }L`}</Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
