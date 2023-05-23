import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { theme } from "../../../theme";
import MatchSummary from "./MatchSummary";
import MatchDetails from "./MatchDetails";
import { useCallback, useMemo, useState } from "react";

export default function MatchDisplay({ match }) {
  const [expanded, setExpanded] = useState(false);
  const matchMemo = useMemo(() => match, [match]);

  const toggleExpand = useCallback(() => setExpanded((prev) => !prev), []);

  return (
    <Accordion
      expanded={expanded}
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: 0,
        "&.MuiPaper-root": {
          borderRadius: "7px",
        },
        "& .MuiAccordionSummary-root:hover, .MuiButtonBase-root:hover": {
          cursor: "default",
        },
      }}
    >
      <AccordionSummary>
        <MatchSummary
          match={matchMemo}
          expanded={expanded}
          toggleExpanded={toggleExpand}
        />
      </AccordionSummary>
      <AccordionDetails
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <MatchDetails match={matchMemo} />
      </AccordionDetails>
    </Accordion>
  );
}
