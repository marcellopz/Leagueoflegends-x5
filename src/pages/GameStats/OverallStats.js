import { Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { isObjEmpty } from "../../utils/utils";

const ProgressBar = ({ value, maxValue, color }) => {
  const progressPercentage = (value / maxValue) * 100;

  return (
    <div style={{ height: "100%", width: "100%", margin: "8px 0" }}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "16px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor: color,
              position: "absolute",
              left: "0",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const SideStatBox = ({ title, redSideStat, blueSideStat }) => (
  <div
    style={{
      background: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      padding: "13px",
      width: "100%",
      borderRadius: "4px",
    }}
  >
    <Typography>{title}</Typography>
    <Divider sx={{ marginY: "5px" }} />
    <div style={{ display: "flex" }}>
      <div
        style={{
          alignSelf: "center",
          width: "80px",
        }}
      >
        Red side:
      </div>
      <div style={{ flexGrow: 1 }}>
        <ProgressBar
          value={redSideStat}
          maxValue={redSideStat > blueSideStat ? redSideStat : blueSideStat}
          color="rgb(211 65 65)"
        />
      </div>
      <div style={{ textAlign: "center", width: "50px", alignSelf: "center" }}>
        {redSideStat}
      </div>
    </div>
    <div style={{ display: "flex" }}>
      <div
        style={{
          alignSelf: "center",
          width: "80px",
        }}
      >
        Blue side:
      </div>
      <div style={{ flexGrow: 1 }}>
        <ProgressBar
          value={blueSideStat}
          maxValue={redSideStat > blueSideStat ? redSideStat : blueSideStat}
          color="#4694c5"
        />
      </div>
      <div style={{ textAlign: "center", width: "50px", alignSelf: "center" }}>
        {blueSideStat}
      </div>
    </div>
  </div>
);

export default function OverallStats({ stats }) {
  const generalItems = useMemo(() => {
    if (isObjEmpty(stats)) {
      return [];
    }
    return [
      <>
        <b>Number of games:</b> {stats.numberOfGames}
      </>,
      <>
        <b>Average game duration:</b>{" "}
        {(stats.gameDurationTotal / stats.numberOfGames / 60).toFixed(1)}{" "}
        minutes
      </>,
      <>
        <b>Champions picked:</b>{" "}
        {Object.values(stats.champions).filter((c) => c.picks > 0).length}
      </>,
      <>
        <b>Champions that were never picked:</b>{" "}
        {Object.values(stats.champions).filter((c) => c.picks === 0).length}
      </>,
    ];
  }, [stats]);

  const sideRelatedItems = useMemo(() => {
    if (isObjEmpty(stats)) {
      return [];
    }
    return [
      <SideStatBox
        title="Wins"
        redSideStat={stats.redSide.wins}
        blueSideStat={stats.blueSide.wins}
      />,
      <SideStatBox
        title="Barons killed"
        redSideStat={stats.redSide.baronKills}
        blueSideStat={stats.blueSide.baronKills}
      />,
      <SideStatBox
        title="Dragons killed"
        redSideStat={stats.redSide.dragonKills}
        blueSideStat={stats.blueSide.dragonKills}
      />,
      <SideStatBox
        title="Rift Heralds killed"
        redSideStat={stats.redSide.riftHeraldKills}
        blueSideStat={stats.blueSide.riftHeraldKills}
      />,
      <SideStatBox
        title="Turrets destroyed"
        redSideStat={stats.redSide.towerKills}
        blueSideStat={stats.blueSide.towerKills}
      />,
      <SideStatBox
        title="First bloods"
        redSideStat={stats.redSide.firstBlood}
        blueSideStat={stats.blueSide.firstBlood}
      />,
      <SideStatBox
        title="Killed the first Baron"
        redSideStat={stats.redSide.firstBaron}
        blueSideStat={stats.blueSide.firstBaron}
      />,
      <SideStatBox
        title="Killed the first Dragon"
        redSideStat={stats.redSide.firstDragon}
        blueSideStat={stats.blueSide.firstDragon}
      />,
      <SideStatBox
        title="Destroyed the first inhibitor"
        redSideStat={stats.redSide.firstInhibitor}
        blueSideStat={stats.blueSide.firstInhibitor}
      />,
      <SideStatBox
        title="Destroyed the first tower"
        redSideStat={stats.redSide.firstTower}
        blueSideStat={stats.blueSide.firstTower}
      />,
    ];
  });
  return (
    <div
      style={{
        background: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "4px",
        margin: "20px",
      }}
    >
      <div
        style={{
          padding: "15px",
        }}
      >
        <Paper
          sx={{
            background: "rgba(255,255,255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "1px 0",
            marginBottom: "15px",
          }}
        >
          {generalItems.map((item, i) => (
            <div style={{ margin: "15px" }} key={i}>
              {item}
            </div>
          ))}
        </Paper>
        <Grid container spacing={2}>
          {sideRelatedItems.map((i, j) => (
            <Grid item key={j} xs={12} sm={6} md={4} lg={3}>
              {i}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
