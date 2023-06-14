import React, { useMemo, useState } from "react";
import PersonalChampionStats from "./components/PersonalChampionStats";
import { Button, Grid } from "@mui/material";
import SummaryLastGames from "./components/SummaryLastGames";
import SummaryMatches from "./components/SummaryMatches";

export default function PlayerSummaryTab({
  champs,
  playerInfo,
  playerKey,
  selectedPlayerCardStats,
}) {
  const [showAllChamps, setShowAllChamps] = useState(false);
  const last20Matches = useMemo(() => {
    const keys = Object.keys(playerInfo.matches).slice(-20);
    return keys.map((key) => playerInfo.matches[key]);
  }, [playerInfo]);

  console.log({ champs, playerInfo, playerKey, selectedPlayerCardStats });
  return (
    <Grid container style={{ padding: "20px" }} spacing={2}>
      <Grid item md={5} xs={12} lg={4}>
        {/* champs summary */}
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              margin: "auto",
              maxWidth: "450px",
              minWidth: "350px",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                borderWidth: "0px 0px 1px 0px",
                borderStyle: "solid",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              {showAllChamps
                ? champs.map((champ) => (
                    <PersonalChampionStats
                      key={champ.championName}
                      champ={champ}
                    />
                  ))
                : champs
                    ?.slice(0, 8)
                    .map((champ) => (
                      <PersonalChampionStats
                        key={champ.championName}
                        champ={champ}
                      />
                    ))}
            </div>
            {champs.length > 8 && !showAllChamps && (
              <div style={{ display: "flex", paddingTop: "5px" }}>
                <Button
                  sx={{ margin: "auto" }}
                  onClick={() => setShowAllChamps(true)}
                >
                  Show all
                </Button>
              </div>
            )}
          </div>
        </div>
      </Grid>

      {/* matches summary */}
      <Grid item md={7} xs={12} lg={8}>
        <div>
          <SummaryLastGames games={last20Matches} />
          <SummaryMatches games={playerInfo.matches} />
        </div>
      </Grid>
    </Grid>
  );
}
