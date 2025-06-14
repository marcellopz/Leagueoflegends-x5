import { Box, Typography } from "@mui/material";
import React from "react";

const TitleValueBox = ({ title, value }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const duration = 1000; // Total animation duration in milliseconds
    const steps = 50; // Number of steps for the animation
    const increment = (value - displayValue) / steps;
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      setDisplayValue((prev) => {
        const nextValue = prev + increment;
        if (
          (increment > 0 && nextValue >= value) ||
          (increment < 0 && nextValue <= value)
        ) {
          clearInterval(interval);
          return value;
        }
        return nextValue;
      });
    }, intervalTime);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "150px",
        maxWidth: "220px",
        gap: "16px",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h3">{Math.round(displayValue)}</Typography>
    </Box>
  );
};

const GeneralStatsBox = ({ stats, players }) => {
  if (!stats || !players) {
    return null;
  }
  return (
    <Box className="mainsection-panel mainsection-small-panel">
      <TitleValueBox title="Number of Games" value={stats.numberOfGames} />
      <div className="small-item-divider" />
      <TitleValueBox
        title="Number of Legends"
        value={Object.keys(players).length}
      />
    </Box>
  );
};

export default GeneralStatsBox;
