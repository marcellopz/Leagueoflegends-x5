import React, { useEffect, useState } from "react";
import { theme } from "../../theme";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { getPlayer } from "../../services/firebaseDatabase";

const columns = [
  {
    field: "name",
    headerName: "Name",
    type: "string",
    width: 120,
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <motion.div
        style={{
          width: "100%",
          maxWidth: "1600px",
          background: theme.palette.background.bd,
          borderRadius: "15px",
          marginTop: "20px",
          border: "2px solid black",
        }}
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
            transition: {
              duration: 0.5,
            },
          },
        }}
      >
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
            }}
            onRowClick={(a) => console.log(a)}
          />
        </div>
      </motion.div>
    </div>
  );
}
