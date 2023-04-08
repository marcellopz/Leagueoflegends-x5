import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { getPlayer } from "../../services/firebaseDatabase";
import BalanceMatch from "./BalanceMatch";

export default function Matchmaking() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { signed } = useContext(AuthContext);
  const [players, setPlayers] = useState(null);
  const [error, setError] = useState("");
  const [playersToBalance, setPlayersToBalance] = useState([]);

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

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const balance = (event) => {
    event.preventDefault();
    if (error) {
      return;
    }
    setPlayersToBalance(
      selectedOptions.map((player) => ({
        name: player,
        ranks: [
          players[player].top,
          players[player].jungle,
          players[player].mid,
          players[player].adc,
          players[player].support,
        ],
      }))
    );
  };

  return (
    <div>
      <a href="home">Home</a>
      <h2>Multi-Select Page</h2>
      <p>Select one or more options:</p>
      <form>
        {players &&
          Object.keys(players).map((player) => (
            <div key={player}>
              <input
                type="checkbox"
                id={player}
                value={player}
                checked={selectedOptions.includes(player)}
                onChange={handleOptionChange}
              />
              <label htmlFor={player}>{player}</label>
            </div>
          ))}
      </form>
      <b>Selected options: {selectedOptions.join(", ")}</b>
      <div>
        <button onClick={balance}>Balance</button>
      </div>
      <div>
        <p style={{ color: "red" }}>{error}</p>
      </div>
      <BalanceMatch players={playersToBalance} />
    </div>
  );
}
