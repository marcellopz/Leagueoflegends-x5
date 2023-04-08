import { dbRef } from "./firebaseConfig";
import { get, child } from "firebase/database";
// import { getDatabase, ref, set, get, onValue, child } from "firebase/database";

export async function getPlayer(name) {
  const player = await get(child(dbRef, `players/${name}`));
  const playerValues = await player.val();
  return playerValues;
}
