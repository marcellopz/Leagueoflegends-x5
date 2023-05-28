import React from "react";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { CircularProgress, Typography } from "@mui/material";

export default function X5pageContentArea({ children, loading, title }) {
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
            border: "2px solid black",
            position: "relative",
          }}
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 0,
              // y: 20,
            },
            animate: {
              opacity: 1,
              // y: 0,
              transition: {
                duration: 0.5,
              },
            },
          }}
        >
          {title && (
            <div style={{ margin: "20px" }}>
              <Typography fontSize={25}>{title}</Typography>
            </div>
          )}
          {children}
        </motion.div>
      )}
    </div>
  );
}
