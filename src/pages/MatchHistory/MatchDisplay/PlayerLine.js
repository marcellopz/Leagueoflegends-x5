import { Box, Tooltip, Typography } from "@mui/material";
import {
  CHAMPIONICONURL,
  summonerSpells,
  summonerSpellsUrl,
} from "../../../common-components/resources";
import { Link } from "react-router-dom";

const PlayerLine = ({ player, totalKills, gameDuration }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "40px",
        background: "rgba(255,255,255,0.1)",
        marginTop: "3px",
        marginBottom: "3px",
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "5%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "150px", md: "200px", xl: "250px" },
          maxWidth: "100%",
        }}
      >
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
              overflow: "hidden",
              borderRadius: "15px",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            <img
              src={`${CHAMPIONICONURL}${player.championId}.png`}
              width={"35px"}
              height={"35px"}
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
            fontSize: { xs: "0.7rem", md: "1rem" },
            color: "white",
            overflow: "hidden",
            height: "100%",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flexGrow: 1,
          }}
        >
          {player.summonerName}
        </Typography>
      </Box>

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

      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          width: "110px",
        }}
      >
        <Tooltip title="Creep Score">
          <div className="flex justify-end">
            <Typography sx={{ width: "30px", textAlign: "center" }}>
              {player.stats.totalCs}
            </Typography>
            <Typography sx={{ marginLeft: "5px", marginRight: "5px" }}>
              ({((60 * player.stats.totalCs) / gameDuration).toFixed(1)})
            </Typography>
            <img
              width="20px"
              src="https://static.wikia.nocookie.net/leagueoflegends/images/3/30/Minion_icon.png"
              style={{ filter: "invert(30%)" }}
              alt="cs"
            />
          </div>
        </Tooltip>
      </Box>

      <Box sx={{ display: { xs: "none", xl: "block" } }}>
        <Tooltip title="Vision Score">
          <div style={{ width: "50px", display: "flex" }}>
            <Typography sx={{ width: "30px", textAlign: "center" }}>
              {player.stats.visionScore}
            </Typography>
            <img
              width="20px"
              src="https://static.wikia.nocookie.net/leagueoflegends/images/f/f1/Ward_icon.png/"
              style={{ filter: "invert(30%)" }}
              alt="vision score"
            />{" "}
          </div>
        </Tooltip>
      </Box>
    </div>
  );
};

export default PlayerLine;
