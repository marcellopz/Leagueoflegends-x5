import { useMemo } from "react";

const useMatchData = (match) => {
  const blueTeam = useMemo(
    () => match.participants.filter((p) => p.teamId === 100),
    [match]
  );

  const redTeam = useMemo(
    () => match.participants.filter((p) => p.teamId === 200),
    [match]
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

  return {
    blueTeam,
    redTeam,
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
    colorWin: "rgba(0,60,120,0.4)",
    colorLose: "rgba(140,0,0,0.4)",
  };
};

export default useMatchData;
