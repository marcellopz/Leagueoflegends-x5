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
  { label: "player list", url: "/players" },
  { label: "patch notes", url: "/patchnotes" },
];

const AddMatchDialog = ({ open, onClose }) => {
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
};

export default function Navbar() {
  const { userObj, signOut, isNerd, isAnonymous, isAdmin } =
    useContext(AuthContext);
  const { windowSize } = useContext(NavbarContext);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [addMatchDialogOpen, setAddMatchDialogOpen] = useState(false);
  const [hover, setHover] = useState("");

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
          backgroundColor: theme.palette.navbar.background,
          height: "80px",
          display: "flex",
          zIndex: 10,
          width: "100%",
          justifyContent: "space-between",
          fontSize: 13,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxSizing: "border-box",
          color: theme.palette.navbar.text,
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
                  alignItems: "center",
                }}
              >
                <img
                  src="grilha.webp"
                  style={{ height: 60, marginRight: "10px", margin: "auto" }}
                  alt="icon"
                />

                <div style={{ marginLeft: "5px" }}>
                  <h3 style={{ margin: 0, fontWeight: 600, lineHeight: 1.1 }}>
                    x5
                  </h3>
                  <h3 style={{ margin: 0, fontWeight: 600, lineHeight: 1.1 }}>
                    dos
                  </h3>
                  <h3 style={{ margin: 0, fontWeight: 600, lineHeight: 1.1 }}>
                    nerds
                  </h3>
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
                    borderBottom:
                      window.location.pathname === item.url ||
                      hover === item.url
                        ? "4px solid white"
                        : "",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={() => setHover(item.url)}
                  onMouseLeave={() => setHover("")}
                >
                  <a
                    href={item.url}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <h1 style={{ fontWeight: 400, letterSpacing: "0.02em" }}>
                      {item.label}
                    </h1>
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
                    color="secondary"
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
                <Button onClick={signOut} variant="outlined" color="secondary">
                  Sair
                </Button>
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
