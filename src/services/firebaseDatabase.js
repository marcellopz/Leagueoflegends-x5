import { dbRef } from "./firebaseConfig";
import { get, child, set } from "firebase/database";
// import { getDatabase, ref, set, get, onValue, child } from "firebase/database";

export async function getPlayer(name) {
  const player = await get(child(dbRef, `players/${name}`));
  const playerValues = await player.val();
  return playerValues;
}

export async function getPlayerData(name) {
  const playerData = await get(child(dbRef, `player-data/${name}`));
  const playerValues = await playerData.val();
  return playerValues;
}

export async function getAllUsers() {
  const users_ = await get(child(dbRef, `users`));
  const users = await users_.val();
  return users;
}

export async function getUserByUid(id) {
  const user_ = await get(child(dbRef, `users/${id}`));
  const user = await user_.val();
  return user;
}

export async function getCardBackgroundTradicional() {
  const re = await get(child(dbRef, `card-layout/tradicional`));
  const cardLayout = await re.val();
  return cardLayout;
}

export async function requestToBeANerd(uid, name) {
  await set(child(dbRef, `requests/${uid}`), { uid, name });
}

export async function sendFullMatchJson(match) {
  await set(child(dbRef, `full-json-matches/match${match.gameId}`), match);
}

export async function sendReducedMatchJson(match) {
  await set(
    child(dbRef, `pre-processed-data/all-reduced/match${match.gameId}`),
    match
  );
  const participantsReduced = match.participants.map((p) => ({
    championId: p.championId,
    championName: p.championName,
    summonerId: p.summonerId,
    summonerName: p.summonerName,
    teamId: p.teamId,
  }));
  match.participants.forEach(async (p) => {
    await set(
      child(
        dbRef,
        `pre-processed-data/players/${p.summonerId}/matches/match${match.gameId}`
      ),
      {
        ...p,
        date: match.date,
        gameDuration: match.gameDuration,
        participants: participantsReduced,
      }
    );
  });
}

export async function getMatches() {
  const re = await get(child(dbRef, `pre-processed-data/all-reduced`));
  const matches = await re.val();
  return matches;
}

export async function getMatchesByPlayer() {
  const re = await get(child(dbRef, `pre-processed-data/players`));
  const players = await re.val();
  return players;
}

export async function savePlayerStats(player) {
  Object.keys(player).forEach(async (tag) => {
    await set(
      child(dbRef, `pre-processed-data/players/${player.summonerId}/${tag}`),
      player[tag]
    );
  });
  await set(
    child(dbRef, `pre-processed-data/player-summary/${player.summonerId}`),
    {
      winRate: player.winRate,
      summonerName: player.summonerName,
      numberOfMatches: player.numberOfMatches,
    }
  );
}

export async function getPlayerSummaryList() {
  const re = await get(child(dbRef, `pre-processed-data/player-summary`));
  const players = await re.val();
  return players;
}

export async function getPlayerInfo(playerId) {
  const re = await get(child(dbRef, `pre-processed-data/players/${playerId}`));
  const playerInfo = await re.val();
  return playerInfo;
}

export async function saveOverallStats(stats) {
  await set(child(dbRef, "pre-processed-data/overall-stats"), stats);
}

export async function getOverallStats() {
  const re = await get(child(dbRef, `pre-processed-data/overall-stats`));
  const stats = await re.val();
  return stats;
}

export async function setRoles(roles, matchId) {
  if (matchId === null) {
    return;
  }
  await set(
    child(dbRef, `pre-processed-data/match-roles/match${matchId}`),
    roles
  );
}

export async function getMatchRoles(match = "") {
  const re = await get(child(dbRef, `pre-processed-data/match-roles/${match}`));
  const roles = await re.val();
  return roles;
}

export async function addPlayer(player) {
  await set(child(dbRef, `players/${player.name.toLowerCase()}`), player);
}

export async function addPlayerPhoto(photo, name) {
  await set(child(dbRef, `player-data/${name}/photo`), photo);
}

export async function savePlayerPairs(pairs) {
  await set(child(dbRef, `pre-processed-data/pairs`), pairs);
}

export async function getPlayerPairs(key) {
  const re = await get(child(dbRef, `pre-processed-data/pairs/${key}`));
  const pairs = await re.val();
  return pairs;
}

export async function getMatchesFullMatch(id) {
  const re = await get(child(dbRef, `full-json-matches/${id}`));
  const match = await re.val();
  return match;
}

export async function clearPreProcessedData() {
  await set(child(dbRef, `pre-processed-data/all-reduced`), {});
  await set(child(dbRef, `pre-processed-data/players`), {});
  await set(child(dbRef, `pre-processed-data/player-summary`), {});
  await set(child(dbRef, `pre-processed-data/overall-stats`), {});
  // await set(child(dbRef, `pre-processed-data/match-roles`), {});
  await set(child(dbRef, `pre-processed-data/pairs`), {});
}
