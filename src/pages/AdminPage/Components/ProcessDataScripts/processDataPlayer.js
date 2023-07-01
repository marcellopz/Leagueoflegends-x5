const getRecords = (playerMatches) => {
  const records = {
    kills: { n: 0, w: null, gameId: null },
    assists: { n: 0, w: null, gameId: null },
    deaths: { n: 0, w: null, gameId: null },
    damage: { n: 0, w: null, gameId: null },
    damageTaken: { n: 0, w: null, gameId: null },
    killingSpree: { n: 0, w: null, gameId: null },
    multiKill: { n: 0, w: null, gameId: null },
    cs: { n: 0, w: null, gameId: null },
    csPerMin: { n: 0, w: null, gameId: null },
    shortestGame: { n: Infinity, w: null, gameId: null },
    longestGame: { n: 0, w: null, gameId: null },
    visionScore: { n: 0, w: null, gameId: null },
  };
  Object.entries(playerMatches).forEach(([k, m]) => {
    if (m.stats.kills > records.kills.n) {
      records.kills.n = m.stats.kills;
      records.kills.win = m.stats.win;
      records.kills.gameId = k;
    }
    if (m.stats.assists > records.assists.n) {
      records.assists.n = m.stats.assists;
      records.assists.win = m.stats.win;
      records.assists.gameId = k;
    }
    if (m.stats.deaths > records.deaths.n) {
      records.deaths.n = m.stats.deaths;
      records.deaths.win = m.stats.win;
      records.deaths.gameId = k;
    }
    if (m.stats.totalDamageDealtToChampions > records.damage.n) {
      records.damage.n = m.stats.totalDamageDealtToChampions;
      records.damage.win = m.stats.win;
      records.damage.gameId = k;
    }
    if (m.stats.totalDamageTaken > records.damageTaken.n) {
      records.damageTaken.n = m.stats.totalDamageTaken;
      records.damageTaken.win = m.stats.win;
      records.damageTaken.gameId = k;
    }
    if (m.stats.largestKillingSpree > records.killingSpree.n) {
      records.killingSpree.n = m.stats.largestKillingSpree;
      records.killingSpree.win = m.stats.win;
      records.killingSpree.gameId = k;
    }
    if (m.stats.largestMultiKill > records.multiKill.n) {
      records.multiKill.n = m.stats.largestMultiKill;
      records.multiKill.win = m.stats.win;
      records.multiKill.gameId = k;
    }
    if (m.stats.visionScore > records.visionScore.n) {
      records.visionScore.n = m.stats.visionScore;
      records.visionScore.win = m.stats.win;
      records.visionScore.gameId = k;
    }
    if (m.stats.totalCs > records.cs.n) {
      records.cs.n = m.stats.totalCs;
      records.cs.win = m.stats.win;
      records.cs.gameId = k;
    }
    if (m.stats.totalCs / (m.gameDuration / 60) > records.csPerMin.n) {
      records.csPerMin.n = m.stats.totalCs / (m.gameDuration / 60);
      records.csPerMin.win = m.stats.win;
      records.csPerMin.gameId = k;
    }
    if (m.gameDuration < records.shortestGame.n) {
      records.shortestGame.n = m.gameDuration;
      records.shortestGame.win = m.stats.win;
      records.shortestGame.gameId = k;
    }
    if (m.gameDuration > records.longestGame.n) {
      records.longestGame.n = m.gameDuration;
      records.longestGame.win = m.stats.win;
      records.longestGame.gameId = k;
    }
  });
  return records;
};

