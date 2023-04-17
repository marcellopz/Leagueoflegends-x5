import React, { useRef, useEffect, useState } from "react";
import imageSrc from "./img";
import { getPlayerData } from "../../services/firebaseDatabase";

function PlayerDisplay({ name, ranks, sx }) {
  const canvasRef = useRef(null);
  const [photoSrc, setPhotoSrc] = useState("");

  useEffect(() => {
    (async () => {
      getPlayerData(name).then((r2) => {
        setPhotoSrc(r2?.photo);
      });
    })();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = imageSrc;

    const photo = new Image();
    photo.src = photoSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(photo, 40, 60);
      context.drawImage(image, 0, 0);
      context.font = "bold italic 30px Papyrus";
      context.fillStyle = "white";

      // area de texto do nome é de ~360 x 60
      // tamanho ideal de foto é de ~250 x 180

      let startString = (350 - context.measureText(name).width) / 2;

      context.fillText(name, startString, 50);

      context.font = "bold italic 23px Courier New";
      context.fillStyle = "black";
      context.fillText(ranks.top, 255, 267);
      context.fillText(ranks.jungle, 255, 295);
      context.fillText(ranks.mid, 255, 323);
      context.fillText(ranks.adc, 255, 351);
      context.fillText(ranks.support, 255, 379);
    };
  }, [name, photoSrc, ranks, imageSrc]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "3px solid black",
        borderRadius: 6,
        ...sx,
      }}
    ></canvas>
  );
}

export default PlayerDisplay;
