import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { getPlayer } from "../../../services/firebaseDatabase";
import CardComponent from "../../../common-components/CardDisplay/CardComponent";

export const MatchMakingContext = createContext({});

export const MatchMakingProvider = ({ children }) => {
  const [selectedAlgo, setSelectedAlgo] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { signed } = useContext(AuthContext);
  const [players, setPlayers] = useState(null);
  const [error, setError] = useState("");
  // const [playersToBalance, setPlayersToBalance] = useState([]);
  const [algoOptions, setAlgoOptions] = useState({});
  const [cardReadyCounter, setCardReadyCounter] = useState(0);

  const handleCardLoad = () => {
    setCardReadyCounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (signed) {
      (async () => {
        const players_ = await getPlayer("");
        setPlayers(players_);
      })();
    }
  }, [signed]);

  useEffect(() => {
    setError(
      selectedOptions.length === 10
        ? ""
        : "You need exactly 10 players to balance a game"
    );
  }, [selectedOptions]);

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
              sx={{ height: "inherit" }}
              onLoad={handleCardLoad}
              clickable={false}
            />
          ),
        }))
      : [];
  }, [players]);

  // const balance = (event) => {
  //   event.preventDefault();
  //   if (error) {
  //     return;
  //   }
  //   setPlayersToBalance(
  //     selectedOptions.map((player) => ({
  //       name: players[player].name,
  //       ranks: [
  //         players[player].top,
  //         players[player].jungle,
  //         players[player].mid,
  //         players[player].adc,
  //         players[player].support,
  //       ],
  //     }))
  //   );
  // };

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
      }}
    >
      {children}
    </MatchMakingContext.Provider>
  );
};
