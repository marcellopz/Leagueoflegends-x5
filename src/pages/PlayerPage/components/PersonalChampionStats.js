import { Typography } from "@mui/material";
import { CHAMPIONICONURL } from "../../../common-components/resources";
import { theme } from "../../../theme";
import { floatToPercentageString } from "../../../utils/utils";

export default function PersonalChampionStats({ champ }) {
  return (
    <div
      style={{
        borderWidth: "1px 1px 0px 1px",
        borderStyle: "solid",
        borderColor: "rgba(255,255,255,0.2)",
        padding: "5px 3px",
        display: "flex",
        alignItems: "center",
        width: "320px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            overflow: "hidden",
            borderRadius: "10px",
            marginLeft: "5px",
            marginRight: "10px",
          }}
        >
          <img
            src={`${CHAMPIONICONURL}${champ.championId}.png`}
            width={"40px"}
            alt={champ.championName}
          />
        </div>
        <div style={{ width: "80px" }}>
          <Typography fontWeight={500}>{champ.championName}</Typography>
          <Typography
            fontSize={13}
            color={theme.palette.grey[500]}
          >{`CS ${champ.AveragePerMatch.creepScore.toFixed(1)}`}</Typography>
        </div>
      </div>

      <div>
        <Typography fontSize={15} textAlign="center">{`${champ.kda.toFixed(
          2
        )}:1 KDA`}</Typography>
        <Typography
          textAlign="center"
          color={theme.palette.grey[500]}
          fontSize={13}
        >{`${champ.AveragePerMatch.kills.toFixed(
          1
        )} / ${champ.AveragePerMatch.deaths.toFixed(
          1
        )} / ${champ.AveragePerMatch.assists.toFixed(1)}`}</Typography>
      </div>
      <div style={{ marginRight: "5px" }}>
        <Typography textAlign="end" fontSize={15}>
          {floatToPercentageString(champ.winRate)}
        </Typography>
        <Typography
          textAlign="end"
          color={theme.palette.grey[500]}
          fontSize={13}
        >
          {champ.numberOfMatches} played
        </Typography>
      </div>
    </div>
  );
}
