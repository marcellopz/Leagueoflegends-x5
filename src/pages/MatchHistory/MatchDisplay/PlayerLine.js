import { Tooltip, Typography } from "@mui/material";
import { CHAMPIONICONURL } from "../../../common-components/resources";

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
      <Typography sx={{ width: "150px", color: "white" }}>
        {player.summonerName}
      </Typography>
      <Typography sx={{ width: "150px", textAlign: "center" }}>{`${
        player.stats.kills
      }/${player.stats.deaths}/${player.stats.assists} (${parseInt(
        (100 * (player.stats.kills + player.stats.assists)) / totalKills
      )}%)`}</Typography>
      <ProgressBar
        value={player.stats.totalDamageDealtToChampions}
        maxValue={maxDamage}
        tooltip="Damage dealt to champions: {0}\nHighest damage dealt by the team: {1}"
        color="rgb(245,100,100)"
      />
      <ProgressBar
        value={player.stats.totalDamageTaken}
        maxValue={maxTank}
        tooltip="Damage taken: {0}\nMost damage taken on team: {1}"
      />
      <ProgressBar
        value={player.stats.goldEarned}
        maxValue={maxGold}
        tooltip="Gold earned: {0}\nMost gold earned on team: {1}"
        color="rgb(240,245,100)"
      />
      <Typography
        sx={{ width: "30px", textAlign: "center", marginLeft: "20px" }}
      >
        {player.stats.totalCs}
      </Typography>
      <img
        width="20px"
        src="https://static.wikia.nocookie.net/leagueoflegends/images/3/30/Minion_icon.png"
        style={{ filter: "invert(30%)" }}
      />
      <Typography
        sx={{ width: "30px", textAlign: "center", marginLeft: "20px" }}
      >
        {player.stats.visionScore}
      </Typography>
      <img
        width="20px"
        src="https://static.wikia.nocookie.net/leagueoflegends/images/f/f1/Ward_icon.png/"
        style={{ filter: "invert(30%)", marginRight: "20px" }}
      />
    </div>
  );
};

export default PlayerLine;
