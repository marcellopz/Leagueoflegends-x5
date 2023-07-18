import { useMemo } from "react";
import { convertSecondsToMinutesAndSeconds } from "../../../utils/utils";

const useMatchData = (match) => {
  const blueTeam = useMemo(
    () => match.participants.filter((p) => p.teamId === 100),
    [match]
  );

  const redTeam = useMemo(
    () => match.participants.filter((p) => p.teamId === 200),
    [match]
  );

  const blueTeamObj = useMemo(
    () => match.teams.filter((t) => t.teamId === 100)[0],
    [match]
  );

  const redTeamObj = useMemo(
    () => match.teams.filter((t) => t.teamId === 200)[0],
    [match]
  );

  const blueKills = useMemo(() => {
    return blueTeam.reduce((a, b) => a + b.stats.kills, 0);
  }, [blueTeam]);

  const blueDeaths = useMemo(() => {
    return blueTeam.reduce((a, b) => a + b.stats.deaths, 0);
  }, [blueTeam]);

  const blueAssists = useMemo(() => {
    return blueTeam.reduce((a, b) => a + b.stats.assists, 0);
  }, [blueTeam]);

  const redKills = useMemo(() => {
    return redTeam.reduce((a, b) => a + b.stats.kills, 0);
  }, [redTeam]);

  const redDeaths = useMemo(() => {
    return redTeam.reduce((a, b) => a + b.stats.deaths, 0);
  }, [redTeam]);

  const redAssists = useMemo(() => {
    return redTeam.reduce((a, b) => a + b.stats.assists, 0);
  }, [redTeam]);

  const blueWin = blueTeam[0].stats.win;
  const redWin = redTeam[0].stats.win;

  const blueMaxTanked = useMemo(
    () => Math.max(...blueTeam.map((p) => p.stats.totalDamageTaken)),
    [blueTeam]
  );

  const redMaxTanked = useMemo(
    () => Math.max(...redTeam.map((p) => p.stats.totalDamageTaken)),
    [redTeam]
  );

  const gameDurationStr = useMemo(
    () => convertSecondsToMinutesAndSeconds(match.gameDuration),
    [match]
  );

  const gameDate = useMemo(() => {
    const date = new Date(match.date);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [match]);

  return {
    blueTeam,
    redTeam,
    blueTeamObj,
    redTeamObj,
    blueMaxTanked,
    redMaxTanked,
    redKills,
    redDeaths,
    redAssists,
    blueKills,
    blueDeaths,
    blueAssists,
    blueWin,
    redWin,
    gameDuration: match.gameDuration,
    gameDurationStr,
    gameDate,
  };
};

export default useMatchData;
