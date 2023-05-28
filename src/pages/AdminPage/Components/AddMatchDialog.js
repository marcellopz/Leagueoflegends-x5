import { UploadFile } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { sendFile } from "../../../contexts/navbar/newMatchFileSend";

export default function AddMatchDialog({ open, onClose }) {
  const [files, setFiles] = useState([]);
  const [filesContent, setFilesContent] = useState([]);

  useEffect(() => {
    if (files.length > 0) {
      setFilesContent([]);

      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target.result;
          setFilesContent((prev) => [...prev, content]);
        };

        reader.readAsText(files[i]);
      }
    }
  }, [files]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleFileSend = () => {
    if (filesContent.length > 0) {
      filesContent.forEach((fileContent) => sendFile(fileContent));
    }
    setFiles([]);
    setFilesContent([]);
    alert("match(es) sent");
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add match to the database</DialogTitle>
      <DialogContent style={{ margin: "20px", display: "flex" }}>
        <Button
          variant="contained"
          sx={{ margin: "auto", padding: "20px" }}
          color="secondary"
          onClick={() => document.getElementById("upload-match-json").click()}
        >
          <input
            id="upload-match-json"
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple
          />
          <UploadFile fontSize="large" />
          {files.length > 0 && <div>{files.length} files selected</div>}
        </Button>
        {files.length > 0 && (
          <Button
            color="secondary"
            variant="contained"
            sx={{ marginLeft: "20px" }}
            onClick={handleFileSend}
          >
            Send
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
