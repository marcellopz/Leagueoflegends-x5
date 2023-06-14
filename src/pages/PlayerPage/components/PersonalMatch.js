import React from "react";
import {
  convertSecondsToMinutesAndSeconds,
  timeSince,
} from "../../../utils/utils";
import {
  CHAMPIONICONURL,
  summonerSpells,
  summonerSpellsUrl,
} from "../../../common-components/resources";

export default function PersonalMatch({ game }) {
  console.log(game);
  const colorWin = "rgba(0,60,120,0.4)";
  const colorLose = "rgba(140,0,0,0.4)";
  return (
    <div
      style={{
        height: "120px",
        background: game.stats.win ? colorWin : colorLose,
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          paddingLeft: "10px",
          height: "24px",
          fontSize: "14px",
          verticalAlign: "center",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {`${timeSince(
          new Date(game.date)
        )} - ${convertSecondsToMinutesAndSeconds(game.gameDuration)}`}
      </div>
      <div
        style={{
          alignItems: "center",
          height: "96px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              overflow: "hidden",
              borderRadius: "10px",
              marginLeft: "10px",
            }}
          >
            <img
              src={`${CHAMPIONICONURL}${game.championId}.png`}
              width={"80px"}
              alt={game.championName}
            />
          </div>
          <div style={{ marginLeft: "10px" }}>
            <img
              src={summonerSpellsUrl[game.spellsIds[0]]}
              alt={summonerSpells[game.spellsIds[0]]}
              width={35}
              style={{ display: "block", marginBottom: "10px" }}
            />
            <img
              src={summonerSpellsUrl[game.spellsIds[1]]}
              alt={summonerSpells[game.spellsIds[1]]}
              width={35}
              style={{ display: "block" }}
            />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", fontSize: 20, textAlign: "center" }}>
            <div>{game.stats.kills}</div>
            <div style={{ marginLeft: "5px", marginRight: "5px" }}>/</div>
            <div>{game.stats.deaths}</div>
            <div style={{ marginLeft: "5px", marginRight: "5px" }}>/</div>
            <div>{game.stats.assists}</div>
          </div>
          <div
            style={{
              fontSize: 15,
              textAlign: "center",
              color: "rgba(255,255,255,0.5)",
            }}
          >{`${(
            (game.stats.kills + game.stats.assists) /
            game.stats.deaths
          ).toFixed(2)} KDA`}</div>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div>{`${game.stats.totalDamageDealtToChampions.toLocaleString(
            "en-US"
          )} DMG`}</div>
          <div>{`${game.stats.goldEarned.toLocaleString("en-US")} Gold`}</div>
          <div>{`${(
            (game.stats.kills + game.stats.assists) /
            game.stats.deaths
          ).toFixed(2)} KDA`}</div>
        </div>
        <div>itens</div>
      </div>
    </div>
  );
}
