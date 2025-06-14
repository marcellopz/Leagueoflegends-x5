import { Typography } from "@mui/material";
import { CHAMPIONICONURL } from "../../../common-components/resources";
import { theme } from "../../../theme";
import { floatToPercentageString } from "../../../utils/utils";
import "./PersonalChampionStats.css";

export default function PersonalChampionStats({ champ }) {
  return (
    <div className="pcs-container">
      <div className="pcs-champ-section">
        <div className="pcs-champ-icon-container">
          <img
            src={`${CHAMPIONICONURL}${champ.championId}.png`}
            className="pcs-champ-icon"
            alt={champ.championName}
          />
        </div>
        <div className="pcs-champ-info">
          <Typography className="pcs-champ-name">
            {champ.championName}
          </Typography>
          <Typography
            className="pcs-champ-cs"
            color={theme.palette.grey[500]}
          >{`CS ${champ.AveragePerMatch.creepScore?.toFixed(1)}`}</Typography>
        </div>
      </div>

      <div className="pcs-kda-section">
        <Typography className="pcs-kda">{`${
          typeof champ.kda === "number" ? champ.kda.toFixed(2) : champ.kda
        }:1 KDA`}</Typography>
        <Typography
          className="pcs-kda-details"
          color={theme.palette.grey[500]}
        >{`${champ.AveragePerMatch.kills.toFixed(
          1
        )} / ${champ.AveragePerMatch.deaths.toFixed(
          1
        )} / ${champ.AveragePerMatch.assists.toFixed(1)}`}</Typography>
      </div>
      <div className="pcs-win-section">
        <Typography className="pcs-win-rate">
          {floatToPercentageString(champ.winRate)}
        </Typography>
        <Typography
          className="pcs-matches-played"
          color={theme.palette.grey[500]}
        >
          {champ.numberOfMatches} played
        </Typography>
      </div>
    </div>
  );
}
