import {
  CHAMPIONICONURL,
  championIds,
} from "../../common-components/resources";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import "./MatchHistoryFilter.css";

function Filters({
  playerFilter,
  setChampionFilter,
  setPlayerFilter,
  championFilter,
  players,
}) {
  const [open, setOpen] = useState(false);
  const playerList = Object.values(players);

  const handleChampionFilterChange = (e) => {
    const {
      target: { value },
    } = e;
    setChampionFilter(value);
  };

  const handlePlayerFilterChange = (e) => {
    const {
      target: { value },
    } = e;
    setPlayerFilter(value);
  };

  return (
    <div className="filter-container">
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        className="filter-icon-button"
        sx={{ marginLeft: "10px" }}
      >
        <TuneIcon fontSize="large" />
      </IconButton>
      <motion.div
        initial={{ opacity: 0, scale: 0, display: "none" }}
        animate={{
          opacity: +open,
          scale: `${+open}, 1`,
          display: open ? "flex" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="filter-controls"
      >
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Player Filter</InputLabel>
          <Select
            multiple
            value={playerFilter}
            onChange={handlePlayerFilterChange}
            input={
              <OutlinedInput id="select-multiple-chip2" label="Player filter" />
            }
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={players[value].name} />
                ))}
              </Box>
            )}
          >
            {playerList.map(({ name, name_id }) => (
              <MenuItem key={name} value={name_id} selected>
                <p className="menu-item-text">{name}</p>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Champion filter</InputLabel>
          <Select
            multiple
            value={championFilter}
            onChange={handleChampionFilterChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="Champion filter"
              />
            }
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {Object.entries(championIds)
              .sort(function (a, b) {
                return a[1] > b[1] ? 1 : -1;
              })
              .map(([id, name]) => (
                <MenuItem key={id} value={name} className="menu-item-content">
                  <img
                    src={`${CHAMPIONICONURL}${id}.png`}
                    alt={name}
                    width={25}
                  />
                  <p className="menu-item-text">{name}</p>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </motion.div>
    </div>
  );
}

export default memo(Filters);
