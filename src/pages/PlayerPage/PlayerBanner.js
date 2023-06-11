import React from "react";
import CardComponent from "../../common-components/CardDisplay/CardComponent";
import { Box, Typography } from "@mui/material";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import { getChampionSplash } from "../../common-components/resources";
import { theme } from "../../theme";

export default function PlayerBanner({
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
        <div style={{ marginLeft: "20px", display: "flex" }}>
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
          <div style={{ margin: "20px" }}>
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
            <CircularProgressWithLabel value={playerInfo.winRate} />
          </Box>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "2%" }}
      >
        <ul style={{ display: "flex" }}>
          <li
            style={{
              padding: "12px",
              backgroundColor:
                selectedTab === 0
                  ? theme.palette.background.paper
                  : theme.palette.background.bd,
              border: "1px solid black",
              width: "120px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setSelectedTab(0)}
          >
            Summary
          </li>
          <li
            style={{
              padding: "12px",
              backgroundColor:
                selectedTab === 1
                  ? theme.palette.background.paper
                  : theme.palette.background.bd,
              border: "1px solid black",
              width: "120px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setSelectedTab(1)}
          >
            Champions
          </li>
          <li
            style={{
              padding: "12px",
              backgroundColor:
                selectedTab === 2
                  ? theme.palette.background.paper
                  : theme.palette.background.bd,
              border: "1px solid black",
              width: "120px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setSelectedTab(2)}
          >
            Stats
          </li>
          <li
            style={{
              padding: "12px",
              backgroundColor:
                selectedTab === 3
                  ? theme.palette.background.paper
                  : theme.palette.background.bd,
              border: "1px solid black",
              width: "120px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setSelectedTab(3)}
          >
            Records
          </li>
        </ul>
      </div>
    </div>
  );
}
