import { Box, Tooltip, Typography } from "@mui/material";
import {
  CHAMPIONICONURL,
  summonerSpells,
  summonerSpellsUrl,
} from "../../../common-components/resources";
import { Link } from "react-router-dom";
import "./PlayerLine.css";

const PlayerLine = ({ player, totalKills, gameDuration }) => {
  return (
    <div className="pl-container">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "150px", md: "200px", xl: "250px" },
          maxWidth: "100%",
        }}
      >
        <div className="pl-champion-wrapper">
          <div className="pl-champion-level">{player.stats.champLevel}</div>
          <div className="pl-champion-icon">
            <img
              src={`${CHAMPIONICONURL}${player.championId}.png`}
              width={"35px"}
              height={"35px"}
              alt={player.championName}
            />
          </div>
        </div>
        <div className="pl-spells-wrapper">
          {player.spellsIds.map((spellId) => (
            <img
              src={summonerSpellsUrl[spellId]}
              alt={summonerSpells[spellId]}
              width={15}
              className="pl-spell-icon"
              key={spellId}
            />
          ))}
        </div>
        <Typography
          component={Link}
          to={`/player/${player.summonerId}`}
          className="pl-name"
          sx={{
            fontSize: { xs: "0.7rem", md: "1rem" },
          }}
        >
          {player.summonerName}
        </Typography>
      </Box>

      <Tooltip title="KDA" placement="top">
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { xs: "0.7rem", md: "1rem" },
            display: { xs: "none", sm: "block" },
            width: "120px",
          }}
        >{`${player.stats.kills}/${player.stats.deaths}/${
          player.stats.assists
        } (${parseInt(
          (100 * (player.stats.kills + player.stats.assists)) / totalKills
        )}%)`}</Typography>
      </Tooltip>

      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          width: "110px",
        }}
      >
        <Tooltip title="Creep Score" placement="top">
          <div className="pl-stat-wrapper">
            <Typography sx={{ width: "30px", textAlign: "center" }}>
              {player.stats.totalCs}
            </Typography>
            <Typography className="pl-cs-permin">
              ({((60 * player.stats.totalCs) / gameDuration).toFixed(1)})
            </Typography>
            <img
              width="20px"
              src="https://static.wikia.nocookie.net/leagueoflegends/images/3/30/Minion_icon.png"
              className="pl-cs-icon"
              alt="cs"
            />
          </div>
        </Tooltip>
      </Box>

      <Box sx={{ display: { xs: "none", xl: "block" } }}>
        <Tooltip title="Vision Score" placement="top">
          <div className="pl-cs-container">
            <Typography className="pl-cs-value">
              {player.stats.visionScore}
            </Typography>
            <img
              width="20px"
              src="https://static.wikia.nocookie.net/leagueoflegends/images/f/f1/Ward_icon.png/"
              className="pl-vision-icon"
              alt="vision score"
            />
          </div>
        </Tooltip>
      </Box>
    </div>
  );
};

export default PlayerLine;