export default function processDataPlayer(playerMatches, matchRoles) {
  let wins = 0;
  let firstBloods = 0;
  let winsArray = [];
  const blueSide = { wins: 0, games: 0 };
  const redSide = { wins: 0, games: 0 };
  const championMatches = {};
  const roleMatches = {
    top: { wins: 0, games: 0 },
    jungle: { wins: 0, games: 0 },
    mid: { wins: 0, games: 0 },
    adc: { wins: 0, games: 0 },
    support: { wins: 0, games: 0 },
  };

  const playerMatchesIds = Object.keys(playerMatches);
  const numberOfMatches = playerMatchesIds.length;
  let summonerName =
    playerMatches[playerMatchesIds[numberOfMatches - 1]].summonerName;
  let summonerId =
    playerMatches[playerMatchesIds[numberOfMatches - 1]].summonerId;

  playerMatchesIds.forEach((matchId) => {
    let matchRole = matchRoles[matchId]?.[summonerId];
    if (matchRole) {
      roleMatches[matchRole].games += 1;
    }

    let match = playerMatches[matchId];
    firstBloods += match.stats.firstBloodKill;
    wins += match.stats.win;
    winsArray = [...winsArray, wins];

    if (match.teamId === 100) {
      blueSide.games += 1;
      blueSide.wins += match.stats.win;
    }

    if (match.teamId === 200) {
      redSide.games += 1;
      redSide.wins += match.stats.win;
    }

    if (matchRole) {
      roleMatches[matchRole].wins += match.stats.win;
    }

    let champions = Object.keys(championMatches);
    let championId = match.championId.toString();
    if (champions.includes(championId)) {
      championMatches[championId] = [...championMatches[championId], match];
    } else {
      championMatches[championId] = [match];
    }
  });

  const championStats = {};

  Object.keys(championMatches).forEach((championId) => {
    let champWins = 0;
    let champKills = 0;
    let champDeaths = 0;
    let champAssists = 0;
    let champDamageToTurrets = 0;
    let champGoldEarned = 0;
    let champDamageToChampions = 0;
    let champDamageTaken = 0;
    let champCreepScore = 0;
    let champVisionScore = 0;
    let champVisionWardsBought = 0;
    let champDamageSelfMitigated = 0;
    let numberOfMatches = championMatches[championId].length;
    championMatches[championId].forEach((match) => {
      champWins = champWins + match.stats.win;
      champKills = champKills + match.stats.kills;
      champDeaths = champDeaths + match.stats.deaths;
      champAssists = champAssists + match.stats.assists;
      champDamageToTurrets =
        champDamageToTurrets + match.stats.damageDealtToTurrets;
      champGoldEarned = champGoldEarned + match.stats.goldEarned;
      champDamageToChampions =
        champDamageToChampions + match.stats.totalDamageDealtToChampions;
      champDamageTaken = champDamageTaken + match.stats.totalDamageTaken;
      champCreepScore = champCreepScore + match.stats.totalCs;
      champVisionScore = champVisionScore + match.stats.visionScore;
      champVisionWardsBought =
        champVisionWardsBought + match.stats.visionWardsBoughtInGame;
      champDamageSelfMitigated =
        champDamageSelfMitigated + match.stats.damageSelfMitigated;
    });
    championStats[championId] = {
      championName: championMatches[championId][0].championName,
      championId,
      numberOfMatches,
      winRate: champWins / numberOfMatches,
      kda:
        champDeaths === 0
          ? "Infinity"
          : (champKills + champAssists) / champDeaths,
      AveragePerMatch: {
        kills: champKills / numberOfMatches,
        deaths: champDeaths / numberOfMatches,
        assists: champAssists / numberOfMatches,
        damageToTurrets: champDamageToTurrets / numberOfMatches,
        goldEarned: champGoldEarned / numberOfMatches,
        damageToChampions: champDamageToChampions / numberOfMatches,
        damageTaken: champDamageTaken / numberOfMatches,
        creepScore: isNaN(champCreepScore)
          ? 0
          : champCreepScore / numberOfMatches,
        visionScore: champVisionScore / numberOfMatches,
        visionWardsBought: champVisionWardsBought / numberOfMatches,
        damageSelfMitigates: champDamageSelfMitigated / numberOfMatches,
      },
    };
  });

  return {
    summonerName,
    summonerId,
    winRate: wins / numberOfMatches,
    numberOfMatches,
    championStats,
    playerMatchesIds,
    roleMatches,
    statsPerSide: { blueSide, redSide },
    winsArray,
    firstBloods,
    records: getRecords(playerMatches),
  };
}
