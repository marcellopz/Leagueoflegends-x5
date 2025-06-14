import React, { useContext, useEffect, useState } from "react";
import { MatchMakingProvider } from "./context/matchMakingContext";
import PlayerSelectionStep from "./steps/playerSelectionStep";
import AlgorithmSelectionStep from "./steps/algorithmSelectionStep";
import ResultStep from "./steps/resultStep";
import { Button, Typography } from "@mui/material";
import { MiscContext } from "../../contexts/miscContext";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import "./Matchmaking.css"; // Import component styles

export default function Matchmaking() {
  const [step, setStep] = useState(0);
  const { getCardbackground } = useContext(MiscContext);
  const [isOk, setIsOk] = useState(false);

  const stepTitles = ["Select Players", "Configure Algorithm", "Results"];

  useEffect(() => {
    getCardbackground();
  }, []);

  return (
    <MatchMakingProvider>
      <X5pageContentArea title="Matchmaking">
        <div className="matchmaking-container">
          <div className="step-indicator">
            {stepTitles.map((title, index) => (
              <div
                key={index}
                className={`step-dot ${step === index ? "active" : ""}`}
              />
            ))}
          </div>
          <Typography className="step-title">{stepTitles[step]}</Typography>
          <div className="matchmaking-step-container">
            {step === 0 && <PlayerSelectionStep setIsOk={setIsOk} />}
            {step === 1 && <AlgorithmSelectionStep setIsOk={setIsOk} />}
            {step === 2 && <ResultStep />}
          </div>
          <div className="matchmaking-nav-buttons">
            <Button
              className="matchmaking-button"
              variant="outlined"
              disabled={step === 0}
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </Button>
            <Button
              className="matchmaking-button"
              variant="outlined"
              disabled={step === 2 || !isOk}
              onClick={() => setStep((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </X5pageContentArea>
    </MatchMakingProvider>
  );
}
