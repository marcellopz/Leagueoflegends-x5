import { useMemo } from "react";

function convertSecondsToMinutesAndSeconds(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return formattedMinutes + ":" + formattedSeconds;
}

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
    () => match.teams.filter((t) => t.teamId === 100)[0]
  );

  const redTeamObj = useMemo(
    () => match.teams.filter((t) => t.teamId === 200)[0]
  );

  const blueKills = useMemo(() => {
    let i = 0;
    return blueTeam.reduce((a, b) => a + b.stats.kills, i);
  }, [blueTeam]);

  const redKils = useMemo(() => {
    let i = 0;
    return redTeam.reduce((a, b) => a + b.stats.kills, i);
  }, [redTeam]);

  const blueWin = blueTeam[0].stats.win;
  const redWin = redTeam[0].stats.win;

  const blueMaxDamage = useMemo(
    () => Math.max(...blueTeam.map((p) => p.stats.totalDamageDealtToChampions)),
    [blueTeam]
  );

  const redMaxDamage = useMemo(
    () => Math.max(...redTeam.map((p) => p.stats.totalDamageDealtToChampions)),
    [redTeam]
  );

  const blueMaxGold = useMemo(
    () => Math.max(...blueTeam.map((p) => p.stats.goldEarned)),
    [blueTeam]
  );

  const redMaxGold = useMemo(
    () => Math.max(...redTeam.map((p) => p.stats.goldEarned)),
    [redTeam]
  );

  const blueMaxTanked = useMemo(
    () => Math.max(...blueTeam.map((p) => p.stats.totalDamageTaken)),
    [blueTeam]
  );

  const redMaxTanked = useMemo(
    () => Math.max(...redTeam.map((p) => p.stats.totalDamageTaken)),
    [redTeam]
  );

  const blueTotalDamage = useMemo(() => {
    let i = 0;
    return blueTeam.reduce(
      (a, b) => a + b.stats.totalDamageDealtToChampions,
      i
    );
  }, [blueTeam]);

  const redTotalDamage = useMemo(() => {
    let i = 0;
    return redTeam.reduce((a, b) => a + b.stats.totalDamageDealtToChampions, i);
  }, [redTeam]);

  const blueTotalKills = useMemo(() => {
    let i = 0;
    return blueTeam.reduce((a, b) => a + b.stats.kills, i);
  }, [blueTeam]);

  const redTotalKills = useMemo(() => {
    let i = 0;
    return redTeam.reduce((a, b) => a + b.stats.kills, i);
  }, [redTeam]);

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
    redKils,
    blueKills,
    redMaxDamage,
    redMaxGold,
    blueMaxDamage,
    blueMaxGold,
    blueWin,
    redWin,
    blueTotalDamage,
    redTotalDamage,
    blueTotalKills,
    redTotalKills,
    gameDuration: match.gameDuration,
    gameDurationStr,
    gameDate,
    colorWin: "rgba(0,60,120,0.4)",
    colorLose: "rgba(140,0,0,0.4)",
  };
};

export default useMatchData;
