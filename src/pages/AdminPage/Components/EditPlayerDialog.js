import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPlayer } from "../../../services/firebaseDatabase";
import { DataGrid } from "@mui/x-data-grid";
import EditPlayerForm from "./EditPlayerForm";

const columns = [
  {
    field: "name_id",
    headerName: "Name_ID",
    type: "string",
    width: 90,
    sortable: true,
  },
  {
    field: "name",
    headerName: "Name",
    type: "string",
    width: 90,
    sortable: true,
  },
  {
    field: "account_id",
    headerName: "Account ID",
    type: "string",
    width: 120,
    sortable: true,
  },
  {
    field: "top",
    headerName: "Top",
    type: "number",
    align: "center",
    width: 60,
    sortable: true,
  },
  {
    field: "jungle",
    headerName: "Jungle",
    type: "number",
    align: "center",
    width: 60,
    sortable: true,
  },
  {
    field: "mid",
    headerName: "Mid",
    type: "number",
    align: "center",
    width: 60,
    sortable: true,
  },
  {
    field: "adc",
    headerName: "Adc",
    type: "number",
    align: "center",
    width: 60,
    sortable: true,
  },
  {
    field: "support",
    headerName: "Support",
    type: "number",
    align: "center",
    width: 80,
    sortable: true,
  },
];

export default function EditPlayerDialog({ open, onClose }) {
  const [selected, setSelected] = useState(null);
  const [allPlayersArray, setAllPlayersArray] = useState([]);

  useEffect(() => {
    getPlayer("").then((ps) => {
      const a = Object.entries(ps).map(([name, obj]) => ({
        name_id: name,
        ...obj,
      }));
      setAllPlayersArray(a);
    });
  }, []);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="lg">
      <DialogTitle>Select player to edit</DialogTitle>
      <DialogContent style={{ margin: "20px" }}>
        {selected ? (
          <EditPlayerForm player={selected} />
        ) : (
          <div style={{ width: "800px" }}>
            <DataGrid
              columns={columns}
              rows={allPlayersArray}
              getRowId={(i) => i.name_id}
              onRowClick={(a) => setSelected(a.row)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
