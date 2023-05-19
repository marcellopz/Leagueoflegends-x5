import React, { useEffect, useState } from "react";
import { getMatches } from "../../services/firebaseDatabase";
import MatchDisplay from "./MatchDisplay/MatchDisplay";
import { maxWidth } from "@mui/system";

export default function MatchHistory() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches().then((ms) => setMatches(ms));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1600px" }}>
        {Object.keys(matches)
          .reverse()
          .map((key) => (
            <div style={{ transform: "scale(80%)" }} key={key}>
              <MatchDisplay match={matches[key]} />
            </div>
          ))}
      </div>
    </div>
  );
}
