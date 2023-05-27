import React from "react";
import { theme } from "../../theme";
import { Typography } from "@mui/material";

export default function CardRankings() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1600px",
          background: theme.palette.background.bd,
          borderRadius: "15px",
          marginTop: "20px",
          border: "2px solid black",
        }}
      >
        <div style={{ margin: "20px" }}>
          <Typography fontSize={25}>Card Rankings</Typography>
        </div>
      </div>
    </div>
  );
}
