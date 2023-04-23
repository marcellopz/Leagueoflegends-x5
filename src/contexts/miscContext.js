import { createContext, useState } from "react";
import imageSrc from "./assets/img";
import { getCardBackgroundTradicional } from "../services/firebaseDatabase";

export const MiscContext = createContext({});

export const MiscProvider = ({ children }) => {
  const [cardBackground, setCardBackground] = useState("");

  const getCardbackground = () => {
    getCardBackgroundTradicional()
      .then((bd) => {
        setCardBackground(bd ? bd : imageSrc);
      })
      .catch(() => {
        setCardBackground(imageSrc);
      });
  };

  return (
    <MiscContext.Provider value={{ cardBackground, getCardbackground }}>
      {children}
    </MiscContext.Provider>
  );
};
