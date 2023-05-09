import React, { useContext, useEffect, useState } from "react";
import {
  MatchMakingContext,
  MatchMakingProvider,
} from "./context/matchMakingContext";
import { theme } from "../../theme";
import PlayerSelectionStep from "./steps/playerSelectionStep";
import AlgorithmSelectionStep from "./steps/algorithmSelectionStep";
import ResultStep from "./steps/resultStep";
import { Button } from "@mui/material";
import { MiscContext } from "../../contexts/miscContext";

export default function Matchmaking() {
  const [step, setStep] = useState(0);
  const { getCardbackground } = useContext(MiscContext);
  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
    getCardbackground();
  }, []);

  return (
    <MatchMakingProvider>
      <div
        style={{
          width: "80%",
          // height: "450px",
          minHeight: "400px",
          border: "2px solid black",
          borderRadius: 10,
          margin: "auto",
          marginTop: "30px",
          background: theme.palette.background.default,
          position: "relative",
          pointerEvents: "text",
          zIndex: 0,
          overflow: "hidden",
          paddingBottom: "60px",
        }}
      >
        {step === 0 && <PlayerSelectionStep setIsOk={setIsOk} />}
        {step === 1 && <AlgorithmSelectionStep setIsOk={setIsOk} />}
        {step === 2 && <ResultStep />}
        <Button
          style={{ position: "absolute", bottom: "20px", left: "20px" }}
          variant="outlined"
          disabled={step === 0}
          onClick={() => setStep((prev) => prev - 1)}
        >
          Back
        </Button>
        <Button
          style={{ position: "absolute", bottom: "20px", right: "20px" }}
          variant="outlined"
          disabled={step === 2 || !isOk}
          onClick={() => setStep((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </MatchMakingProvider>
  );
}
