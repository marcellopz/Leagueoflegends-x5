import { Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { isObjEmpty } from "../../utils/utils";
import "./OverallStats.css"; // Import component styles

const ProgressBar = ({ value, maxValue, color, isRed, isBlue }) => {
  const progressPercentage = (value / maxValue) * 100;
  const [currentProgress, setCurrentProgress] = React.useState(0);

  React.useEffect(() => {
    setCurrentProgress(progressPercentage);
  }, [progressPercentage]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-wrapper">
        <div className="progress-bar-track">
          <div
            className={`progress-bar-indicator ${
              isRed ? "progress-bar-red" : ""
            } ${isBlue ? "progress-bar-blue" : ""}`}
            style={{
              width: `${currentProgress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export const SideStatBox = ({ title, redSideStat, blueSideStat }) => {
  return (
    <div className="side-stat-box">
      <Typography>{title}</Typography>
      <Divider className="side-stat-divider" />
      <div className="side-stat-row">
        <div className="side-stat-label red-team">Red side:</div>
        <div className="side-stat-progress">
          <ProgressBar
            value={redSideStat}
            maxValue={redSideStat > blueSideStat ? redSideStat : blueSideStat}
            color="var(--red-vivid)"
            isRed={true}
          />
        </div>
        <div className="side-stat-value red-team">{redSideStat}</div>
      </div>
      <div className="side-stat-row">
        <div className="side-stat-label blue-team">Blue side:</div>
        <div className="side-stat-progress">
          <ProgressBar
            value={blueSideStat}
            maxValue={redSideStat > blueSideStat ? redSideStat : blueSideStat}
            color="var(--blue-vivid)"
            isBlue={true}
          />
        </div>
        <div className="side-stat-value blue-team">{blueSideStat}</div>
      </div>
    </div>
  );
};

export default function OverallStats({ stats, hideMainStats }) {
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
  }, [stats]);

  return (
    <div className="stats-container">
      <div className="stats-inner-container">
        {!hideMainStats && (
          <Paper className="general-stats-paper">
            {generalItems.map((item, i) => (
              <div className="general-stat-item" key={i}>
                {item}
              </div>
            ))}
          </Paper>
        )}
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
