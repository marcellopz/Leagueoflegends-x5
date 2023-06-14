import { Tooltip, Typography } from "@mui/material";
import {
  CHAMPIONICONURL,
  summonerSpells,
  summonerSpellsUrl,
} from "../../../common-components/resources";
import { ITEMICONURL } from "../../../common-components/resources";
import { Link } from "react-router-dom";

const ItemsSection = ({ player }) => {
  const itemList = [
    player.stats.item0,
    player.stats.item1,
    player.stats.item2,
    player.stats.item3,
    player.stats.item4,
    player.stats.item5,
  ];
  const filteredList = itemList.filter((i) => i > 0);
  while (filteredList.length < 6) {
    filteredList.push(0);
  }

  return (
    <div style={{ display: "flex", marginRight: "20px" }}>
      {filteredList.map((item, i) => (
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            width: "34px",
            height: "34px",
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
              width="30px"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const ProgressBar = ({
  value,
  maxValue,
  tooltip,
  color = "rgba(255,255,255,0.7)",
}) => {
  const progressPercentage = (value / maxValue) * 100;

  // eslint-disable-next-line
  String.prototype.format = function () {
    let formatted = this;
    for (let i = 0; i < arguments.length; i++) {
      let regexp = new RegExp("\\{" + i + "\\}", "gi");
      formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
  };

  return (
    <Tooltip
      title={
        <div>
          {tooltip
            .format(value, maxValue)
            .split("\\n")
            .map((line) => (
              <div key={line}>{line}</div>
            ))}
        </div>
      }
      arrow
    >
      <div style={{ height: "100%", marginLeft: "20px" }}>
        <div style={{ padding: "5px 0" }}>
          <Typography style={{ textAlign: "center", fontSize: "12px" }}>
            {value}
          </Typography>
          <div
            style={{
              width: "60px",
              height: "8px",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                backgroundColor: color,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Tooltip>
  );
};

const PlayerLine = ({
  player,
  totalKills,
  maxDamage,
  maxGold,
  maxTank,
  gameDuration,
  width,
  showItems,
}) => {
  let width_ = width;
  if (showItems) {
    width_ = width - 236;
  }
  return (
    <div
      style={{
        display: "flex",
        height: "35px",
        width: "100%",
        background: "rgba(255,255,255,0.15)",
        marginTop: "2px",
        marginBottom: "2px",
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              right: "10px",
              width: "10px",
              height: "10px",
              background: "rgba(0,0,0,0.6)",
              zIndex: 10,
              fontSize: "13px",
            }}
          >
            {player.stats.champLevel}
          </div>
          <div
            style={{
              width: "30px",
              height: "30px",
              overflow: "hidden",
              borderRadius: "15px",
              marginLeft: "5px",
              marginRight: "10px",
            }}
          >
            <img
              src={`${CHAMPIONICONURL}${player.championId}.png`}
              width={"30px"}
              alt={player.championName}
            />
          </div>
        </div>
        <div style={{ marginRight: "10px" }}>
          {player.spellsIds.map((spellId) => (
            <img
              src={summonerSpellsUrl[spellId]}
              alt={summonerSpells[spellId]}
              width={15}
              style={{ display: "block" }}
              key={spellId}
            />
          ))}
        </div>
        <Typography
          component={Link}
          to={`/player/${player.summonerId}`}
          sx={{
            width: width > 390 ? "130px" : "100%",
            color: "white",
            overflow: "hidden",
            height: "100%",
            fontSize: width > 200 ? "1rem" : "0.7rem",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {player.summonerName}
        </Typography>
      </div>

      {width_ > 390 && (
        <Typography sx={{ width: "150px", textAlign: "center" }}>{`${
          player.stats.kills
        }/${player.stats.deaths}/${player.stats.assists} (${parseInt(
          (100 * (player.stats.kills + player.stats.assists)) / totalKills
        )}%)`}</Typography>
      )}
      {width_ > 700 && (
        <ProgressBar
          value={player.stats.totalDamageDealtToChampions}
          maxValue={maxDamage}
          tooltip="Damage dealt to champions: {0}\nHighest damage dealt by the team: {1}"
          color="rgb(245,100,100)"
        />
      )}
      {width_ > 900 && (
        <ProgressBar
          value={player.stats.totalDamageTaken}
          maxValue={maxTank}
          tooltip="Damage taken: {0}\nMost damage taken on team: {1}"
        />
      )}
      {width_ > 780 && (
        <ProgressBar
          value={player.stats.goldEarned}
          maxValue={maxGold}
          tooltip="Gold earned: {0}\nMost gold earned on team: {1}"
          color="rgb(240,245,100)"
        />
      )}
      {width_ > 510 && (
        <div style={{ display: "flex" }}>
          <Typography
            sx={{ width: "30px", textAlign: "center", marginLeft: "20px" }}
          >
            {player.stats.totalCs}
          </Typography>
          <Typography sx={{ marginLeft: "5px", marginRight: "5px" }}>
            ({((60 * player.stats.totalCs) / gameDuration).toFixed(1)})
          </Typography>
          <Tooltip title="Creep Score">
            <img
              width="20px"
              src="https://static.wikia.nocookie.net/leagueoflegends/images/3/30/Minion_icon.png"
              style={{ filter: "invert(30%)", marginRight: "20px" }}
              alt="cs"
            />
          </Tooltip>
        </div>
      )}
      {width_ > 580 && (
        <div style={{ display: "flex" }}>
          <Typography sx={{ width: "30px", textAlign: "center" }}>
            {player.stats.visionScore}
          </Typography>
          <Tooltip title="Vision Score">
            <img
              width="20px"
              src="https://static.wikia.nocookie.net/leagueoflegends/images/f/f1/Ward_icon.png/"
              style={{ filter: "invert(30%)", marginRight: "20px" }}
              alt="vision score"
            />
          </Tooltip>
        </div>
      )}
      {showItems && <ItemsSection player={player} />}
    </div>
  );
};

export default PlayerLine;
