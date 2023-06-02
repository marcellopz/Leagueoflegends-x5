import React, { memo, useContext, useEffect, useState } from "react";
import { theme } from "../../theme";
import { AuthContext } from "../authContext";
import RequestButton from "./RequestButton";
import { requestToBeANerd } from "../../services/firebaseDatabase";
import Sidebar from "./Sidebar";
import { Button, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { NavbarContext } from "../navbarContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const navbarItems = [
  { label: "match history", url: "/history" },
  { label: "matchmaking", url: "/matchmaking" },
  { label: "player list", url: "/players" },
  { label: "patch notes", url: "/patchnotes" },
];

function Navbar({ children }) {
  const { userObj, signOut, isNerd, isAnonymous, isAdmin } =
    useContext(AuthContext);
  const { windowSize } = useContext(NavbarContext);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
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
      <nav
        style={{
          backgroundColor: theme.palette.navbar.background,
          height: "80px",
          display: "flex",
          zIndex: 10,
          width: "100%",
          justifyContent: "space-between",
          fontSize: 20,
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
              <Link
                to="/home"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="grilha.webp"
                  style={{
                    height: 60,
                    marginRight: "10px",
                    margin: "auto",
                  }}
                  alt="icon"
                />

                <div style={{ marginLeft: "5px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      lineHeight: 1.1,
                      fontSize: 14,
                    }}
                  >
                    x5
                  </h3>
                  <h3
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      lineHeight: 1.1,
                      fontSize: 14,
                    }}
                  >
                    dos
                  </h3>
                  <h3
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      lineHeight: 1.1,
                      fontSize: 14,
                    }}
                  >
                    nerds
                  </h3>
                </div>
              </Link>
            </li>
            {windowSize.width > 1200 &&
              navbarItems.map((item) => (
                <motion.li
                  key={item.label}
                  style={{
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    marginRight: "50px",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={() => setHover(item.url)}
                  onMouseLeave={() => setHover("")}
                  initial={{ borderBottom: "4px solid transparent" }}
                  transition={{ duration: 0.2 }}
                  animate={{
                    opacity:
                      window.location.pathname === item.url ||
                      hover === item.url
                        ? 1
                        : 0.8,
                    borderBottom:
                      window.location.pathname === item.url ||
                      hover === item.url
                        ? "4px solid white"
                        : "4px solid transparent",
                  }}
                >
                  <Link
                    to={item.url}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <h1 style={{ fontWeight: 400, letterSpacing: "0.02em" }}>
                      {item.label}
                    </h1>
                  </Link>
                </motion.li>
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
                  <Link to="admin">
                    <Button variant="outlined" color="secondary">
                      Admin page
                    </Button>
                  </Link>
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
      {children}
    </>
  );
}

export default memo(Navbar);
