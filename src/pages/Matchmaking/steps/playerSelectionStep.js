import React, { useContext, useEffect, useState } from "react";
import { MatchMakingContext } from "../context/matchMakingContext";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { List } from "@mui/icons-material";
import { theme } from "../../../theme";

const columns = [
  {
    field: "name",
    headerName: "Name",
    type: "string",
    width: 120,
    sortable: true,
  },
  {
    field: "top",
    headerName: "Top",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
  {
    field: "jungle",
    headerName: "Jungle",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
  {
    field: "mid",
    headerName: "Mid",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
  {
    field: "adc",
    headerName: "Adc",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
  {
    field: "support",
    headerName: "Support",
    type: "number",
    width: 80,
    flex: 1,
    sortable: true,
  },
];

export default function PlayerSelectionStep({ setIsOk }) {
  const {
    players,
    cards,
    handleOptionChange,
    selectedOptions,
    error,
    setSelectedOptions,
    cardReadyCounter,
  } = useContext(MatchMakingContext);
  const [displayCard, setDisplayCard] = useState(true);

  const arrayOfPlayers =
    Object.keys(players ?? {}).map((player, i) => ({
      ...players[player],
      id: i,
      player_id: player,
    })) ?? [];

  useEffect(() => {
    setIsOk(!error);
  }, [error]);

  console.log(cardReadyCounter);

  return (
    <div>
      <div
        style={{
          marginLeft: "20px",
          display: "inline-flex",
          position: "relative",
          width: "100%",
        }}
      >
        <div>
          <p style={{ color: theme.palette.text.primary }}>
            Select the players for the match
          </p>
          <p style={{ color: theme.palette.secondary.main }}>
            {selectedOptions.length} selected
          </p>
        </div>
        <IconButton
          style={{ position: "absolute", right: "40px", top: "30px" }}
          onClick={() => setDisplayCard((prev) => !prev)}
        >
          <List />
        </IconButton>
      </div>

      {error && (
        <p style={{ color: theme.palette.error.main, margin: "20px" }}>
          {error}
        </p>
      )}
      <form>
        {displayCard && (
          <div
            style={{
              margin: "10px",
              backgroundColor: "black",
              display: "flex",
              flexWrap: "wrap",
              marginBottom: "20px",
              padding: "5px",
              paddingBottom: "20px",
              borderRadius: "20px",
              justifyContent: "space-evenly",
              minHeight: "800px",
            }}
          >
            {cards.map((card) => (
              <Box
                key={card.name}
                onClick={() => handleOptionChange(card.name)}
                sx={{
                  "&:hover": {
                    border: "1px solid " + theme.palette.primary.main,
                    cursor: "pointer",
                  },
                  border: selectedOptions.includes(card.name)
                    ? "1px solid yellow"
                    : "1px solid black",
                }}
                style={{
                  padding: "5px",
                  height: "300px",
                  marginBottom: "15px",
                  justifyContent: "center",
                  borderRadius: "5px",
                  display: cards.length > cardReadyCounter ? "none" : "block",
                }}
              >
                {card.card}
              </Box>
            ))}
            {cards.length > cardReadyCounter && (
              <CircularProgress
                sx={{ marginTop: "50px", marginBottom: "900px" }}
              />
            )}
          </div>
        )}
        {!displayCard && (
          <div
            style={{
              maxWidth: "900px",
              width: "95%",
              margin: "auto",
            }}
          >
            {players && (
              <DataGrid
                rows={arrayOfPlayers}
                columns={columns}
                density="compact"
                checkboxSelection
                hideFooter
                onRowSelectionModelChange={(a) =>
                  setSelectedOptions(a.map((b) => arrayOfPlayers[b].player_id))
                }
                rowSelectionModel={selectedOptions.map((a) =>
                  Object.keys(players).indexOf(a)
                )}
                sx={{
                  "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                    {
                      display: "none",
                    },
                }}
              />
            )}
          </div>
        )}
      </form>
      {error && (
        <p style={{ color: theme.palette.error.main, marginLeft: "20px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
