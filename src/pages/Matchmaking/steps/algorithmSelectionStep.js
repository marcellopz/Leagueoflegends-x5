import React, { useContext, useEffect, useState } from "react";
import { MatchMakingContext } from "../context/matchMakingContext";
import {
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const formAlgos = {
  cheezeV1: {
    label: "Cheeze-v1",
    description:
      "First matchmaking algorithm, tries to make a fair match with same ranks accross all lanes",
    fields: [
      {
        id: "numberOfMatches",
        label: "Number of matches desired",
        type: "number",
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
      <div style={{ marginTop: "20px" }}>
        <InputLabel>{field.label}</InputLabel>
        <TextField
          type="number"
          value={values[field.id] ?? ""}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, [field.id]: e.target.value }))
          }
        />
      </div>
    );
  }
  if (field.type === "preset") {
    let options = ["", ...players];
    return (
      <>
        <InputLabel sx={{ marginY: "20px" }}>Pre-set lanes</InputLabel>
        <Grid
          sx={{ width: "100%", maxWidth: "450px" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {["Top", "Jungle", "Mid", "Adc", "Support"].map((lane) => (
            <React.Fragment key={lane}>
              <Grid
                item
                xs={3}
                sx={{ display: "flex", margin: "auto", justifyContent: "end" }}
              >
                <p>{lane}</p>
              </Grid>
              <Grid item xs={4}>
                <Select
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
              <Grid item xs={1}>
                <p>vs</p>
              </Grid>
              <Grid item xs={4}>
                <Select
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
      </>
    );
  }
};

export default function AlgorithmSelectionStep({ setIsOk }) {
  const [error, setError] = useState(
    "Choose an algorithm for balancing the match"
  );
  const [values, setValues] = useState({});
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
      case "":
        setError("Choose an algorithm for balancing the match");
    }
  }, [selectedAlgo, presetPositions, values]);

  useEffect(() => {
    setIsOk(!error);
  }, [error, values]);

  return (
    <div style={{ margin: "20px" }}>
      <p>Select the matchmaking algorithm</p>
      <InputLabel id="algo-select">Algorithm</InputLabel>
      <Select
        labelId="algo-select"
        value={selectedAlgo}
        label="Algorithm"
        onChange={handleAlgoSelect}
        placeholder="Algorithm"
        fullWidth
      >
        {algos.map((algo) => (
          <MenuItem value={algo} key={algo}>
            <ListItemText
              //   sx={{overflowWrap}}
              primary={formAlgos[algo]?.label ?? "-"}
              secondary={formAlgos[algo]?.description ?? ""}
            />
          </MenuItem>
        ))}
      </Select>
      {selectedAlgo && <p>{formAlgos[selectedAlgo].description}</p>}
      {selectedAlgo &&
        formAlgos[selectedAlgo].fields.map((selected) => (
          <React.Fragment key={selected.label ?? 0}>
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
