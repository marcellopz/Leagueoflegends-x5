import React, { useState } from "react";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import { Button, useMediaQuery } from "@mui/material";
import AddMatchDialog from "./Components/AddMatchDialog";
import RecalculateStatsDialog from "./Components/RecalculateStatsDialog";
import AddPlayerDialog from "./Components/AddPlayerDialog";
import EditPlayerDialog from "./Components/EditPlayerDialog";

const workInProgressAlert = () => {
  alert("Work in progress");
};

export default function AdminPage() {
  const [addMatchDialogOpen, setAddMatchDialogOpen] = useState(false);
  const [recalculateStatsDialog, setRecalculateStatsDialog] = useState(false);
  const [addPlayerDialogOpen, setAddPlayerDialogOpen] = useState(false);
  const [editPlayerDialogOpen, setEditPlayerDialogOpen] = useState(false);

  return (
    <>
      <EditPlayerDialog
        open={editPlayerDialogOpen}
        onClose={() => setEditPlayerDialogOpen(false)}
      />
      <AddMatchDialog
        open={addMatchDialogOpen}
        onClose={() => setAddMatchDialogOpen(false)}
      />
      <RecalculateStatsDialog
        open={recalculateStatsDialog}
        onClose={() => setRecalculateStatsDialog(false)}
      />
      <AddPlayerDialog
        open={addPlayerDialogOpen}
        onClose={() => setAddPlayerDialogOpen(false)}
      />
      <X5pageContentArea title={"Admin page"}>
        <div style={{ margin: "20px", display: "flex" }}>
          <Button
            variant="outlined"
            onClick={() => setAddMatchDialogOpen(true)}
            sx={{ marginRight: "10px" }}
          >
            Add match
          </Button>
          <Button
            variant="outlined"
            sx={{ marginRight: "10px" }}
            onClick={() => setRecalculateStatsDialog(true)}
          >
            Recalculate stats
          </Button>
          <Button
            variant="outlined"
            sx={{ marginRight: "10px" }}
            onClick={() => setAddPlayerDialogOpen(true)}
          >
            Add player
          </Button>
          <Button
            variant="outlined"
            sx={{ marginRight: "10px" }}
            onClick={() => setEditPlayerDialogOpen(true)}
          >
            Edit player
          </Button>
        </div>
      </X5pageContentArea>
    </>
  );
}
