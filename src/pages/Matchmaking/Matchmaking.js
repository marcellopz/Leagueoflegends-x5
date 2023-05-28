import React, { useContext, useEffect, useState } from "react";
import { MatchMakingProvider } from "./context/matchMakingContext";
import PlayerSelectionStep from "./steps/playerSelectionStep";
import AlgorithmSelectionStep from "./steps/algorithmSelectionStep";
import ResultStep from "./steps/resultStep";
import { Button } from "@mui/material";
import { MiscContext } from "../../contexts/miscContext";
import X5pageContentArea from "../../common-components/X5pageContentArea";

export default function Matchmaking() {
  const [step, setStep] = useState(0);
  const { getCardbackground } = useContext(MiscContext);
  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
    getCardbackground();
  }, []);

  return (
    <MatchMakingProvider>
      <X5pageContentArea>
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
      </X5pageContentArea>
    </MatchMakingProvider>
  );
}
