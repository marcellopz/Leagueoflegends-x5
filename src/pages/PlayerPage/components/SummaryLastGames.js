import React, { useMemo } from "react";
import { floatToPercentageString } from "../../../utils/utils";
import { theme } from "../../../theme";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { Typography } from "@mui/material";
import { CHAMPIONICONURL } from "../../../common-components/resources";

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
    <div
      style={{
        background: theme.palette.background.paper,
        borderRadius: "5px",
        boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ padding: "10px 20px" }}>
        <Typography>{`Stats of last ${games.length} games:`}</Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          paddingBottom: "15px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <div style={{ margin: "auto 0" }}>
          <div style={{ display: "flex" }}>
            <CircularProgressWithLabel
              value={winRate}
              size={100}
              label={floatToPercentageString(winRate)}
              labelFontSize={20}
            />
            <div style={{ marginLeft: "15px" }}>
              <Typography
                fontSize={15}
                color="rgba(255,255,255,0.6)"
              >{`${games.length}G ${wins}W ${losses}L`}</Typography>
              <Typography
                fontSize={15}
                color="rgba(255,255,255,0.6)"
              >{`${getAvg(kills)} / ${getAvg(deaths)} / ${getAvg(
                assists
              )}`}</Typography>
              <Typography fontSize={25} fontWeight={600} marginTop={"5px"}>{`${(
                (kills + assists) /
                deaths
              ).toFixed(2)}:1 KDA`}</Typography>
            </div>
          </div>
        </div>

        <div style={{ margin: "auto 0" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "120px",
              flexWrap: "wrap",
              width: "300px",
            }}
          >
            {gameGroupsPerChamp.slice(0, 6).map((champ) => {
              const champId = champ[0].championId;
              const n = champ.length;
              let champWins = 0;
              let champKills = 0;
              let champDeaths = 0;
              let champAssists = 0;
              champ.forEach((match) => {
                champKills += match.stats.kills;
                champDeaths += match.stats.deaths;
                champAssists += match.stats.assists;
                champWins += match.stats.win;
              });
              return (
                <div
                  key={champId}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    margin: "5px 10px",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      overflow: "hidden",
                      borderRadius: "15px",
                    }}
                  >
                    <img
                      src={`${CHAMPIONICONURL}${champId}.png`}
                      alt={champId}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <Typography
                      width={"50px"}
                      textAlign="center"
                      color={
                        champWins / n > 0.6
                          ? "rgba(255,128,144,0.9)"
                          : "rgba(255,255,255,0.6)"
                      }
                      fontWeight={500}
                    >
                      {floatToPercentageString(champWins / n)}
                    </Typography>
                    <Typography
                      color={"rgba(255,255,255,0.6)"}
                    >{`${champWins}W ${n - champWins}L`}</Typography>
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
