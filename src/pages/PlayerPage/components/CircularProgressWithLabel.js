import { Box, CircularProgress, Typography } from "@mui/material";
import { floatToPercentageString } from "../../../utils/utils";
import { useTheme } from "@emotion/react";

export default function CircularProgressWithLabel({ value }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        height: "200px",
        width: "200px",
        color: "black",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value * 100}
        size={200}
        color="primary"
        sx={{ position: "absolute", zIndex: 2 }}
      />
      <CircularProgress
        variant="determinate"
        value={100}
        color="secondary"
        size={200}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.primary"
          fontSize={25}
          sx={{ width: 100, textAlign: "center" }}
        >
          {`${floatToPercentageString(value)} Win rate`}
        </Typography>
      </Box>
    </Box>
  );
}
