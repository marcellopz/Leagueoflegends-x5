import { createContext, useEffect, useMemo, useState } from "react";
import { getPlayer } from "../../../services/firebaseDatabase";
import CardComponent from "../../../common-components/CardDisplay/CardComponent";

export const isWildcardValid = (wildcardDetails) => {
  if (!wildcardDetails) {
    return false;
  }
  const { name, top, jungle, mid, adc, support } = wildcardDetails;
  return name && top > 0 && jungle > 0 && mid > 0 && adc > 0 && support > 0;
};

export const MatchMakingContext = createContext({});

export const MatchMakingProvider = ({ children }) => {
  const [selectedAlgo, setSelectedAlgo] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [players, setPlayers] = useState(null);
  const [error, setError] = useState("");
  const [algoOptions, setAlgoOptions] = useState({});
  const [cardReadyCounter, setCardReadyCounter] = useState(0);
  const [numberOfWildcards, setNumberOfWildcards] = useState(0);
  const [wildcardDetails, setWildcardDetails] = useState([]);

  const handleCardLoad = () => {
    setCardReadyCounter((prev) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      const players_ = await getPlayer("");
      setPlayers(players_);
    })();
  }, []);

  useEffect(() => {
    const validWildcards = wildcardDetails.filter(isWildcardValid);
    setError(
      selectedOptions.length + validWildcards.length === 10 &&
        wildcardDetails.length === validWildcards.length &&
        validWildcards.length === numberOfWildcards
        ? ""
        : "You need exactly 10 valid players to balance a game"
    );
  }, [selectedOptions, numberOfWildcards, wildcardDetails]);

  const cards = useMemo(() => {
    return players
      ? Object.keys(players).map((player) => ({
          name: player,
          card: (
            <CardComponent
              name={player}
              ranks={players[player]}
              label={players[player].name}
              key={player}
              sx={{ height: "100%" }}
              onLoad={handleCardLoad}
              clickable={false}
            />
          ),
        }))
      : [];
  }, [players]);

  const handleOptionChange = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions((prev) => [...prev, value]);
    }
  };

  return (
    <MatchMakingContext.Provider
      value={{
        players,
        error,
        selectedAlgo,
        setSelectedAlgo,
        handleOptionChange,
        setSelectedOptions,
        selectedOptions,
        cards,
        algoOptions,
        setAlgoOptions,
        cardReadyCounter,
        numberOfWildcards,
        setNumberOfWildcards,
        wildcardDetails,
        setWildcardDetails,
      }}
    >
      {children}
    </MatchMakingContext.Provider>
  );
};
