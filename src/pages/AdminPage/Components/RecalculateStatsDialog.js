import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import {
  getMatchesByPlayer,
  savePlayerStats,
} from "../../../services/firebaseDatabase";

const processData = (playerMatches) => {
  let wins = 0;
  const championMatches = {};

  const playerMatchesIds = Object.keys(playerMatches);
  const numberOfMatches = playerMatchesIds.length;
  let summonerName =
    playerMatches[playerMatchesIds[numberOfMatches - 1]].summonerName;
  let summonerId =
    playerMatches[playerMatchesIds[numberOfMatches - 1]].summonerId;

  playerMatchesIds.forEach((matchId) => {
    let match = playerMatches[matchId];
    wins = wins + match.stats.win;
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
      kda: (champKills + champAssists) / champDeaths,
      AveragePerMatch: {
        kills: champKills / numberOfMatches,
        deaths: champDeaths / numberOfMatches,
        assists: champAssists / numberOfMatches,
        damageToTurrets: champDamageToTurrets / numberOfMatches,
        goldEarned: champGoldEarned / numberOfMatches,
        damageToChampions: champDamageToChampions / numberOfMatches,
        damageTaken: champDamageTaken / numberOfMatches,
        creepScore: champCreepScore / numberOfMatches,
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
  };
};

const RecalculateStats = async () => {
  const players = await getMatchesByPlayer();
  const playerIds = Object.keys(players);
  const processedData = playerIds.map((playerId) =>
    processData(players[playerId].matches)
  );
  processedData.forEach(async (player) => {
    await savePlayerStats(player);
  });
  alert("stats saved");
};

export default function RecalculateStatsDialog({ open, onClose }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Recalculate Stats</DialogTitle>
      <DialogContent style={{ margin: "20px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={RecalculateStats}
        >
          Recalculate stats
        </Button>
        {/* <pre id="code">{"dfdaf sdfds \n dsfsd"}</pre> */}
      </DialogContent>
    </Dialog>
  );
}
