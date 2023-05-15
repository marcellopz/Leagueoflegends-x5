import React, { useContext, useEffect, useState } from "react";
import { theme } from "../../theme";
import { AuthContext } from "../authContext";
import RequestButton from "./RequestButton";
import { requestToBeANerd } from "../../services/firebaseDatabase";
import Sidebar from "./Sidebar";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Menu, UploadFile } from "@mui/icons-material";
import { NavbarContext } from "../navbarContext";
import { sendFile } from "./newMatchFileSend";

const navbarItems = [
  { label: "match history", url: "/history" },
  { label: "matchmaking", url: "/matchmaking" },
  { label: "card rankings", url: "/rankings" },
  { label: "patch notes", url: "/patchnotes" },
];

const AddMatchDialog = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = (e) => {
        const content = e.target.result;
        setFileContent(content);
      };

      reader.readAsText(file);
    }
  }, [file]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileSend = () => {
    if (fileContent) {
      sendFile(fileContent);
    }
    setFile(null);
    setFileContent("");
    alert("match sent");
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
          />
          <UploadFile fontSize="large" />
          {file && <div>{file.name} selected</div>}
        </Button>
        {file && (
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
};

export default function Navbar() {
  const { userObj, signOut, isNerd, isAnonymous, isAdmin } =
    useContext(AuthContext);
  const { windowSize } = useContext(NavbarContext);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [addMatchDialogOpen, setAddMatchDialogOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const requestToBeNerd = (name) => {
    if (isAnonymous) {
      return;
    }
    requestToBeANerd(userObj.uid, name);
    alert("Request sent!");
  };

  return (
    <>
      <Sidebar
        navbarItems={navbarItems}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <AddMatchDialog
        open={addMatchDialogOpen}
        onClose={() => setAddMatchDialogOpen(false)}
      />
      <nav
        style={{
          backgroundColor: theme.palette.background.paper,
          height: "80px",
          display: "flex",
          zIndex: 10,
          width: "100%",
          justifyContent: "space-between",
          fontFamily: "'Source Sans Pro', sans-serif",
          fontSize: 13,
          borderBottom: "1px solid #505050",
          color: "lightGray",
        }}
      >
        <div
          style={{
            height: "100%",
          }}
        >
          <ul
            style={{
              display: "flex",
              paddingLeft: "20px",
              margin: "0",
              height: "100%",
            }}
          >
            <li
              style={{
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                height: "100%",
                marginRight: "50px",
              }}
            >
              <a
                href="/home"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "flex",
                }}
              >
                <img
                  src="grilha.webp"
                  style={{ height: 60, marginRight: "10px", margin: "auto" }}
                  alt="icon"
                />

                <div style={{ marginLeft: "5px" }}>
                  <h3 style={{ margin: 0 }}>x5</h3>
                  <h3 style={{ margin: 0 }}>dos</h3>
                  <h3 style={{ margin: 0 }}>nerds</h3>
                </div>
              </a>
            </li>
            {windowSize.width > 1200 &&
              navbarItems.map((item) => (
                <li
                  key={item.label}
                  style={{
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    marginRight: "50px",
                  }}
                >
                  <a
                    href={item.url}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <h1>{item.label}</h1>
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div>
          {windowSize.width > 1200 ? (
            <ul
              style={{
                display: "flex",
                paddingLeft: "20px",
                margin: "0",
                height: "100%",
              }}
            >
              {isAdmin && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    paddingRight: "20px",
                  }}
                >
                  <Button
                    onClick={() => setAddMatchDialogOpen(true)}
                    variant="outlined"
                  >
                    Add match
                  </Button>
                </li>
              )}
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  paddingRight: "20px",
                }}
              >
                <h1>{userObj?.displayName}</h1>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  paddingRight: "20px",
                }}
              >
                <button
                  style={{
                    background: theme.palette.background.paper,
                    color: "lightGray",
                    fontSize: 14,
                    borderRadius: 10,
                  }}
                  onClick={signOut}
                >
                  Sair
                </button>
              </li>
              {!isNerd && !isAnonymous && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    paddingRight: "20px",
                  }}
                >
                  <RequestButton
                    open={requestDialogOpen}
                    setOpen={setRequestDialogOpen}
                    requestToBeNerd={requestToBeNerd}
                  />
                </li>
              )}
            </ul>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                paddingRight: "20px",
              }}
            >
              <IconButton onClick={() => setSidebarOpen(true)}>
                <Menu fontSize="large" />
              </IconButton>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
