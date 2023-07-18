import { Paper } from "@mui/material";
import MatchSummary from "./MatchSummary";
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
    <Paper
      sx={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.3)",
        padding: { xs: "5px", md: "15px" },
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
      <MatchSummary
        match={matchMemo}
        expanded={expanded}
        toggleExpanded={toggleExpand}
        openDialog={openDialog}
      />
    </Paper>
  );
}
