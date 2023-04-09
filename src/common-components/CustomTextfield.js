import { Box, ClickAwayListener } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export default function CustomTextfield({ onChange, type, width, label, sx }) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState("");

  const handleClick = () => {
    setClicked(true);
  };

  const handleClickAway = () => {
    setClicked(false);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        onClick={handleClick}
        sx={{
          "&:hover": {
            backgroundColor: clicked ? "#f9f9f9" : "#e7e7e7",
          },
          height: clicked ? "2.8rem" : "3rem",
          backgroundColor: clicked ? "#f9f9f9" : "#ededed",
          borderRadius: 1,
          width: width,
          borderColor: "#000",
          borderStyle: clicked ? "outset" : "hidden",
          borderWidth: 1.5,
          cursor: "text",
          position: "relative",
          ...sx,
        }}
      >
        <input
          style={{
            outline: "none",
            border: "0",
            background: "none",
            padding: "1.2em 0.5rem 0.35em",
            width: "-webkit-fill-available",
            height: "-webkit-fill-available",
            fontSize: "1rem",
            color: "#333",
            fontWeight: 700,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          type={type}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <label
          style={{
            fontFamily: "'FF Mark W05', sans-serif",
            position: "absolute",
            top: "32%",
            left: "1.6em",
            fontSize: "0.8rem",
            fontWeight: "800",
            letterSpacing: "0.1em",
            pointerEvents: "none",
            color: "#525252",
            display: clicked || value ? "none" : "",
          }}
        >
          {label}
        </label>
        <span
          style={{
            fontFamily: "'FF Mark W05', sans-serif",
            position: "absolute",
            top: clicked ? "10%" : "13%",
            left: "0.7em",
            fontSize: "0.63rem",
            fontWeight: "800",
            letterSpacing: "0.1em",
            pointerEvents: "none",
            color: "#525252",
            display: clicked || value ? "" : "none",
          }}
        >
          {label}
        </span>
      </Box>
    </ClickAwayListener>
  );
}

CustomTextfield.defaultProps = {
  onChange: (e) => {
    console.log(e);
  },
  type: "text",
  width: "300px",
  label: "label",
};

CustomTextfield.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  width: PropTypes.string,
  label: PropTypes.string,
};
