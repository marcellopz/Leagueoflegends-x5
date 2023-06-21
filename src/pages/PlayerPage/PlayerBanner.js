import React, { memo } from "react";
import CardComponent from "../../common-components/CardDisplay/CardComponent";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import { getChampionSplash } from "../../common-components/resources";
import { floatToPercentageString } from "../../utils/utils";

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
        padding: "10px 10px 0px 10px",
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
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ marginLeft: "20px", display: "flex", flexWrap: "wrap" }}>
          <CardComponent
            name={playerKey}
            ranks={selectedPlayerCardStats}
            label={selectedPlayerCardStats.name}
            sx={{
              height: "300px",
              width: "216px",
              // transform: "translateY(15px)",
            }}
          />
          <div style={{ margin: "20px", height: "70px", width: "180px" }}>
            <Typography sx={{ fontSize: 25, marginBottom: "10px" }}>
              {playerInfo.summonerName}
            </Typography>
            <Typography>
              {`Number of matches: ${playerInfo.numberOfMatches}`}
            </Typography>
          </div>
        </div>

        <div style={{ margin: "auto 0", marginRight: "20px" }}>
          <Box
            sx={{
              background: "rgba(0,0,0,0.8)",
              height: "fit-content",
              padding: "20px",
              margin: "20px",
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
