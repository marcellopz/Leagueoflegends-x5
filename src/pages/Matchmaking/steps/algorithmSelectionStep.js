import React, { useContext, useEffect, useState } from "react";
import { MatchMakingContext } from "../context/matchMakingContext";
import {
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./algorithmSelectionStep.css";

const formAlgos = {
  cheezeV1: {
    label: "Cheeze-v1",
    description:
      "First matchmaking algorithm, tries to make a fair match with same ranks accross all lanes",
    fields: [
      {
        id: "numberOfMatches",
        label: "Number of options",
        type: "number",
        initialValue: 5,
      },
    ],
  },
  cheezeV2: {
    label: "Cheeze-v2",
    description:
      "Matchmaking algorithm with tolerance, tries to make a fair match with allowed rank gaps within the tolerance",
    fields: [
      {
        id: "numberOfMatches",
        label: "Number of options",
        type: "number",
      },
      {
        id: "tolerance",
        label: "Tolerance",
        type: "number",
      },
      {
        id: "preset",
        label: "Preset roles",
        type: "preset",
      },
    ],
  },
  claudeV1: {
    label: "Claude-v1",
    description:
      "Balances teams based on players' average ranks, creating teams with similar total strength",
    fields: [
      {
        id: "numberOfMatches",
        label: "Number of options",
        type: "number",
      },
    ],
  },
  grilhaV1: {
    label: "Grilha-v1",
    description:
      "Generates match options that assign players to a broader range of roles, promoting diversity in lane assignments while ensuring fair matches within the specified tolerance.",
    fields: [
      {
        id: "numberOfMatches",
        label: "Number of options",
        type: "number",
      },
      {
        id: "tolerance",
        label: "Tolerance",
        type: "number",
      },
    ],
  },
};

const algos = ["", ...Object.keys(formAlgos)];

const getField = (
  field,
  players,
  values,
  setValues,
  presetPositions,
  handlePresetChange
) => {
  if (field.type === "number") {
    return (
      <div className="algorithm-field-container">
        <InputLabel className="algorithm-label">{field.label}</InputLabel>
        <TextField
          type="number"
          value={values[field.id] ?? ""}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, [field.id]: e.target.value }))
          }
          className="algorithm-text-field"
          inputProps={{ min: 0 }}
          size="small"
          fullWidth
        />
      </div>
    );
  }
  if (field.type === "preset") {
    let options = ["", ...players];
    return (
      <div className="preset-field-container">
        <InputLabel className="algorithm-label preset-label">
          Pre-set lanes
        </InputLabel>
        <Grid
          className="preset-lanes-container"
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {["Top", "Jungle", "Mid", "Adc", "Support"].map((lane) => (
            <React.Fragment key={lane}>
              <Grid item xs={3} className="preset-lane-label">
                <p>{lane}</p>
              </Grid>
              <Grid item xs={4}>
                <Select
                  className="preset-select"
                  fullWidth
                  value={presetPositions[lane][0]}
                  onChange={(e) => handlePresetChange(e.target.value, lane, 0)}
                >
                  {options.map((player) => (
                    <MenuItem value={player} key={player}>
                      {player === "" ? "-" : player}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={1} className="lane-vs-label">
                <p>vs</p>
              </Grid>
              <Grid item xs={4}>
                <Select
                  className="preset-select"
                  fullWidth
                  value={presetPositions[lane][1]}
                  onChange={(e) => handlePresetChange(e.target.value, lane, 1)}
                >
                  {options.map((player) => (
                    <MenuItem value={player} key={player}>
                      {player === "" ? "-" : player}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </div>
    );
  }
};

export default function AlgorithmSelectionStep({ setIsOk }) {
  const [error, setError] = useState(
    "Choose an algorithm for balancing the match"
  );
  const [values, setValues] = useState({ numberOfMatches: 5, tolerance: 1 });
  const { selectedOptions, selectedAlgo, setSelectedAlgo, setAlgoOptions } =
    useContext(MatchMakingContext);
  const [presetPositions, setPresetPositions] = useState({
    Top: ["", ""],
    Jungle: ["", ""],
    Mid: ["", ""],
    Adc: ["", ""],
    Support: ["", ""],
  });

  const MAX_NUMBER_OF_MATCHES = 15;

  const handleAlgoSelect = (e) => {
    setSelectedAlgo(e.target.value);
  };

  const handlePresetChange = (value, position, side) => {
    setPresetPositions((prev) => ({
      ...prev,
      [position]:
        side === 0 ? [value, prev[position][1]] : [prev[position][0], value],
    }));
  };

  useEffect(() => {
    setAlgoOptions({ options: values, presetPositions });
    switch (selectedAlgo) {
      case "cheezeV1":
        if (!(+values.numberOfMatches > 0)) {
          setError("Choose how many matches to generate");
          break;
        }
        if (values.numberOfMatches > MAX_NUMBER_OF_MATCHES) {
          setError(
            `Too many matches! The maximum is ${MAX_NUMBER_OF_MATCHES}.`
          );
          break;
        }
        setError(false);
        break;
      case "cheezeV2":
        if (!(values.numberOfMatches > 0)) {
          setError("Choose how many matches to generate");
          break;
        }
        if (values.numberOfMatches > MAX_NUMBER_OF_MATCHES) {
          setError(
            `Too many matches! The maximum is ${MAX_NUMBER_OF_MATCHES}.`
          );
          break;
        }
        if (!(values.tolerance >= 0)) {
          setError("Choose a value for the tolerance");
          break;
        }
        const allPreset = [
          ...presetPositions.Top,
          ...presetPositions.Jungle,
          ...presetPositions.Mid,
          ...presetPositions.Adc,
          ...presetPositions.Support,
        ].filter((a) => a !== "");
        if (new Set(allPreset).size !== allPreset.length) {
          setError("You've chosen one player for multiple roles");
          break;
        }
        setError(false);
        break;
      case "claudeV1":
        if (!(values.numberOfMatches > 0)) {
          setError("Choose how many matches to generate");
          break;
        }
        if (values.numberOfMatches > MAX_NUMBER_OF_MATCHES) {
          setError(
            `Too many matches! The maximum is ${MAX_NUMBER_OF_MATCHES}.`
          );
          break;
        }
        setError(false);
        break;
      case "grilhaV1":
        if (!(values.numberOfMatches > 0)) {
          setError("Choose how many matches to generate");
          break;
        }
        if (values.numberOfMatches > MAX_NUMBER_OF_MATCHES) {
          setError(
            `Too many matches! The maximum is ${MAX_NUMBER_OF_MATCHES}.`
          );
          break;
        }
        if (!(values.tolerance >= 0)) {
          setError("Choose a value for the tolerance");
          break;
        }
        setError(false);
        break;
      case "":
        setError("Choose an algorithm for balancing the match");
        break;
      default:
        setError("Unknown algorithm selected");
        break;
    }
  }, [
    selectedAlgo,
    presetPositions,
    values,
    setAlgoOptions,
    MAX_NUMBER_OF_MATCHES,
  ]);

  useEffect(() => {
    setIsOk(!error);
  }, [error, setIsOk]);

  return (
    <div className="algorithm-selection-form">
      <Typography className="algorithm-selection-title">
        Select the matchmaking algorithm
      </Typography>
      <InputLabel id="algo-select" className="algorithm-label">
        Algorithm
      </InputLabel>
      <Select
        labelId="algo-select"
        value={selectedAlgo}
        label="Algorithm"
        onChange={handleAlgoSelect}
        placeholder="Algorithm"
        className="algorithm-select"
        fullWidth
      >
        {algos.map((algo) => (
          <MenuItem value={algo} key={algo}>
            <ListItemText
              primary={formAlgos[algo]?.label ?? "-"}
              secondary={formAlgos[algo]?.description ?? ""}
            />
          </MenuItem>
        ))}
      </Select>
      {selectedAlgo && (
        <Typography className="algorithm-selection-description">
          {formAlgos[selectedAlgo].description}
        </Typography>
      )}
      {selectedAlgo && (
        <div className="algorithm-fields-wrapper">
          {formAlgos[selectedAlgo].fields
            .filter((field) => field.type === "number")
            .map((selected) => (
              <React.Fragment key={selected.label ?? selected.id}>
                {getField(
                  selected,
                  selectedOptions,
                  values,
                  setValues,
                  presetPositions,
                  handlePresetChange
                )}
              </React.Fragment>
            ))}
        </div>
      )}
      {selectedAlgo &&
        formAlgos[selectedAlgo].fields
          .filter((field) => field.type === "preset")
          .map((selected) => (
            <React.Fragment key={selected.label ?? selected.id}>
              {getField(
                selected,
                selectedOptions,
                values,
                setValues,
                presetPositions,
                handlePresetChange
              )}
            </React.Fragment>
          ))}
      {error && <Typography className="error-message">{error}</Typography>}
    </div>
  );
}
