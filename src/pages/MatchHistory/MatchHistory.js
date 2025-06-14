import React, { useEffect, useState } from "react";
import {
  getMatchRoles,
  getMatches,
  getPlayer,
} from "../../services/firebaseDatabase";
import { Typography } from "@mui/material";
import MatchDisplay from "./MatchDisplay/MatchDisplay";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import EditMatchDialog from "./EditMatchDialog";
import Filters from "./MatchHistoryFilter";
import "./MatchHistory.css";

const matchHasChampion = (match, champions) => {
  const inMatch = match.participants.map((p) => p.championName);
  return champions.every((champ) => inMatch.includes(champ));
};
const matchHasPlayer = (match, playerIds) => {
  const inMatch = match.participants.map((p) => p.summonerId);
  return playerIds.every((id) => inMatch.includes(id));
};

export default function MatchHistory() {
  const [matches, setMatches] = useState({});
  const [matchRoles, setMatchRoles] = useState({});
  const [numberOfMatches, setNumberOfMatches] = useState(7);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ blueTeam: [], redTeam: [] });
  const [championFilter, setChampionFilter] = useState([]);
  const [playerFilter, setPlayerFilter] = useState([]);
  const [players, setPlayers] = useState({});
  const [filteredMatchKeys, setFilteredMatchKeys] = useState([]);

  useEffect(() => {
    getMatches()
      .then((ms) => setMatches(ms))
      .then(getMatchRoles)
      .then((rs) => setMatchRoles(rs ?? {}))
      .then(() => setLoading(false));

    getPlayer("").then((ps) => setPlayers(ps));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      if (scrollPosition + windowHeight >= documentHeight) {
        setNumberOfMatches((prev) => prev + 5);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (championFilter.length > 0 || playerFilter.length > 0) {
      setLoading(true);
      setFilteredMatchKeys(
        Object.entries(matches)
          .filter(([id, match]) => matchHasChampion(match, championFilter))
          .filter(([id, match]) =>
            matchHasPlayer(
              match,
              playerFilter.map((p) => players[p].account_id)
            )
          )
          .map(([id, match]) => id)
          .reverse()
      );
      setLoading(false);
    } else {
      matches && setFilteredMatchKeys(Object.keys(matches).reverse());
    }
  }, [championFilter, playerFilter, matches, players]);

  const handleOpenDialog = (redTeam, blueTeam, matchId) => {
    setDialogOpen(true);
    setDialogData({ blueTeam, redTeam, matchId });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogData({ blueTeam: [], redTeam: [], matchId: null });
  };

  if (!matches || !players) {
    return <div className="no-data-message">no data yet</div>;
  }

  return (
    <div className="match-history-container">
      <EditMatchDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        data={dialogData}
      />
      <X5pageContentArea loading={loading}>
        <div className="match-history-header">
          <Typography className="match-history-title" variant="h4">
            Match history
          </Typography>
          <Filters
            championFilter={championFilter}
            setChampionFilter={setChampionFilter}
            playerFilter={playerFilter}
            setPlayerFilter={setPlayerFilter}
            players={players}
          />
        </div>
        {filteredMatchKeys.slice(0, numberOfMatches).map((key) => (
          <div className="match-item-container" key={key}>
            <MatchDisplay
              match={matches[key]}
              openDialog={handleOpenDialog}
              roles={matchRoles[key]}
            />
          </div>
        ))}
      </X5pageContentArea>
    </div>
  );
}
