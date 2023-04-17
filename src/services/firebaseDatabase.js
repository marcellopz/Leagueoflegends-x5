import { dbRef } from "./firebaseConfig";
import { get, child } from "firebase/database";
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
