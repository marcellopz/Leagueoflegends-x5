import { createContext, useState } from "react";
import imageSrc from "./assets/img";
import { getCardBackgroundTradicional } from "../services/firebaseDatabase";

export const MiscContext = createContext({});

export const MiscProvider = ({ children }) => {
  const [cardBackground, setCardBackground] = useState(imageSrc);

  const getCardbackground = () => {
    getCardBackgroundTradicional()
      .then((bd) => {
        setCardBackground(bd);
      })
      .catch(() => {});
  };

  return (
    <MiscContext.Provider value={{ cardBackground, getCardbackground }}>
      {children}
    </MiscContext.Provider>
  );
};
