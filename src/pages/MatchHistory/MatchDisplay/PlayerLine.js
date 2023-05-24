import { Tooltip, Typography } from "@mui/material";
import {
  CHAMPIONICONURL,
  summonerSpells,
  summonerSpellsUrl,
} from "../../../common-components/resources";
import { ITEMICONURL } from "../../../common-components/resources";

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
      {filteredList.map((item) => (
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            width: "34px",
            height: "34px",
            borderRadius: "3px",
            marginRight: "2px",
          }}
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
              <p key={line}>{line}</p>
            ))}
        </div>
      }
      arrow
    >
      <div
        style={{
          width: "60px",
          height: "8px",
          backgroundColor: "rgba(0,0,0,0.5)",
          marginLeft: "20px",
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
    </Tooltip>
  );
};

const PlayerLine = ({
  player,
  totalKills,
  maxDamage,
  maxGold,
  maxTank,
  width,
  showItems,
}) => {
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
      <div style={{ display: "flex" }}>
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
        <div style={{ marginRight: "10px" }}>
          {player.spellsIds.map((spellId) => (
            <img
              src={summonerSpellsUrl[spellId]}
              alt={summonerSpells[spellId]}
              width={15}
              style={{ display: "block" }}
            />
          ))}
        </div>
        <Typography
          sx={{
            width: width < 740 ? "calc(100%-45px)" : "150px",
            color: "white",
          }}
        >
          {player.summonerName}
        </Typography>
      </div>

      {width > 740 / 2 && (
        <Typography sx={{ width: "150px", textAlign: "center" }}>{`${
          player.stats.kills
        }/${player.stats.deaths}/${player.stats.assists} (${parseInt(
          (100 * (player.stats.kills + player.stats.assists)) / totalKills
        )}%)`}</Typography>
      )}
      {width > 1260 / 2 && (
        <ProgressBar
          value={player.stats.totalDamageDealtToChampions}
          maxValue={maxDamage}
          tooltip="Damage dealt to champions: {0}\nHighest damage dealt by the team: {1}"
          color="rgb(245,100,100)"
        />
      )}
      {width > 1550 / 2 && (
        <ProgressBar
          value={player.stats.totalDamageTaken}
          maxValue={maxTank}
          tooltip="Damage taken: {0}\nMost damage taken on team: {1}"
        />
      )}
      {width > 1400 / 2 && (
        <ProgressBar
          value={player.stats.goldEarned}
          maxValue={maxGold}
          tooltip="Gold earned: {0}\nMost gold earned on team: {1}"
          color="rgb(240,245,100)"
        />
      )}
      {width > 900 / 2 && (
        <div style={{ display: "flex" }}>
          <Typography
            sx={{ width: "30px", textAlign: "center", marginLeft: "20px" }}
          >
            {player.stats.totalCs}
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
      {width > 1060 / 2 && (
        <div style={{ display: "flex" }}>
          <Typography
            sx={{ width: "30px", textAlign: "center", marginLeft: "20px" }}
          >
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
