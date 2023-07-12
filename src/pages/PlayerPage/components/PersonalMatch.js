import React from "react";
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
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

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
        width: "150px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {filteredList.map((item, i) => (
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            width: "44px",
            height: "44px",
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
              width="40px"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const TeamSection = ({ players, playerId }) => {
  const blueTeam = players.filter((p) => p.teamId === 100);
  const redTeam = players.filter((p) => p.teamId === 200);
  return (
    <div style={{ display: "flex", fontSize: 10, margin: "5px" }}>
      <div style={{ width: "120px", marginRight: "5px" }}>
        {blueTeam.map((p, i) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            key={i}
          >
            <img
              src={`${CHAMPIONICONURL}${p.championId}.png`}
              width="20px"
              style={{ margin: "1px" }}
              alt={p.championId}
            />
            <Link
              to={`/player/${p.summonerId}`}
              style={{
                // width: "100px",
                marginLeft: "2px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontWeight: p.summonerId === playerId ? "bold" : "normal",
              }}
              title={p.summonerName}
            >
              {p.summonerName}
            </Link>
          </div>
        ))}
      </div>
      <div style={{ width: "120px" }}>
        {redTeam.map((p, i) => (
          <div style={{ display: "flex", alignItems: "center" }} key={i}>
            <img
              src={`${CHAMPIONICONURL}${p.championId}.png`}
              width="20px"
              style={{ margin: "1px" }}
              alt={p.championId}
            />
            <Link
              to={`/player/${p.summonerId}`}
              style={{
                width: "100px",
                marginLeft: "2px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontWeight: p.summonerId === playerId ? "bold" : "normal",
              }}
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
  if (largestMultiKill > 1) {
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
      <div style={{ display: "flex", marginTop: "5px" }}>
        <Tooltip title={`Killing spree: ${largestKillingSpree}`}>
          <Chip
            label={text}
            size="small"
            variant="outlined"
            sx={{ margin: "auto" }}
          />
        </Tooltip>
      </div>
    );
  }
};

export default function PersonalMatch({ game, gameId }) {
  const colorWin = "rgba(0,60,120,0.4)";
  const colorLose = "rgba(140,0,0,0.4)";
  return (
    <div
      style={{
        minHeight: "140px",
        background: game.stats.win ? colorWin : colorLose,
        borderRadius: "5px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          paddingLeft: "10px",
          paddingRight: "10px",
          height: "24px",
          fontSize: "14px",
          verticalAlign: "center",
          color: "rgba(255,255,255,0.7)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {`${timeSince(
            new Date(game.date)
          )} - ${convertSecondsToMinutesAndSeconds(game.gameDuration)}`}
        </div>
        <div>{game.stats.win ? "Victory" : "Defeat"}</div>
      </div>
      <div
        style={{
          alignItems: "center",
          minHeight: "116px",
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "space-evenly",
          gap: "5px",
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

        <div style={{ width: "100px" }}>
          <div
            style={{
              fontSize: 20,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {`${game.stats.kills} / ${game.stats.deaths} / ${game.stats.assists}`}
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
          <MultiKillChips
            largestKillingSpree={game.stats.largestKillingSpree}
            largestMultiKill={game.stats.largestMultiKill}
          />
        </div>

        {/* <div
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
        </div> */}
        <ItemsSection game={game} />
        <TeamSection players={game.participants} playerId={game.summonerId} />
        <Link
          to={`/match/${gameId}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton>
            <ArrowRight />
          </IconButton>
          <div>Details</div>
        </Link>
      </div>
    </div>
  );
}
