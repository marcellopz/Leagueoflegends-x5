import { Paper } from "@mui/material";
import React from "react";
import { floatToPercentageString, getKDA, isObjEmpty } from "../../utils/utils";
import { CHAMPIONICONURL } from "../../common-components/resources";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "championId",
    type: "string",
    headerName: "",
    align: "center",
    renderCell: (params) => (
      <img
        src={`${CHAMPIONICONURL}${params.row.championId}.png`}
        alt={params.row.championId}
        width={50}
      />
    ),
  },
  { field: "championName", type: "string", headerName: "Champion" },
  {
    field: "picks",
    type: "number",
    headerName: "Picked",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "bans",
    type: "number",
    headerName: "Banned",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "wins",
    type: "string",
    headerName: "Win rate",
    align: "center",
    headerAlign: "center",
    valueGetter: (params) =>
      floatToPercentageString(params.row.wins / params.row.picks) || "-",
  },
  {
    field: "kills",
    type: "number",
    headerName: "Kills",
    align: "center",
    headerAlign: "center",
    valueGetter: (params) =>
      isNaN((params.row.kills / params.row.picks).toFixed(1))
        ? "-"
        : (params.row.kills / params.row.picks).toFixed(1),
  },
  {
    field: "deaths",
    type: "number",
    headerName: "Deaths",
    align: "center",
    headerAlign: "center",
    valueGetter: (params) =>
      isNaN((params.row.deaths / params.row.picks).toFixed(1))
        ? "-"
        : (params.row.deaths / params.row.picks).toFixed(1),
  },
  {
    field: "assists",
    type: "number",
    headerName: "Assists",
    align: "center",
    headerAlign: "center",
    valueGetter: (params) =>
      isNaN((params.row.assists / params.row.picks).toFixed(1))
        ? "-"
        : (params.row.assists / params.row.picks).toFixed(1),
  },
  {
    type: "string",
    headerName: "KDA",
    align: "center",
    headerAlign: "center",
    valueGetter: (params) =>
      isNaN(getKDA(params.row)) ? "-" : getKDA(params.row),
  },
  {
    field: "creepsKilled",
    type: "number",
    headerName: "CS",
    align: "center",
    headerAlign: "center",
    valueGetter: (params) =>
      isNaN((params.row.creepsKilled / params.row.picks).toFixed(1))
        ? "-"
        : (params.row.creepsKilled / params.row.picks).toFixed(1),
  },
];

export default function ChampionStats({ champions }) {
  if (typeof champions === "undefined" || isObjEmpty(champions)) {
    return null;
  }
  const championsArray = Object.values(champions).map((c) => ({
    ...c,
    id: c.championId,
  }));

  return (
    <Paper sx={{ margin: "20px", padding: "10px" }}>
      <div style={{ width: "1000px", display: "flex", margin: "10px auto" }}>
        <DataGrid
          rows={championsArray}
          columns={columns}
          hideFooter
          rowSelection={false}
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
          disableColumnMenu
        />
      </div>
    </Paper>
  );
}
