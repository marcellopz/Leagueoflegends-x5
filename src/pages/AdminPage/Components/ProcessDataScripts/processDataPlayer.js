export default function processDataPlayer(playerMatches, matchRoles) {
  let wins = 0;
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
    wins = wins + match.stats.win;
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
    numberOfMatches: numberOfMatches,
    championStats,
    playerMatchesIds,
    roleMatches,
  };
}
