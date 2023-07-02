import { Typography } from "@mui/material";
import React, { memo } from "react";
import { floatToPercentageString } from "../../utils/utils";
import { DataGrid } from "@mui/x-data-grid";
import WinRateChart from "./components/WinRateChart";

const SmallBox = ({ title, value, numberOfGames }) => (
  <div
    style={{
      borderRadius: "4px",
      height: "130px",
      background: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      minWidth: "120px",
      flexGrow: 1,
    }}
  >
    <div
      style={{
        margin: "10px 15px",
      }}
    >
      <Typography sx={{ display: "flex", alignItems: "center" }}>
        {title}
      </Typography>
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
      {numberOfGames && (
        <div
          style={{
            fontSize: 15,
            opacity: 0.3,
            alignItems: "center",
            display: "flex",
          }}
        >
          {`${numberOfGames} games`}
        </div>
      )}
    </Typography>
  </div>
);

const columns = [
  {
    field: "summonerName",
    headerName: "Name",
    type: "string",
    sortable: true,
    flex: 2,
  },
  {
    field: "wins",
    headerName: "Win rate",
    type: "number",
    sortable: true,
    flex: 1,
    valueGetter: (params) => params.row.wins / params.row.games || "-",
    renderCell: (params) =>
      floatToPercentageString(params.row.wins / params.row.games) || "-",
  },
  {
    field: "games",
    flex: 1,
    headerName: "Games",
    sortable: true,
    type: "number",
  },
];

const WinRatePerPlayerList = ({ players }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ minWidth: "335px", height: "470px" }}>
        <DataGrid
          rows={players}
          columns={columns}
          hideFooter
          rowSelection={false}
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
          disableColumnMenu
          getRowId={(i) => i.summonerName}
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              background: "rgba(255,255,255,0.08)",
            },
          }}
        />
      </div>
    </div>
  );
};

function PlayerStatsTab({ playerInfo, playerPairs, playerSummary }) {
  const sameTeam = Object.entries(playerPairs)
    .map(([k, v]) => ({
      games: v.same_team.games,
      wins: v.same_team.wins,
      summonerName: playerSummary[k] ? playerSummary[k].summonerName : k,
    }))
    .sort((a, b) => (a.games > b.games ? -1 : 1));
  const oppositeTeam = Object.entries(playerPairs)
    .map(([k, v]) => ({
      games: v.opposite_team.games,
      wins: v.opposite_team.wins,
      summonerName: playerSummary[k] ? playerSummary[k].summonerName : k,
    }))
    .sort((a, b) => (a.games > b.games ? -1 : 1));
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
          alignSelf: "flex-start",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <WinRateChart winsArray={playerInfo.winsArray} />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <SmallBox
            title="Win rate on blue side"
            value={floatToPercentageString(
              playerInfo.statsPerSide.blueSide.wins /
                playerInfo.statsPerSide.blueSide.games
            )}
            numberOfGames={playerInfo.statsPerSide.blueSide.games}
          />
          <SmallBox
            title="Win rate on red side"
            value={floatToPercentageString(
              playerInfo.statsPerSide.redSide.wins /
                playerInfo.statsPerSide.redSide.games
            )}
            numberOfGames={playerInfo.statsPerSide.redSide.games}
          />
          <SmallBox
            title="Total games played"
            value={playerInfo.numberOfMatches}
          />
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
            padding: "10px 15px",
          }}
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: 20,
              display: "flex",
            }}
          >
            Win rate with player
          </p>
          <WinRatePerPlayerList players={sameTeam} />
        </div>
        <div
          style={{
            flexGrow: 1,
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.2)",
            minWidth: "250px",
            padding: "10px 15px",
          }}
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: 20,
              display: "flex",
            }}
          >
            Win rate against player
          </p>
          <WinRatePerPlayerList players={oppositeTeam} />
        </div>
      </div>
    </div>
  );
}

export default memo(PlayerStatsTab);
