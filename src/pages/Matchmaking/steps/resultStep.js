import React, { useContext, useEffect, useState } from "react";
import BalanceMatchCheezeV1 from "../algorithms/cheezeV1";
import BalanceMatchCheezeV2 from "../algorithms/cheezeV2";
import { MatchMakingContext } from "../context/matchMakingContext";
import { Button, IconButton, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { theme } from "../../../theme";

const roles = ["Top", "Jungle", "Mid", "Adc", "Support"];

const buildLine = (matchup) => {
  return `${matchup[0].name.padStart(10, " ")} (${matchup[0].rank}) x (${
    matchup[1].rank
  }) ${matchup[1].name}`;
};

const getCopyPasteText = (matchups) => {
  let string = "";
  matchups.forEach((match, i) => {
    string += `Match ${i + 1}:\n`;
    string += `Top: ${buildLine(match.pairingsRoles.Top)}\n`;
    string += `Jng: ${buildLine(match.pairingsRoles.Jungle)}\n`;
    string += `Mid: ${buildLine(match.pairingsRoles.Mid)}\n`;
    string += `Adc: ${buildLine(match.pairingsRoles.Adc)}\n`;
    string += `Sup: ${buildLine(match.pairingsRoles.Support)}\n`;
    string += `Score: ${match.matchScore.blue} x ${match.matchScore.red} -> ${
      match.matchScore.blue + match.matchScore.red
    }\n\n`;
  });

  return string;
};

const ResultComponent = ({ match }) => {
  return (
    <div style={{ height: "fit-content" }}>
      <ul style={{ margin: "10px", listStyle: "none", padding: 0 }}>
        {roles.map((role, i) => {
          return (
            <li
              key={i}
              style={{
                display: "flex",
                backgroundColor:
                  i % 2 === 0
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.3)",
                padding: "5px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  textAlign: "end",
                  marginRight: "10px",
                }}
              >
                {role}
              </div>
              <div
                style={{
                  width: "100px",
                  textAlign: "end",
                  marginRight: "5px",
                }}
              >
                {match.pairingsRoles[role][0].name}
              </div>
              <div
                style={{ marginRight: "10px", width: "20px" }}
              >{`(${match.pairingsRoles[role][0].rank})`}</div>
              <div>vs</div>
              <div
                style={{ marginLeft: "10px" }}
              >{`(${match.pairingsRoles[role][1].rank})`}</div>
              <div style={{ width: "100px", marginLeft: "5px" }}>
                {match.pairingsRoles[role][1].name}
              </div>
            </li>
          );
        })}
        <li
          style={{
            display: "flex",
            backgroundColor: theme.palette.secondary.main,
            padding: "5px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: "50px",
              textAlign: "end",
              marginRight: "10px",
            }}
          >
            Scores
          </div>
          <div
            style={{
              width: "130px",
              textAlign: "end",
              marginRight: "10px",
            }}
          >
            {match.matchScore.blue}
          </div>
          <div>-</div>
          <div style={{ width: "130px", marginLeft: "10px" }}>
            {match.matchScore.red}
          </div>
        </li>
        <li
          style={{
            display: "flex",
            backgroundColor: theme.palette.secondary.dark,
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <div
            style={{
              width: "50px",
              textAlign: "end",
              marginRight: "10px",
            }}
          >
            Total
          </div>
          <div
            style={{
              width: "290px",
              textAlign: "center",
            }}
          >
            {match.matchScore.blue + match.matchScore.red}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default function ResultStep() {
  const { players, algoOptions, selectedOptions, selectedAlgo } =
    useContext(MatchMakingContext);
  const [playersToBalance, setPlayersToBalance] = useState(null);
  const [matchups, setMatchups] = useState([]);
  const [copyPastText, setCopyPasteText] = useState("");

  const balance = () => {
    if (!playersToBalance) {
      return;
    }
    const MAX_TRIES = +algoOptions.options.numberOfMatches * 10;
    let matchupsString = [];
    let matchups_ = [];
    let i = 0;
    let a;
    let stringA;
    if (selectedAlgo === "cheezeV1") {
      while (i++ < MAX_TRIES) {
        a = BalanceMatchCheezeV1(playersToBalance);
        stringA = JSON.stringify(a.pairings);
        if (matchupsString.includes(stringA)) {
          continue;
        }
        matchupsString.push(stringA);
        matchups_.push(a);
        if (matchups_.length === +algoOptions.options.numberOfMatches) {
          break;
        }
      }
      setMatchups(matchups_);
    }
    if (selectedAlgo === "cheezeV2") {
      while (i++ < MAX_TRIES) {
        a = BalanceMatchCheezeV2(
          playersToBalance,
          algoOptions.options.tolerance,
          algoOptions.presetPositions
        );
        if (a === null) {
          alert("Error");
          break;
        }
        stringA = JSON.stringify(a.pairings);
        if (matchupsString.includes(stringA)) {
          continue;
        }
        matchupsString.push(stringA);
        matchups_.push(a);
        if (matchups_.length === +algoOptions.options.numberOfMatches) {
          break;
        }
      }
      setMatchups(matchups_);
    }
  };

  useEffect(() => {
    setPlayersToBalance(
      selectedOptions.map((player) => ({
        name: players[player].name,
        ranks: [
          players[player].top,
          players[player].jungle,
          players[player].mid,
          players[player].adc,
          players[player].support,
        ],
        playerId: player,
      }))
    );
    if (playersToBalance?.length) {
      balance();
    }
  }, [selectedOptions]);

  useEffect(() => {
    setCopyPasteText(getCopyPasteText(matchups));
  }, [matchups]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ margin: "20px auto" }}>
          <Button
            variant="outlined"
            onClick={() => balance(playersToBalance)}
            sx={{ margin: "20px" }}
          >
            Reroll (rebola)
          </Button>
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(copyPastText);
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </div>
      </div>

      {matchups && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {matchups.map((match, i) => (
              <ResultComponent key={i} match={match} />
            ))}
          </div>
          <TextField
            value={copyPastText}
            multiline
            // height="100%"
            sx={{
              margin: "10px",
              minWidth: "400px",
              color: "gray",
              height: "inherit",
            }}
            inputProps={{
              sx: {
                fontFamily: '"Lucida Console", "Courier New", monospace',
                height: "-webkit-fill-available",
                justifyContent: "start",
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
