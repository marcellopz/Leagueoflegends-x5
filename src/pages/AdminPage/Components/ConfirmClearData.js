import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { clearPreProcessedData } from "../../../services/firebaseDatabase";

const ClearData = async () => {
  await clearPreProcessedData();
  alert("Pre-processed data cleared");
};

export default function ConfirmClearData({ open, onClose }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Clear pre-processed data</DialogTitle>
      <DialogContent style={{ margin: "20px" }}>
        <Button variant="contained" color="secondary" onClick={ClearData}>
          Clear
        </Button>
      </DialogContent>
    </Dialog>
  );
}
