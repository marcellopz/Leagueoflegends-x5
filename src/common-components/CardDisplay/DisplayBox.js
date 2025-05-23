import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "../../theme";

function CardBox({ card, scale, offset, zIndex }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{
        opacity: 1,
        translateX: `calc(-50% + ${offset}px)`,
        scale: scale > 0.1 ? scale : 0,
      }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        left: `50%`,
        top: "50%",
        translateY: "-50%",
        zIndex: zIndex,
        boxShadow: 10,
      }}
    >
      {card}
    </motion.div>
  );
}

export default function DisplayBox({ cards }) {
  const [index, setIndex] = useState();

  useEffect(() => {
    setIndex(parseInt(cards.length / 2));
  }, [cards]);

  if (cards.length === 0 || typeof cards === "undefined") {
    return;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        border: "2px solid black",
        borderRadius: 10,
        background: "black",
        position: "relative",
        pointerEvents: "text",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={() => setIndex((prev) => (prev === 0 ? prev : prev - 1))}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "50px",
          color: theme.palette.primary.main,
          pointerEvents: "all",
          zIndex: 99,
          background: "rgba(0,0,0,0.7)",
        }}
      >
        <KeyboardArrowLeftIcon fontSize="large" />
      </IconButton>
      <IconButton
        variant="contained"
        onClick={() =>
          setIndex((prev) => (prev === cards.length - 1 ? prev : prev + 1))
        }
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "50px",
          color: theme.palette.primary.main,
          pointerEvents: "all",
          zIndex: 99,
          background: "rgba(0,0,0,0.7)",
        }}
      >
        <KeyboardArrowRightIcon fontSize="large" />
      </IconButton>
      {cards.map((card, key) => {
        const abs = Math.abs(key - index);
        const zIndex = abs * -1;
        const scale = 1.2 - abs * 0.1;
        const offset = Math.sqrt(abs) * 180 * Math.sign(key - index);
        return (
          <CardBox
            key={key}
            card={card}
            offset={offset}
            scale={scale}
            zIndex={zIndex}
          />
        );
      })}
    </div>
  );
}
