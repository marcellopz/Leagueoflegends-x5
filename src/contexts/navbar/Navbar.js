import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import RequestButton from "./RequestButton";
import { requestToBeANerd } from "../../services/firebaseDatabase";
import Sidebar from "./Sidebar";
import { Button, IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { NavbarContext } from "../navbarContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import grilhaIcon from "./grilhaIcon";
import "./Navbar.css";

const navbarItems = [
  { label: "match history", url: "/history" },
  { label: "matchmaking", url: "/matchmaking" },
  { label: "player list", url: "/players" },
  { label: "game stats", url: "/gamestats" },
];

function Navbar({ children }) {
  const {
    userObj,
    signOut,
    isNerd,
    isAnonymous,
    isAdmin,
    isNull,
    loadStoreAuth,
  } = useContext(AuthContext);
  const { windowSize } = useContext(NavbarContext);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [hover, setHover] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isNull) {
      if (loadStoreAuth()) {
        return () => {};
      }
      // signInAsGuest();
    }
  }, [isNull, loadStoreAuth]);

  // if (isNull) {
  //   return (
  //     <div style={{ display: "flex", marginTop: "100px" }}>
  //       <div style={{ margin: "auto" }}>
  //         <CircularProgress />
  //       </div>
  //     </div>
  //   );
  // }

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
      <nav className="navbar">
        <div className="navbar-section">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/home" className="navbar-brand-link">
                <div style={{ position: "relative" }}>
                  <img src={grilhaIcon} className="navbar-logo" alt="icon" />
                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: 2,
                      left: -2,
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Season 1
                  </Typography>
                </div>

                <div className="navbar-brand-text">
                  <h3 className="navbar-brand-line">x5</h3>
                  <h3 className="navbar-brand-line">dos</h3>
                  <h3 className="navbar-brand-line">nerds</h3>
                </div>
              </Link>
              <Button
                LinkComponent={Link}
                to="https://x5-season-2.vercel.app/"
                variant="contained"
                sx={{
                  marginLeft: "16px",
                  whiteSpace: "nowrap",
                }}
              >
                Season 2
              </Button>
            </li>
            {windowSize.width > 1200 &&
              navbarItems.map((item) => (
                <motion.li
                  key={item.label}
                  className="navbar-item"
                  onMouseEnter={() => setHover(item.url)}
                  onMouseLeave={() => setHover("")}
                  initial={{ borderBottom: "4px solid transparent" }}
                  transition={{ duration: 0.2 }}
                  animate={{
                    borderBottom:
                      window.location.pathname === item.url ||
                      hover === item.url
                        ? "4px solid white"
                        : "4px solid transparent",
                  }}
                >
                  <Link to={item.url} className="navbar-link">
                    <h1 className="navbar-link-title">{item.label}</h1>
                  </Link>
                </motion.li>
              ))}
          </ul>
        </div>
        <div>
          {windowSize.width > 1200 ? (
            <ul className="navbar-list">
              {isAdmin && (
                <li className="navbar-right-item">
                  <Link to="admin">
                    <Button variant="outlined" color="primary">
                      Admin page
                    </Button>
                  </Link>
                </li>
              )}
              <li className="navbar-right-item">
                <h1>{userObj?.displayName}</h1>
              </li>
              <li className="navbar-right-item">
                {isNull || isAnonymous ? (
                  <Link to="/auth/login">
                    <Button variant="contained" color="primary">
                      Log in
                    </Button>
                  </Link>
                ) : (
                  <Button onClick={signOut} variant="outlined" color="primary">
                    Log out
                  </Button>
                )}
              </li>
              {!isNerd && !isAnonymous && (
                <li className="navbar-right-item">
                  <RequestButton
                    open={requestDialogOpen}
                    setOpen={setRequestDialogOpen}
                    requestToBeNerd={requestToBeNerd}
                  />
                </li>
              )}
            </ul>
          ) : (
            <div className="navbar-mobile-controls">
              {isAdmin && (
                <div className="navbar-right-item">
                  <Link to="admin">
                    <Button variant="contained" color="primary">
                      Admin page
                    </Button>
                  </Link>
                </div>
              )}
              {isNull || isAnonymous ? (
                <Link to="/auth/login">
                  <Button variant="contained" color="primary">
                    Log in
                  </Button>
                </Link>
              ) : (
                <Button onClick={signOut} variant="outlined" color="primary">
                  Log out
                </Button>
              )}

              <IconButton
                onClick={() => setSidebarOpen(true)}
                className="navbar-mobile-button"
              >
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

export default Navbar;
