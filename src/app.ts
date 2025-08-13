function getScore(scores: Record<string, number>): number {
  let total = 0;

  for (const player in scores) {
    total += scores[player];
  }

  return total;
}

const scores: Record<string, number> = {
  Anna: 10,
  Olga: 1,
  Ivan: 5,
};

console.log(getScore(scores));
