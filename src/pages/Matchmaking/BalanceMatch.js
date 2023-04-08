import React from "react";

export default function BalanceMatch({ players }) {
  if (players.length !== 10) {
    return <div></div>;
  }
  const state = Array(1 << 10);
  for (let i = 0; i < state.length; i++) {
    state[i] = {
      diff: null,
      pairings: null,
    };
  }

  function solve(n) {
    // if previous computation result, don't compute it again
    if (state[n].diff !== null) return;

    // every player has a role, no more players to choose from
    if (n == 0) {
      state[0] = {
        diff: 0,
        pairings: [],
      };

      return;
    }

    // find available players for the next role
    const avail = [];
    for (let m = n, i = 0; m > 0; m >>= 1, i++) {
      if (m & 1) avail.push(i);
    }

    // prepare state for current set of players
    state[n] = {
      diff: Infinity,
      pairings: [],
    };

    // iterate between pairs of available players
    for (let i = 0; i < avail.length; i++) {
      for (let j = i + 1; j < avail.length; j++) {
        // calculate players and rank diff
        const p1 = avail[i];
        const p1_ranks = players[p1].ranks;
        const p2 = avail[j];
        const p2_ranks = players[p2].ranks;

        const role = (10 - avail.length) >> 1;
        const rank_diff = Math.abs(p1_ranks[role] - p2_ranks[role]);

        // calculate new set of available players
        let m = n;
        m ^= 1 << p1;
        m ^= 1 << p2;

        // compute state for new set of available players
        solve(m);

        // if current rank diff is worse than the new one, ignore
        // if it's the same, choose one pairing randomly
        const new_rank_diff = state[m].diff + rank_diff;
        if (state[n].diff < new_rank_diff) continue;
        if (state[n].diff === new_rank_diff && Math.random() < 0.5) continue;

        // update rank diff with player pairing
        state[n].diff = new_rank_diff;
        state[n].pairings = [[p1, p2], ...state[m].pairings];
      }
    }
  }

  // initially, every player is available
  const bits = 0b1111111111;
  solve(bits);

  const roles = ["Top", "Jungle", "Mid", "Bot", "Support"];
  const { diff, pairings } = state[bits];

  return (
    <div>
      <div>{`Rank difference: ${diff}`}</div>
      <ul>
        {roles.map((role, i) => {
          const [p1, p2] = pairings[i];
          return (
            <li>{`${role}\t${players[p1].name} vs ${players[p2].name}`}</li>
          );
        })}
      </ul>
    </div>
  );
}
