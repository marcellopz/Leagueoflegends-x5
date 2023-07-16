import { useMemo } from "react";

const processTeam = (teamId, match) => {
  const team = {};
  const players = match.participants.filter((p) => p.teamId === teamId);
  players.forEach((player) => {
    player.identity = match.participantIdentities.filter(
      (id) => id.participantId === player.participantId
    )[0];
  });
  team.players = players;
  team.stats = {
    kills: players.reduce((a, b) => a + b.stats.kills, 0),
    deaths: players.reduce((a, b) => a + b.stats.deaths, 0),
    assists: players.reduce((a, b) => a + b.stats.assists, 0),
  };
  team.win = players[0].stats.win;
  team.teamStats = match.teams.filter((t) => t.teamId === teamId)[0];
  team.teamId = teamId;

  return team;
};

const useSingleMatchData = (match) => {
  const blueTeam = useMemo(() => processTeam(100, match), [match]);

  const redTeam = useMemo(() => processTeam(200, match), [match]);

  return { blueTeam, redTeam };
};

export default useSingleMatchData;
