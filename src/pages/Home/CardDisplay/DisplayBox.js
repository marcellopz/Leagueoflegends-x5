import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IconButton } from "@mui/material";

function CardBox({ card, scale, offset, zIndex }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${50 + offset}%`,
        top: "15%",
        transform: `translateX(-50%) scale(${scale})`,
        zIndex: zIndex,
        boxShadow: 10,
      }}
    >
      {card}
    </div>
  );
}

const getCardIndex = (n, max) => {
  if (n >= 0) {
    return n;
  }
  return max + n;
};

export default function DisplayBox({ cards }) {
  const [index, setIndex] = useState(1);

  if (cards.length === 0 || typeof cards === "undefined") {
    return;
  }

  const keys = Array.from(Array(7).keys()).map((num) => num - 3);

  return (
    <div
      style={{
        width: "80%",
        minWidth: "700px",
        height: "500px",
        border: "6px solid black",
        borderRadius: 10,
        margin: "auto",
        background:
          "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(77,77,77,1) 100%)",
        position: "relative",
        pointerEvents: "text",
        zIndex: 0,
      }}
    >
      <IconButton
        onClick={() => setIndex((prev) => prev - 1)}
        style={{
          position: "absolute",
          top: "45%",
          left: "50px",
          color: "white",
          pointerEvents: "all",
          zIndex: 99,
        }}
      >
        <KeyboardArrowLeftIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={() => setIndex((prev) => prev + 1)}
        style={{
          position: "absolute",
          top: "45%",
          right: "50px",
          color: "white",
          pointerEvents: "all",
          zIndex: 99,
        }}
      >
        <KeyboardArrowRightIcon fontSize="large" />
      </IconButton>
      {keys.map((key) => {
        const realIndex = getCardIndex(key + index, cards.length);
        const zIndex = Math.abs(key) * -1;
        const scale = 1.2 + zIndex * 0.1;
        return (
          <CardBox
            key={key}
            card={cards[realIndex]}
            offset={key * 10}
            scale={scale}
            zIndex={zIndex}
          />
        );
      })}
    </div>
  );
}
