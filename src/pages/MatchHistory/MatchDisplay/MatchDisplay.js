import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { theme } from "../../../theme";
import MatchSummary from "./MatchSummary";
import MatchDetails from "./MatchDetails";
import { useMemo } from "react";

export default function MatchDisplay({ match }) {
  const matchMemo = useMemo(() => match, [match]);
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 0,
          "&.MuiPaper-root": {
            borderRadius: "7px",
          },
        }}
      >
        <AccordionSummary>
          <MatchSummary match={matchMemo} />
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <MatchDetails match={matchMemo} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
