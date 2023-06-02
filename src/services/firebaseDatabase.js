import { dbRef } from "./firebaseConfig";
import { get, child, set, push } from "firebase/database";
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
  match.participants.forEach(async (p) => {
    await set(
      child(
        dbRef,
        `pre-processed-data/players/${p.summonerId}/matches/match${match.gameId}`
      ),
      p
    );
  });
}

export async function addMatchId(id) {
  await push(child(dbRef, "pre-processed-data/match-ids"), `match${id}`);
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
      summonerId: player.summonerName,
      numberOfMatches: player.numberOfMatches,
    }
  );
}

export async function getPlayerSummaryList() {
  const re = await get(child(dbRef, `pre-processed-data/player-summary`));
  const players = await re.val();
  return players;
}
