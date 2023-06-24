import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function AddPlayerDialog({ open, onClose }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add player</DialogTitle>
      <DialogContent style={{ margin: "20px" }}>
        <Button variant="contained" color="secondary">
          Recalculate stats
        </Button>
      </DialogContent>
    </Dialog>
  );
}
