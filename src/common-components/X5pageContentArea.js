import React from "react";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { CircularProgress, Typography } from "@mui/material";

export default function X5pageContentArea({
  children,
  loading,
  title,
  removeMarginTop,
  sx,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {loading ? (
        <div style={{ marginTop: "100px" }}>
          <CircularProgress />
        </div>
      ) : (
        <motion.div
          style={{
            width: "100%",
            maxWidth: "1600px",
            background: theme.palette.background.bd,
            borderRadius: "15px",
            marginTop: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            position: "relative",
            overflow: "hidden",
            paddingTop: removeMarginTop ? "" : "20px",
            paddingBottom: "70px",
            ...sx,
          }}
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            },
          }}
        >
          {title && (
            <div style={{ marginLeft: "20px" }}>
              <Typography fontSize={25}>{title}</Typography>
            </div>
          )}
          {children}
        </motion.div>
      )}
    </div>
  );
}
