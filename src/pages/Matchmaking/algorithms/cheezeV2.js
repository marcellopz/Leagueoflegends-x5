/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
export default function BalanceMatchCheezeV2(players, tolerance, fixed) {
  // The method to generate the solution uses Local Search which relies on restarts
  // Suppose if no good solutions exist, the function will keep restarting
  // This variable limits how many times restarts happen before the program exits
  const local_search_restarts = 69420;

  const roles = ["Top", "Jungle", "Mid", "Adc", "Support"];

  const fixed_pairings = roles.map((role) =>
    fixed[role].map((p) =>
      p === "" ? null : players.filter((player) => player.playerId === p)[0]
    )
  );

  // A function to shuffle an array lol
  // Fisher-Yates shuffle algorithm
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // This function calculates the rank difference between two teams
  // However, if there is a lane with two players with rank difference > tolerance,
  // this function returns Infinity because the solution is invalid
  function evaluate(solution) {
    let score = 0;
    for (let i = 0; i < 10; i += 2) {
      const diff = solution[i].ranks[i >> 1] - solution[i + 1].ranks[i >> 1];
      if (Math.abs(diff) > tolerance) return Infinity;
      else score += diff;
    }

    return Math.abs(score);
  }

  // Generate a random solution
  function random_solution() {
    const solution = fixed_pairings.flat();
    const available_players = players.filter((p) => !solution.includes(p));
    shuffle(available_players);

    for (let i = 0; i < 10; i++) {
      if (!solution[i]) solution[i] = available_players.pop();
      else solution[i].fixed = true;
    }

    return solution;
  }

  // Local search
  function local_search() {
    // Generate a random solution
    let best_solution = random_solution();
    let best_score = evaluate(best_solution);

    // Now, we continuously swap two players to get a better solution
    descent: while (true) {
      const candidate = best_solution.slice(0);
      for (let i = 0; i < 10; i++) {
        // If the first player to be swapped is fixed, skip
        if (candidate[i].fixed) continue;

        for (let j = i + 1; j < 10; j++) {
          // If the second player to be swapped is fixed, skip
          if (candidate[j].fixed) continue;

          // Swap the two players
          [candidate[i], candidate[j]] = [candidate[j], candidate[i]];
          const candidate_score = evaluate(candidate);

          if (candidate_score < best_score) {
            best_solution = candidate;
            best_score = candidate_score;

            continue descent;
          } else {
            // Don't forget to undo the swap
            [candidate[j], candidate[i]] = [candidate[i], candidate[j]];
          }
        }
      }

      return [best_solution, best_score];
    }
  }

  function solve() {
    let best_imperfect_solution = null;
    let best_imperfect_score = Infinity;

    let restarts = local_search_restarts;

    while (restarts--) {
      const [solution, score] = local_search();

      // Always aim for a perfect solution at first
      // That is, the score of a solution must be 0
      // This means there is no total rank difference between two teams
      if (score != 0) {
        // If it's not perfect, don't waste it
        // This imperfect solution will be used if there is no perfect solution to be found
        if (score < best_imperfect_score) {
          best_imperfect_solution = solution;
          best_imperfect_score = score;
        }

        continue;
      }

      return [solution, score];
    }

    // If a perfect solution can't be found after many restarts,
    // accept the best imperfect solution
    // If this still errors, try increasing `tolerance`
    if (best_imperfect_score < Infinity) {
      return [best_imperfect_solution, best_imperfect_score];
    } else {
      //   throw "I can't seem to find a valid solution, try increasing TOLERANCE or relax FIXED PAIRINGS";
      return null;
    }
  }

  // Pretty-print the results
  const [solution, score] = solve();

  const pairingsRoles = {};
  const matchScore = { blue: 0, red: 0 };

  for (let i = 0; i < 5; i++) {
    const p0 = solution[i * 2];
    const p1 = solution[i * 2 + 1];
    pairingsRoles[roles[i]] = [
      { name: p0.name, rank: p0.ranks[i] },
      { name: p1.name, rank: p1.ranks[i] },
    ];

    matchScore.blue += p0.ranks[i];
    matchScore.red += p1.ranks[i];
  }

  return {
    pairingsRoles,
    matchScore,
    pairings: solution,
  };
}
