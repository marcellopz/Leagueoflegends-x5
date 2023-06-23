import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { theme } from "../../../theme";
import MatchSummary from "./MatchSummary";
import MatchDetails from "./MatchDetails";
import { useCallback, useMemo, useState } from "react";

export default function MatchDisplay({ match, openDialog, roles }) {
  const [expanded, setExpanded] = useState(false);
  const matchMemo = useMemo(() => {
    if (roles) {
      let newParticipants = [];
      const entries = Object.entries(roles);
      ["top", "jungle", "mid", "adc", "support"].forEach((lane) => {
        const a = entries.filter((e) => e[1] === lane).map((idR) => idR[0]);
        newParticipants = [...newParticipants, ...a];
      });
      match.participants = newParticipants.map(
        (id) => match.participants.filter((part) => part.summonerId == id)[0]
      );
    }
    return match;
  }, [match, roles]);

  const toggleExpand = useCallback(() => setExpanded((prev) => !prev), []);

  return (
    <Accordion
      expanded={expanded}
      sx={{
        backgroundColor: theme.palette.background.match,
        padding: "5px",
        "&.MuiPaper-root": {
          borderRadius: "7px",
          cursor: "default",
        },
        "& .MuiAccordionSummary-root:hover, .MuiButtonBase-root:hover": {
          cursor: "default !important",
        },
        "& .css-1tmu6hb-MuiButtonBase-root-MuiAccordionSummary-root": {
          cursor: "default",
        },
      }}
    >
      <AccordionSummary>
        <MatchSummary
          match={matchMemo}
          expanded={expanded}
          toggleExpanded={toggleExpand}
          openDialog={openDialog}
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
