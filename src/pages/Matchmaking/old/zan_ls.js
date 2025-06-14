// A function to make a Player instance
function Player(name, ranks) {
  return { name, ranks, fixed: false };
}

// A function to shuffle an array lol
// Fisher-Yates shuffle algorithm
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const ari = Player("Ari", [2, 6, 2, 2, 4]);
const bigode = Player("Bigode", [8, 7, 9, 7, 8]);
const cain = Player("Cain", [9, 10, 10, 10, 8]);
const carioca = Player("Carioca", [5, 6, 5, 6, 7]);
const caua = Player("Caua", [4, 6, 6, 4, 4]);
const coffler = Player("Coffler", [2, 2, 2, 3, 2]);
const dudu = Player("Dudu", [7, 10, 8, 10, 6]);
const luca = Player("Luca", [7, 2, 6, 8, 4]);
const lucas = Player("Lucas", [4, 4, 4, 8, 6]);
const lyra = Player("Lyra", [9, 8, 8, 4, 8]);
const nascido = Player("Nascido", [4, 4, 1, 2, 3]);
const reinaldo = Player("Reinaldo", [4, 6, 6, 6, 9]);
const reyner = Player("Reyner", [8, 9, 9, 8, 8]);
const talita = Player("Talita", [2, 2, 5, 4, 7]);
const valbin = Player("Valbin", [7, 9, 6, 8, 10]);
const vinicim = Player("Vinicim", [8, 7, 6, 10, 6]);
const will = Player("Will", [10, 8, 8, 6, 7]);
const xibiu = Player("Xibiu", [6, 4, 3, 2, 6]);
const zan = Player("Zan", [8, 7, 6, 10, 8]);

const players = [
  ari,
  bigode,
  cain,
  carioca,
  caua,
  coffler,
  dudu,
  luca,
  lucas,
  lyra,
  nascido,
  reinaldo,
  reyner,
  talita,
  valbin,
  vinicim,
  will,
  xibiu,
  zan,
];

// Change this variable accordingly if you want to fix some pairings
// "I want Zan and Dudu to face each other as ADC."
// "I also want Talita to support Zan in bot lane."
const fixed_pairings = [
  [null, null],
  [null, null],
  [null, null],
  [zan, dudu],
  [talita, null],
];

// Rank tolerance: maximum rank difference in a lane
const tolerance = 1;

// The method to generate the solution uses Local Search which relies on restarts
// Suppose if no good solutions exist, the function will keep restarting
// This variable limits how many times restarts happen before the program exits
const local_search_restarts = 69420;

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
    throw "I can't seem to find a valid solution, try increasing TOLERANCE or relax FIXED PAIRINGS";
  }
}

// Pretty-print the results
const [solution, score] = solve();
const roles = ["TOP", " JG", "MID", "BOT", "SUP"];

let blue_rank = 0,
  red_rank = 0;
for (let i = 0; i < 5; i++) {
  const p0 = solution[i * 2];
  const p1 = solution[i * 2 + 1];
  console.info(
    `${roles[i]}: ${p0.name} ${p0.ranks[i]} vs ${p1.name} ${p1.ranks[i]}`
  );

  blue_rank += p0.ranks[i];
  red_rank += p1.ranks[i];
}

console.info(`Blue team: ${blue_rank}`);
console.info(` Red team: ${red_rank}`);
console.info(`    Match: ${blue_rank + red_rank}`);
