const roles = ["Top", "Jungle", "Mid", "Adc", "Support"];
const maxAttempts = 100000;

function formatMatches(matches) {
  return matches.map((match) => {
    let score1 = 0;
    let score2 = 0;
    const pairingsRoles = {};
    const pairings = [];

    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      const [p1, p2] = match[i];
      const r1 = p1.ranks[i];
      const r2 = p2.ranks[i];

      score1 += r1;
      score2 += r2;

      pairingsRoles[role] = [
        { name: p1.name, rank: r1 },
        { name: p2.name, rank: r2 },
      ];

      pairings.push(p1, p2);
    }

    return {
      pairingsRoles,
      matchScore: {
        blue: score1,
        red: score2,
      },
      pairings,
    };
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function evaluateMatch(pairings, laneTolerance, teamTolerance) {
  let total1 = 0;
  let total2 = 0;

  for (let i = 0; i < roles.length; i++) {
    const [p1, p2] = pairings[i];
    const rank1 = p1.ranks[i];
    const rank2 = p2.ranks[i];

    // Verifica tolerância por rota
    if (Math.abs(rank1 - rank2) > laneTolerance) return false;

    total1 += rank1;
    total2 += rank2;
  }

  // Verifica tolerância total dos times
  if (Math.abs(total1 - total2) > teamTolerance) return false;

  return true;
}

function generateSingleMatch(
  players,
  laneTolerance,
  teamTolerance,
  laneCounts,
  maxLanePerPlayer
) {
  const available = [...players];
  shuffle(available);

  const match = [];
  for (let i = 0; i < roles.length; i++) {
    let p1 = null,
      p2 = null;

    for (let a = 0; a < available.length; a++) {
      if ((laneCounts[available[a].playerId]?.[i] || 0) < maxLanePerPlayer) {
        p1 = available.splice(a, 1)[0];
        break;
      }
    }

    for (let b = 0; b < available.length; b++) {
      if ((laneCounts[available[b].playerId]?.[i] || 0) < maxLanePerPlayer) {
        p2 = available.splice(b, 1)[0];
        break;
      }
    }

    if (!p1 || !p2) return null;

    match.push([p1, p2]);
  }

  if (!evaluateMatch(match, laneTolerance, teamTolerance)) return null;

  for (let i = 0; i < roles.length; i++) {
    const [p1, p2] = match[i];
    laneCounts[p1.playerId] = laneCounts[p1.playerId] || Array(5).fill(0);
    laneCounts[p2.playerId] = laneCounts[p2.playerId] || Array(5).fill(0);
    laneCounts[p1.playerId][i]++;
    laneCounts[p2.playerId][i]++;
  }

  return match;
}

function generateMatches(
  players,
  totalMatches,
  laneTolerance,
  teamTolerance = 0
) {
  const results = [];
  const laneCounts = {};
  let maxLanePerPlayer = 1;

  while (maxLanePerPlayer <= 5) {
    for (
      let attempt = 0;
      attempt < maxAttempts && results.length < totalMatches;
      attempt++
    ) {
      const match = generateSingleMatch(
        players,
        laneTolerance,
        teamTolerance,
        laneCounts,
        maxLanePerPlayer
      );
      if (match) results.push(match);
    }

    if (results.length === totalMatches) break;
    maxLanePerPlayer++;
  }

  return formatMatches(results);
}

export default generateMatches;
