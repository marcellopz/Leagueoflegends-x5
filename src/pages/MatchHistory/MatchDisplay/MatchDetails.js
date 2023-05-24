import React, { useEffect, useRef, useState } from "react";
import useMatchData from "./useMatchData";
import { Paper } from "@mui/material";
import PlayerLine from "./PlayerLine";

export default function MatchDetails({ match }) {
  const {
    blueTeam,
    redTeam,
    blueMaxTanked,
    redMaxTanked,
    redKils,
    blueKills,
    redMaxDamage,
    redMaxGold,
    blueMaxDamage,
    blueMaxGold,
    blueWin,
    redWin,
    colorWin,
    colorLose,
  } = useMatchData(match);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [width1, setWidth1] = useState(0);
  const [width2, setWidth2] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth1(ref1.current?.clientWidth);
      setWidth2(ref2.current?.clientWidth);
    });
    setWidth1(ref1.current?.clientWidth);
    setWidth2(ref2.current?.clientWidth);
  }, []);

  return (
    <div>
      <Paper
        sx={{
          borderRadius: "7px",
          background: blueWin ? colorWin : colorLose,
          width: "100%",
          padding: "5px",
          color: "gainsboro",
        }}
        ref={ref1}
      >
        {blueTeam.map((p) => (
          <PlayerLine
            player={p}
            key={p.participantId}
            totalKills={blueKills}
            maxDamage={blueMaxDamage}
            maxGold={blueMaxGold}
            maxTank={blueMaxTanked}
            width={width1}
            showItems
          />
        ))}
      </Paper>
      <Paper
        sx={{
          borderRadius: "7px",
          background: redWin ? colorWin : colorLose,
          width: "100%",
          padding: "5px",
          color: "gainsboro",
        }}
        ref={ref2}
      >
        {redTeam.map((p) => (
          <PlayerLine
            player={p}
            key={p.participantId}
            totalKills={redKils}
            maxDamage={redMaxDamage}
            maxGold={redMaxGold}
            maxTank={redMaxTanked}
            width={width2}
            showItems
          />
        ))}
      </Paper>
    </div>
  );
}
