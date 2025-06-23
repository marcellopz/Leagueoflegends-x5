import React, { useMemo, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CardComponent from "./CardComponent";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { IconButton } from "@mui/material";

export default function CardDisplay({ players }) {
  const [goToSlide, setGoToSlide] = useState(0);

  const cards = useMemo(() => {
    if (!players) return [];

    // Get filtered players
    const filteredPlayers = Object.keys(players).filter(
      (player) => !players[player].hide
    );

    if (filteredPlayers.length === 0) return [];

    // Generate a random rotation index
    const rotationIndex = Math.floor(Math.random() * filteredPlayers.length);

    // Rotate the array - takes elements from rotationIndex to end, and adds elements from beginning to rotationIndex
    const rotatedPlayers = [
      ...filteredPlayers.slice(rotationIndex),
      ...filteredPlayers.slice(0, rotationIndex),
    ];

    // Create cards from rotated array
    return rotatedPlayers.map((player, index) => ({
      key: player,
      content: (
        <CardComponent
          name={player}
          ranks={players[player]}
          label={players[player].name}
          key={player}
          sx={{ margin: "4px", height: "300px" }}
          clickable={true}
        />
      ),
      onClick: () => {
        setGoToSlide(index);
      },
    }));
  }, [players]);

  return (
    <>
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={4}
        animationConfig={config.stiff}
        offsetFn={(offsetFromCenter) => {
          const absOffset = Math.abs(offsetFromCenter);
          return {
            opacity: 1,
            filter: `brightness(${1 - offsetFromCenter ** 2 * 0.05})`,
            transform: `translateY(-50%) translateX(-50%) translateX(${
              -1 * offsetFromCenter ** 3
            }px) scale(${1 - absOffset * 0.1})`,
          };
        }}
      />
      <IconButton
        onClick={() =>
          setGoToSlide((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
        }
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "50px",
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
          setGoToSlide((prev) => (prev === cards.length - 1 ? 0 : prev + 1))
        }
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "50px",
          pointerEvents: "all",
          zIndex: 99,
          background: "rgba(0,0,0,0.7)",
        }}
      >
        <KeyboardArrowRightIcon fontSize="large" />
      </IconButton>
    </>
  );
}
