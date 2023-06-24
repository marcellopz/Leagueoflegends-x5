import React, { memo } from "react";
import CardComponent from "../../common-components/CardDisplay/CardComponent";
import { Box, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import { getChampionSplash } from "../../common-components/resources";
import { floatToPercentageString } from "../../utils/utils";
import lanes from "../../assets/images/lanes";

const roles = ["top", "jungle", "mid", "adc", "support"];

function PlayerBanner({
  champs,
  playerKey,
  playerInfo,
  selectedPlayerCardStats,
  setSelectedTab,
  selectedTab,
}) {
  return (
    <div
      style={{
        // height: "355px",
        width: "100%",
        padding: "10px 40px",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPositionY: "20%",
        position: "relative",
        borderBottom: "1px solid black",
        backgroundImage:
          champs.length > 0
            ? `url(${getChampionSplash(champs[0].championId)})`
            : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginRight: "auto",
          }}
        >
          <CardComponent
            name={playerKey}
            ranks={selectedPlayerCardStats}
            label={selectedPlayerCardStats.name}
            sx={{
              height: "300px",
              width: "216px",
            }}
          />
          <div style={{ margin: "20px", height: "70px" }}>
            <Typography sx={{ fontSize: 25, marginBottom: "10px" }}>
              {playerInfo.summonerName}
            </Typography>
            <Typography>
              {`Number of matches: ${playerInfo.numberOfMatches}`}
            </Typography>
          </div>
        </div>

        <div style={{ margin: "auto 0", display: "flex" }}>
          <Box
            sx={{
              background: "rgba(0,0,0,0.8)",
              height: "fit-content",
              padding: "20px",
              margin: "20px 10px 20px 0px",
              borderRadius: "5px",
            }}
          >
            <CircularProgressWithLabel
              value={playerInfo.winRate}
              size={176}
              label={`${floatToPercentageString(playerInfo.winRate)} Win rate`}
              labelFontSize={25}
            />
          </Box>
          <Box
            sx={{
              background: "rgba(0,0,0,0.8)",
              padding: "20px",
              margin: "20px 0 20px 5px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {roles.map((role, i) => (
              <div style={{ display: "flex" }} key={i}>
                <img src={lanes[i]} alt={role} width={37} height={37} />
                <Tooltip title={`${playerInfo.roleMatches[role].games} games`}>
                  <p style={{ alignSelf: "center", marginLeft: "5px" }}>
                    {floatToPercentageString(
                      playerInfo.roleMatches[role].wins /
                        playerInfo.roleMatches[role].games
                    )}
                  </p>
                </Tooltip>
              </div>
            ))}
          </Box>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "2%" }}
      >
        <Tabs onChange={(e, v) => setSelectedTab(v)} value={selectedTab}>
          <Tab label="Summary" value={0} />
          <Tab label="Champions" value={1} />
          <Tab label="Stats" value={2} />
          <Tab label="Records" value={3} />
        </Tabs>
      </div>
    </div>
  );
}

export default memo(PlayerBanner);
