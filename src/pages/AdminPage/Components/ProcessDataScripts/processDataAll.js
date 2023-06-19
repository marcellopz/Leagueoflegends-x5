import { championIds as champIds } from "../../../../common-components/resources";

export default function processDataAll(matches) {
  let gameDurationTotal = 0;
  const blueSide = {
    baronKills: 0,
    dragonKills: 0,
    firstBaron: 0,
    firstBlood: 0,
    firstDragon: 0,
    firstInhibitor: 0,
    firstTower: 0,
    riftHeraldKills: 0,
    towerKills: 0,
    wins: 0,
  };
  const redSide = {
    baronKills: 0,
    dragonKills: 0,
    firstBaron: 0,
    firstBlood: 0,
    firstDragon: 0,
    firstInhibitor: 0,
    firstTower: 0,
    riftHeraldKills: 0,
    towerKills: 0,
    wins: 0,
  };

  const championIds = Object.keys(champIds);
  const champions = {};
  championIds.forEach(
    (id) =>
      (champions[id] = {
        championId: id,
        championName: champIds[id],
        picks: 0,
        bans: 0,
        wins: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        creepsKilled: 0,
      })
  );

  Object.values(matches).forEach((match) => {
    gameDurationTotal += match.gameDuration;
    match.participants.forEach((p) => {
      champions[p.championId].picks += 1;
      champions[p.championId].wins += p.stats.win;
      champions[p.championId].kills += p.stats.kills;
      champions[p.championId].deaths += p.stats.deaths;
      champions[p.championId].assists += p.stats.assists;
      champions[p.championId].creepsKilled += p.stats.totalCs;
    });
    const blue = match.teams.filter((t) => t.teamId === 100)[0];
    blueSide.baronKills += blue.baronKills;
    blueSide.dragonKills += blue.dragonKills;
    blueSide.firstBlood += blue.firstBlood;
    blueSide.firstBaron += blue.firstBaron;
    blueSide.firstDragon += blue.firstDargon;
    blueSide.firstTower += blue.firstTower;
    blueSide.firstInhibitor += blue.firstInhibitor;
    blueSide.riftHeraldKills += blue.riftHeraldKills;
    blueSide.towerKills += blue.towerKills;
    blueSide.wins += blue.win === "Win";
    blue.bans?.forEach((b) => {
      champions[b.championId].bans += 1;
    });

    const red = match.teams.filter((t) => t.teamId === 200)[0];
    redSide.baronKills += red.baronKills;
    redSide.dragonKills += red.dragonKills;
    redSide.firstBlood += red.firstBlood;
    redSide.firstBaron += red.firstBaron;
    redSide.firstDragon += red.firstDargon;
    redSide.firstTower += red.firstTower;
    redSide.firstInhibitor += red.firstInhibitor;
    redSide.riftHeraldKills += red.riftHeraldKills;
    redSide.towerKills += red.towerKills;
    redSide.wins += red.win === "Win";
    red.bans?.forEach((b) => {
      champions[b.championId].bans += 1;
    });
  });

  return {
    blueSide,
    redSide,
    champions,
    gameDurationTotal,
    numberOfGames: Object.keys(matches).length,
  };
}
