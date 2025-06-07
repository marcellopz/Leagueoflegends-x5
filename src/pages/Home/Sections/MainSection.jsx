import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import CardDisplay from "../../../common-components/CardDisplay/CardDisplay";
import GeneralStatsBox from "../GraphComponents/GeneralStatsBox";
import GamesGraph from "../GraphComponents/GamesGraph";
import { AuthContext } from "../../../contexts/authContext";
import "./MainSection.css";

const MainSection = ({ stats, players }) => {
  const { isAnonymous } = useContext(AuthContext);
  return (
    <Box className="main-section-container" id="main-section">
      <Box
        className="grid-item big-item relative"
        sx={{
          minHeight: "470px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            top: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            fontWeight: 500,
          }}
        >
          Legend Cards
        </Typography>
        {players && Object.keys(players).length > 0 ? (
          <CardDisplay players={players} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#888",
            }}
          >
            Loading player cards...
          </Box>
        )}
        {isAnonymous && (
          <span
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#888",
              width: "100%",
            }}
          >
            To see the card images, please log in and request permission.
          </span>
        )}
      </Box>
      <GeneralStatsBox stats={stats} players={players} />
      <GamesGraph stats={stats} />
    </Box>
  );
};

export default MainSection;
