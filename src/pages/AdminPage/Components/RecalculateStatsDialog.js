import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import {
  getMatches,
  getMatchesByPlayer,
  saveOverallStats,
  savePlayerStats,
} from "../../../services/firebaseDatabase";
import processDataPlayer from "./ProcessDataScripts/processDataPlayer";
import processDataAll from "./ProcessDataScripts/processDataAll";

const RecalculateStats = async () => {
  const players = await getMatchesByPlayer();
  const playerIds = Object.keys(players);
  const processedDataPerChamp = playerIds.map((playerId) =>
    processDataPlayer(players[playerId].matches)
  );
  processedDataPerChamp.forEach(async (player) => {
    await savePlayerStats(player);
  });

  const allMatches = await getMatches();
  const processedDataAll = processDataAll(allMatches);

  await saveOverallStats(processedDataAll);

  alert("stats saved");
};

export default function RecalculateStatsDialog({ open, onClose }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Recalculate Stats</DialogTitle>
      <DialogContent style={{ margin: "20px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={RecalculateStats}
        >
          Recalculate stats
        </Button>
      </DialogContent>
    </Dialog>
  );
}
