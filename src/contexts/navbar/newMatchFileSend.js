import {
  sendFullMatchJson,
  sendReducedMatchJson,
} from "../../services/firebaseDatabase";
import { championIds, summonerSpells } from "../../common-components/resources";

/**
 * Validates the match object against required criteria
 * @param {Object} matchObj - The match object to validate
 * @returns {Object} - Validation result with isValid flag and error messages
 */
const validateMatch = (matchObj) => {
  const errors = [];

  // Check gameType is CUSTOM_GAME
  if (matchObj.gameType !== "CUSTOM_GAME") {
    errors.push(
      `Invalid gameType: ${matchObj.gameType}. Expected: CUSTOM_GAME`
    );
  }

  // Check gameId is a number
  if (!matchObj.gameId || typeof matchObj.gameId !== "number") {
    errors.push(`Invalid gameId: ${matchObj.gameId}. Expected a number`);
  }

  // Check participant count is 10
  if (
    !matchObj.participantIdentities ||
    matchObj.participantIdentities.length !== 10
  ) {
    errors.push(
      `Invalid number of participants: ${
        matchObj.participantIdentities?.length || 0
      }. Expected: 10`
    );
  }

  // Check gameMode is CLASSIC
  if (matchObj.gameMode !== "CLASSIC") {
    errors.push(`Invalid gameMode: ${matchObj.gameMode}. Expected: CLASSIC`);
  }

  // Check reply_type is lol-match-details
  if (matchObj.reply_type !== "lol-match-details") {
    errors.push(
      `Invalid reply_type: ${matchObj.reply_type}. Expected: lol-match-details`
    );
  }

  // Additional checks for required fields
  if (!matchObj.gameCreationDate) {
    errors.push("Missing gameCreationDate");
  }

  if (!matchObj.gameDuration || typeof matchObj.gameDuration !== "number") {
    errors.push(
      `Invalid gameDuration: ${matchObj.gameDuration}. Expected a number`
    );
  }

  if (!matchObj.gameVersion) {
    errors.push("Missing gameVersion");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const sendFile = (fileContent) => {
  try {
    const matchObj = JSON.parse(fileContent);

    // Validate the match object
    const validation = validateMatch(matchObj);

    if (!validation.isValid) {
      console.error("Match validation failed:", validation.errors);
      throw new Error(`Invalid match data: ${validation.errors.join(", ")}`);
    }

    sendFullMatchJson(matchObj);
    const reducedMatch = reduceFile(matchObj);
    sendReducedMatchJson(reducedMatch);

    return { success: true };
  } catch (error) {
    console.error("Error processing match file:", error);
    return { success: false, error: error.message };
  }
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
    summonerName: p.player.gameName,
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
