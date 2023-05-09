import React, { useContext, useEffect, useState } from "react";
import { theme } from "../../theme";
import { AuthContext } from "../authContext";
import RequestButton from "./RequestButton";
import { requestToBeANerd } from "../../services/firebaseDatabase";
import Sidebar from "./Sidebar";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { NavbarContext } from "../navbarContext";

const navbarItems = [
  { label: "match history", url: "/history" },
  { label: "matchmaking", url: "/matchmaking" },
  { label: "card rankings", url: "/rankings" },
  { label: "patch notes", url: "/patchnotes" },
];

export default function Navbar() {
  const { userObj, signOut, isNerd, isAnonymous } = useContext(AuthContext);
  const { windowSize } = useContext(NavbarContext);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

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
