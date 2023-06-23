import React, { useEffect, useMemo, useState } from "react";
import { getMatchRoles, getMatches } from "../../services/firebaseDatabase";
import MatchDisplay from "./MatchDisplay/MatchDisplay";
import { Typography } from "@mui/material";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import EditMatchDialog from "./EditMatchDialog";

export default function MatchHistory() {
  const [matches, setMatches] = useState({});
  const [matchRoles, setMatchRoles] = useState({});
  const matchKeys = useMemo(() => Object.keys(matches).reverse(), [matches]);
  const [numberOfMatches, setNumberOfMatches] = useState(7);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ blueTeam: [], redTeam: [] });

  useEffect(() => {
    getMatches()
      .then((ms) => setMatches(ms))
      .then(getMatchRoles)
      .then((rs) => setMatchRoles(rs))
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the scroll position
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      // Check if the user has reached the end of the page
      if (scrollPosition + windowHeight >= documentHeight) {
        setNumberOfMatches((prev) => prev + 5);
        // Perform any action you need here, such as loading more content
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenDialog = (redTeam, blueTeam, matchId) => {
    setDialogOpen(true);
    setDialogData({ blueTeam, redTeam, matchId });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogData({ blueTeam: [], redTeam: [], matchId: null });
  };

  return (
    <>
      <EditMatchDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        data={dialogData}
      />
      <X5pageContentArea loading={loading}>
        <div style={{ margin: "0 20px", position: "relative" }}>
          <Typography fontSize={25}>Match history</Typography>
          <div style={{ position: "absolute", right: 10, top: "25%" }}>
            Filters soon
          </div>
        </div>
        {matchKeys.slice(0, numberOfMatches).map((key) => (
          <div
            style={{
              margin: "1%",
            }}
            key={key}
          >
            <MatchDisplay
              match={matches[key]}
              openDialog={handleOpenDialog}
              roles={matchRoles[key]}
            />
          </div>
        ))}
      </X5pageContentArea>
    </>
  );
}
