import React, { useRef, useEffect, useState, useContext } from "react";
import interroga from "../../pages/Home/interroga";
import { getPlayerData } from "../../services/firebaseDatabase";
import { MiscContext } from "../../contexts/miscContext";
import { motion } from "framer-motion";

function CardComponent({ name, ranks, sx, label, onLoad }) {
  const canvasRef = useRef(null);
  const [photoSrc, setPhotoSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const { cardBackground } = useContext(MiscContext);

  useEffect(() => {
    (async () => {
      getPlayerData(name)
        .then((r2) => {
          setPhotoSrc(r2 ? r2.photo : interroga);
        })
        .catch(() => {
          setPhotoSrc(interroga);
        })
        .finally(() => {
          setTimeout(() => setLoading(false), 500);
        });
    })();
  }, [name]);

  useEffect(() => {
    if (loading) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = cardBackground;

    const photo = new Image();
    photo.src = photoSrc;

    image.onload = () => {
      onLoad && onLoad();
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(photo, 40, 60);
      context.drawImage(image, 0, 0);
      context.font = "bold italic 30px Papyrus";
      context.fillStyle = "white";

      // area de texto do nome é de ~360 x 60
      // tamanho ideal de foto é de ~250 x 180

      let startString = (350 - context.measureText(label).width) / 2;

      context.fillText(label, startString, 50);

      context.font = "bold italic 23px Courier New";
      context.fillStyle = "black";
      context.fillText(ranks.top, 255, 267);
      context.fillText(ranks.jungle, 255, 295);
      context.fillText(ranks.mid, 255, 323);
      context.fillText(ranks.adc, 255, 351);
      context.fillText(ranks.support, 255, 379);
      setLoading2(false);
    };
  }, [label, photoSrc, ranks, cardBackground, loading]);

  if (loading) {
    return null;
  }

  return (
    <motion.div
      style={{ height: "100%" }}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        },
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: "2px solid black",
          borderRadius: 5,
          display: loading2 ? "none" : "block",
          ...sx,
        }}
      />
    </motion.div>
  );
}

export default CardComponent;
