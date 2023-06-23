import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DraggableList from "./EditMatchDialog/DraggableList";
import lanes from "../../assets/images/lanes";
import { setRoles } from "../../services/firebaseDatabase";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function EditMatchDialog({ open, onClose, data }) {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);

  useEffect(() => {
    setBlueTeam(data.blueTeam);
    setRedTeam(data.redTeam);
  }, [data]);

  const onDragEnd = (color) => {
    let setNew;
    let team;
    if (color === "blue") {
      setNew = setBlueTeam;
      team = blueTeam;
    }
    if (color === "red") {
      setNew = setRedTeam;
      team = redTeam;
    }
    return ({ destination, source }) => {
      if (!destination) return;
      const newOrder = reorder(team, source.index, destination.index);
      setNew(newOrder);
    };
  };

  const sendRolesHandler = () => {
    const roles = {};
    const lanes = ["top", "jungle", "mid", "adc", "support"];
    blueTeam.forEach((player, i) => {
      roles[player.summonerId] = lanes[i];
    });
    redTeam.forEach((player, i) => {
      roles[player.summonerId] = lanes[i];
    });
    setRoles(roles, data.matchId).then(() => {
      alert("roles updated");
    });
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Edit match</DialogTitle>
      <DialogContent style={{ margin: "20px", display: "flex" }}>
        <div>
          {lanes.map((lane, i) => (
            <div
              key={i}
              style={{
                height: "72px",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                marginRight: "5px",
              }}
            >
              <img
                src={lane}
                style={{
                  margin: "auto",
                  padding: "2px",
                  background: "black",
                  borderRadius: "2px",
                }}
                width="40px"
              />
            </div>
          ))}
        </div>
        <div>
          <Paper>
            <DraggableList items={blueTeam} onDragEnd={onDragEnd("blue")} />
          </Paper>
        </div>
        <div style={{ marginLeft: "20px" }}>
          {lanes.map((lane, i) => (
            <div
              key={i}
              style={{
                height: "72px",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                marginRight: "5px",
              }}
            >
              <img
                src={lane}
                style={{
                  margin: "auto",
                  padding: "2px",
                  background: "black",
                  borderRadius: "2px",
                }}
                width="40px"
              />
            </div>
          ))}
        </div>
        <div>
          <Paper>
            <DraggableList items={redTeam} onDragEnd={onDragEnd("red")} />
          </Paper>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ margin: "20px" }}
          onClick={sendRolesHandler}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
