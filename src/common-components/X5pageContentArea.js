import React from "react";
import { motion } from "framer-motion";
import { CircularProgress, Typography } from "@mui/material";

export default function X5pageContentArea({
  children,
  loading,
  title,
  removeMarginTop,
  sx,
  noBackground,
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
            borderRadius: "15px",
            marginTop: "20px",

            position: "relative",
            overflow: "hidden",
            paddingTop: removeMarginTop ? "" : "20px",
            paddingBottom: "70px",
            ...(noBackground
              ? {}
              : {
                  // background: theme.palette.background.bd,
                  margin: "20px 13px 0px 13px",
                  border: "1px solid",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }),
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
            <div style={{ margin: "0 0 16px 20px" }}>
              <Typography fontSize={25}>{title}</Typography>
            </div>
          )}
          {children}
        </motion.div>
      )}
    </div>
  );
}
