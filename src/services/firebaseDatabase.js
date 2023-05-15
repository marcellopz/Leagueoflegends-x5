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
