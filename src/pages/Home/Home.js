import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { getPlayer, requestToBeANerd } from "../../services/firebaseDatabase";
import PlayerDisplay from "./PlayerDisplay";
import { MiscContext } from "../../contexts/miscContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

function RequestButton({ open, setOpen, requestToBeNerd }) {
  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSend = () => {
    requestToBeNerd(name);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Request to be a nerd
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request to be a nerd</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To get the full experience of this website, request to be a nerd.
            Inform a name for us to identify you and if you're accepted in
            you'll be granted access to all the website functionalities.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function Home() {
  const { signOut, signed, isNerd, userObj, isAnonymous } =
    useContext(AuthContext);
  const { getCardbackground } = useContext(MiscContext);
  const [players, setPlayers] = useState(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  useEffect(() => {
    if (signed) {
      (async () => {
        const players_ = await getPlayer("");
        setPlayers(players_);
      })();
      getCardbackground();
    }
  }, [signed, getCardbackground]);

  const requestToBeNerd = (name) => {
    if (isAnonymous) {
      return;
    }
    requestToBeANerd(userObj.uid, name);
    alert("Request sent!");
  };

  return (
    <div style={{ width: "100%", margin: "10px" }}>
      <div style={{ marginBottom: "10px" }}>{userObj?.displayName}</div>
      <button style={{ marginBottom: "10px" }} onClick={signOut}>
        Sair
      </button>
      <div style={{ marginBottom: "10px" }}>
        <a href="/matchmaking">Matchmaking</a>
      </div>
      {!isNerd && !isAnonymous && (
        <RequestButton
          open={requestDialogOpen}
          setOpen={setRequestDialogOpen}
          requestToBeNerd={requestToBeNerd}
        />
      )}
      {isAnonymous && (
        <div style={{ marginBottom: "10px" }}>
          To get the full experience log in and request to be a nerd
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "10px" }}>
        {players &&
          Object.keys(players).map((player) => (
            <PlayerDisplay
              name={player}
              ranks={players[player]}
              label={players[player].name}
              key={player}
              sx={{ margin: "4px", height: "300px" }}
            />
          ))}
      </div>
    </div>
  );
}
