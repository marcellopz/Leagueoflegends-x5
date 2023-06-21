import React, { memo, useMemo } from "react";
import { CHAMPIONICONURL } from "../../common-components/resources";
import { floatToPercentageString, formatNumber } from "../../utils/utils";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const ProgressBar = ({ winRate, numberOfMatches }) => {
  const numberOfWins = Math.round(winRate * numberOfMatches);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        margin: "8px 0",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "16px",
            backgroundColor: "rgb(211 65 65)",
            position: "relative",
            borderRadius: "3px",
          }}
        >
          <Typography
            style={{
              textAlign: "start",
              fontSize: "12px",
              position: "absolute",
              zIndex: 10,
              width: "100%",
              marginLeft: "5px",
            }}
          >
            {`${numberOfWins}W`}
          </Typography>
          <Typography
            style={{
              textAlign: "end",
              fontSize: "12px",
              position: "absolute",
              zIndex: 10,
              width: "100%",
              transform: "translate(-5px)",
            }}
          >
            {`${numberOfMatches - numberOfWins}L`}
          </Typography>
          <div
            style={{
              width: `${winRate * 100}%`,
              height: "100%",
              backgroundColor: "#4694c5",
              position: "absolute",
              left: "0",
              borderRadius: "3px 0 0 3px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const columns = [
  {
    field: "championId",
    type: "string",
    headerName: "",
    align: "center",
    sortable: false,
    width: 60,
    renderCell: (params) => (
      <img
        src={`${CHAMPIONICONURL}${params.row.championId}.png`}
        alt={params.row.championId}
        width={50}
      />
    ),
  },
  { field: "championName", type: "string", headerName: "Champion", width: 120 },
  {
    field: "numberOfMatches",
    type: "number",
    headerName: "Picked",
    align: "center",
    headerAlign: "center",
    width: 170,
    renderCell: (params) => (
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ width: "100px" }}>
          <ProgressBar
            winRate={params.row.winRate}
            numberOfMatches={params.row.numberOfMatches}
          />
        </div>
        <p style={{ width: "50px", textAlign: "center" }}>
          {floatToPercentageString(params.row.winRate)}
        </p>
      </div>
    ),
  },
  {
    field: "kda",
    type: "string",
    headerName: "KDA",
    align: "center",
    headerAlign: "center",
    width: 150,
    renderCell: (params) => (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 600 }}>{`${params.row.kda.toFixed(
          1
        )}:1`}</div>
        <div>{`${params.row.AveragePerMatch.kills.toFixed(
          1
        )} / ${params.row.AveragePerMatch.deaths.toFixed(
          1
        )} / ${params.row.AveragePerMatch.assists.toFixed(1)}`}</div>
      </div>
    ),
  },
  {
    field: "gold",
    type: "number",
    headerName: "Gold",
    align: "center",
    headerAlign: "center",
    width: 100,
    valueGetter: (params) =>
      formatNumber(params.row.AveragePerMatch.goldEarned.toFixed(0)),
  },
  {
    field: "cs",
    type: "number",
    headerName: "CS",
    align: "center",
    headerAlign: "center",
    width: 70,
    valueGetter: (params) => params.row.AveragePerMatch.creepScore.toFixed(1),
  },
  {
    field: "damage",
    type: "number",
    headerName: "Damage dealt",
    align: "center",
    headerAlign: "center",
    width: 100,
    valueGetter: (params) =>
      formatNumber(params.row.AveragePerMatch.damageToChampions.toFixed(0)),
  },
  {
    field: "tanked",
    type: "number",
    headerName: "Damage taken",
    align: "center",
    headerAlign: "center",
    width: 100,
    valueGetter: (params) =>
      formatNumber(params.row.AveragePerMatch.damageTaken.toFixed(0)),
  },
  {
    field: "selfMitigated",
    type: "number",
    headerName: "Damage self mitigated",
    align: "center",
    headerAlign: "center",
    width: 120,
    valueGetter: (params) =>
      formatNumber(params.row.AveragePerMatch.damageSelfMitigates.toFixed(0)),
  },
  {
    field: "visionScore",
    type: "number",
    headerName: "Vision score",
    align: "center",
    headerAlign: "center",
    width: 70,
    valueGetter: (params) => params.row.AveragePerMatch.visionScore.toFixed(1),
  },
  {
    field: "wardsBought",
    type: "number",
    headerName: "Wards bought",
    align: "center",
    headerAlign: "center",
    width: 70,
    valueGetter: (params) =>
      params.row.AveragePerMatch.visionWardsBought.toFixed(1),
  },
];

function PlayerChampionsTab({ champs }) {
  const championsArray = useMemo(
    () =>
      Object.values(champs).map((c) => ({
        ...c,
        id: c.championId,
      })),
    [champs]
  );
  return (
    <div style={{ width: "100%", maxWidth: "1140px" }}>
      <DataGrid
        rows={championsArray}
        columns={columns}
        hideFooter
        rowSelection={false}
        disableRowSelectionOnClick
        disableColumnSelector
        disableDensitySelector
        disableColumnMenu
        sx={{
          margin: "10px auto",
          "& .MuiDataGrid-columnHeaderTitle": {
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            textAlign: "center",
            lineHeight: 1,
          },
          "& .MuiDataGrid-columnHeaders": {
            background: "rgba(255,255,255,0.08)",
          },
        }}
      />
    </div>
  );
}

export default memo(PlayerChampionsTab);
