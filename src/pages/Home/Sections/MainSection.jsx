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
        className="grid-item big-item"
        sx={{
          minHeight: "470px",
        }}
      >
        <Typography variant="h5" marginBottom={1} fontWeight={500}>
          Legend Cards
        </Typography>
        <CardDisplay players={players} />
        {isAnonymous && (
          <span>
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
