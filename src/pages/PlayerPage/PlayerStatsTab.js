import React, { memo } from "react";

function PlayerStatsTab({ playerInfo, playerPairs }) {
  console.log({ playerInfo, playerPairs });
  return (
    <div
      style={{ margin: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}
    >
      <div
        style={{
          width: "50%",
          flexWrap: "wrap",
          display: "flex",
          gap: "20px",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          graph
        </div>
        <div
          style={{
            // minWidth: "200px",
            // maxWidth: "300px",
            height: "130px",
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div
            style={{
              // height: "140px",
              minWidth: "120px",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.2)",
              flexGrow: 1,
            }}
          >
            winrate blue
          </div>
          <div
            style={{
              // height: "140px",
              minWidth: "120px",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.2)",
              flexGrow: 1,
            }}
          >
            winrate red
          </div>
          <div
            style={{
              // height: "140px",
              minWidth: "120px",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.2)",
              flexGrow: 1,
            }}
          >
            Total games
          </div>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.2)",
            minWidth: "250px",
          }}
        >
          xd
        </div>
        <div
          style={{
            flexGrow: 1,
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.2)",
            minWidth: "250px",
          }}
        >
          xd
        </div>
      </div>
    </div>
  );
}

export default memo(PlayerStatsTab);
