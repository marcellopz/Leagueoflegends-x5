import { ArrowRight } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const recordsTags = [
  {
    key: "kills",
    title: "Most kills in a game",
    format: false,
  },
  {
    key: "deaths",
    title: "Most deaths",
    format: false,
  },
  {
    key: "assists",
    title: "Most assists",
    format: false,
  },
  {
    key: "cs",
    title: "Highest farm",
    format: false,
  },
  {
    key: "csPerMin",
    title: "Highest farm per minute",
    format: (v) => v.toFixed(2),
  },
  {
    key: "damage",
    title: "Highest damage dealt",
    format: false,
  },
  {
    key: "damageTaken",
    title: "Highest damage taken",
    format: false,
  },
  {
    key: "multiKill",
    title: "Highest Multikill",
    format: false,
  },
  {
    key: "killingSpree",
    title: "Highest killing spree",
    format: false,
  },
  {
    key: "longestGame",
    title: "Longest game",
    format: (v) => `${(v / 60).toFixed(1)} min`,
  },
  {
    key: "shortestGame",
    title: "Shortest game",
    format: (v) => `${(v / 60).toFixed(1)} min`,
  },
  {
    key: "visionScore",
    title: "Highest Vision score",
    format: false,
  },
];

const RecordBox = ({ title, value, win, gameId }) => (
  <Paper
    sx={{
      width: "250px",
      height: "130px",
      background: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    }}
  >
    <div
      style={{
        margin: "10px 15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ display: "flex", alignItems: "center" }}>
        {title}
      </Typography>
      <Link to={`/match/${gameId}`} title="Show match">
        <IconButton size="small">
          <ArrowRight />
        </IconButton>
      </Link>
    </div>
    <Typography
      component="div"
      sx={{
        textAlign: "end",
        fontSize: 40,
        margin: "15px 20px",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
      }}
    >
      <div>{value}</div>
      <div
        style={{
          fontSize: 15,
          opacity: 0.3,
          alignItems: "center",
          display: "flex",
        }}
      >
        {win ? "W" : "L"}
      </div>
    </Typography>
  </Paper>
);

function PlayerRecordsTab({ records }) {
  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "space-evenly",
      }}
    >
      {recordsTags.map((tag) => {
        const record = records[tag.key];
        const value = !!tag.format ? tag.format(record.n) : record.n;
        return (
          <RecordBox
            key={tag.key}
            title={tag.title}
            value={value}
            win={record.win}
            gameId={record.gameId}
          />
        );
      })}
    </div>
  );
}

export default memo(PlayerRecordsTab);
