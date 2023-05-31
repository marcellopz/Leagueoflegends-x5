import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { getPlayer } from "../../services/firebaseDatabase";
import X5pageContentArea from "../../common-components/X5pageContentArea";

const columns = [
  {
    field: "name",
    headerName: "Name",
    type: "string",
    width: 90,
    sortable: true,
  },
  {
    field: "top",
    headerName: "Top",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
  {
    field: "jungle",
    headerName: "Jungle",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
  {
    field: "mid",
    headerName: "Mid",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
  {
    field: "adc",
    headerName: "Adc",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
  {
    field: "support",
    headerName: "Support",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
];

export default function PlayerPage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    (async () => {
      const players_ = await getPlayer("");
      setPlayers(players_);
    })();
  }, []);

  const arrayOfPlayers =
    Object.keys(players ?? {}).map((player, i) => ({
      ...players[player],
      id: i,
      player_id: player,
    })) ?? [];

  return (
    <X5pageContentArea>
      <div style={{ margin: "20px" }}>
        <Typography fontSize={25}>Player List</Typography>
      </div>
      <div style={{ maxWidth: "900px", width: "95%", margin: "auto" }}>
        <DataGrid
          rows={arrayOfPlayers}
          columns={columns}
          hideFooter
          rowSelection={false}
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            marginBottom: "20px",
          }}
          onRowClick={(a) => console.log(a)}
        />
      </div>
    </X5pageContentArea>
  );
}
