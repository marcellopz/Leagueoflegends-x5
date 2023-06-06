import {
  addMatchId,
  sendFullMatchJson,
  sendReducedMatchJson,
} from "../../services/firebaseDatabase";
import { championIds, summonerSpells } from "../../common-components/resources";

export const sendFile = (fileContent) => {
  const matchObj = JSON.parse(fileContent);
  sendFullMatchJson(matchObj);
  const reducedMatch = reduceFile(matchObj);
  sendReducedMatchJson(reducedMatch);
  addMatchId(matchObj.gameId);
};

const reduceFile = (matchObj) => {
  const reduced = {};
  reduced.gameId = matchObj.gameId;
  reduced.gameMode = matchObj.gameMode;
  reduced.date = matchObj.gameCreationDate;
  reduced.gameDuration = matchObj.gameDuration;
  reduced.gameVersion = matchObj.gameVersion;
  const { dominionVictoryScore, vilemawKills, ...teams } = matchObj.teams;
  reduced.teams = teams;

  const participantIdentities = matchObj.participantIdentities.map((p) => ({
    participantId: p.participantId,
    summonerId: p.player.summonerId,
    summonerName: p.player.summonerName,
  }));

  const participants = matchObj.participants.map((p) => ({
    championId: p.championId,
    championName: championIds[p.championId] ?? "",
    participantId: p.participantId,
    spellsIds: [p.spell1Id, p.spell2Id],
    spells: [summonerSpells[p.spell1Id], summonerSpells[p.spell2Id]],
    teamId: p.teamId,
    stats: {
      assists: p.stats.assists,
      champLevel: p.stats.champLevel,
      damageDealtToTurrets: p.stats.damageDealtToTurrets,
      damageSelfMitigated: p.stats.damageSelfMitigated,
      deaths: p.stats.deaths,
      firstBloodKill: p.stats.firstBloodKill,
      goldEarned: p.stats.goldEarned,
      goldSpent: p.stats.goldSpent,
      item0: p.stats.item0,
      item1: p.stats.item1,
      item2: p.stats.item2,
      item3: p.stats.item3,
      item4: p.stats.item4,
      item5: p.stats.item5,
      item6: p.stats.item6,
      kills: p.stats.kills,
      largestKillingSpree: p.stats.largestKillingSpree,
      largestMultiKill: p.stats.largestMultiKill,
      magicDamageDealtToChampions: p.stats.magicDamageDealtToChampions,
      magicalDamageTaken: p.stats.magicalDamageTaken,
      physicalDamageDealtToChampions: p.stats.physicalDamageDealtToChampions,
      physicalDamageTaken: p.stats.physicalDamageTaken,
      totalDamageDealtToChampions: p.stats.totalDamageDealtToChampions,
      totalDamageTaken: p.stats.totalDamageTaken,
      // totalMinionsKilled: p.stats.totalMinionsKilled,
      totalCs: p.stats.totalMinionsKilled + p.stats.neutralMinionsKilled,
      trueDamageDealtToChampions: p.stats.trueDamageDealtToChampions,
      visionScore: p.stats.visionScore,
      visionWardsBoughtInGame: p.stats.visionWardsBoughtInGame,
      wardsKilled: p.stats.wardsKilled,
      wardsPlaced: p.stats.wardsPlaced,
      win: p.stats.win,
    },
  }));

  const joinedParticipants = participantIdentities.map((p1) => ({
    ...p1,
    ...participants.find((p2) => p1.participantId === p2.participantId),
  }));

  reduced.participants = joinedParticipants;

  return reduced;
};
