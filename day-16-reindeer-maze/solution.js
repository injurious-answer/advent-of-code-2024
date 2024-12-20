const file = await Deno.readTextFile("input.txt");
const lines = file.split("\r\n");

export const partOne = (lines) => {
  const grid = lines.map((row) => row.split(""));
  const [sr, sc, er, ec] = findPositions(grid);
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const scoreGrid = createScoreGrid(grid.length, grid[0].length);
  scoreGrid[sr][sc][0] = 0;

  const queue = [[sr, sc, 0]];
  while (queue.length) {
    const [cr, cc, cd] = queue.pop();
    for (let i = 0; i < 4; i++) {
      const [dr, dc] = directions[i];
      const [nr, nc] = [cr + dr, cc + dc];
      if (grid[nr][nc] == "#") continue;
      const nextScore = scoreGrid[cr][cc][cd] + 1 +
        Math.min(4 - Math.abs((i - cd) % 4), Math.abs((i - cd) % 4)) * 1000;
      if (nextScore >= scoreGrid[nr][nc][i]) continue;
      scoreGrid[nr][nc][i] = nextScore;
      queue.unshift([nr, nc, i]);
    }
  }
  return Math.min(...scoreGrid[er][ec]);
};

export const partTwo = (lines) => {
  const grid = lines.map((row) => row.split(""));
  const [sr, sc, er, ec] = findPositions(grid);
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const scoreGrid = createScoreGrid(grid.length, grid[0].length);
  scoreGrid[sr][sc][0] = 0;

  const queue = [[sr, sc, 0]];
  while (queue.length) {
    const [cr, cc, cd] = queue.pop();
    for (let i = 0; i < 4; i++) {
      const [dr, dc] = directions[i];
      const [nr, nc] = [cr + dr, cc + dc];
      if (grid[nr][nc] == "#") continue;
      const nextScore = scoreGrid[cr][cc][cd] + 1 +
        Math.min(4 - Math.abs((i - cd) % 4), Math.abs((i - cd) % 4)) * 1000;
      if (nextScore >= scoreGrid[nr][nc][i]) continue;
      scoreGrid[nr][nc][i] = nextScore;
      queue.unshift([nr, nc, i]);
    }
  }

  const optimalScore = Math.min(...scoreGrid[er][ec]);
  const checkQueue = [[sr, sc, 0, [[sr, sc].toString()]]];
  const optimalTileSet = new Set();

  while (checkQueue.length) {
    const [cr, cc, cd, currPath] = checkQueue.pop();
    if (cr == er && cc == ec && scoreGrid[cr][cc][cd] == optimalScore) {
      currPath.forEach((el) => optimalTileSet.add(el));
      continue;
    }
    for (let i = 0; i < 4; i++) {
      const [dr, dc] = directions[i];
      const [nr, nc] = [cr + dr, cc + dc];
      if (grid[nr][nc] == "#") continue;
      const nextScore = scoreGrid[cr][cc][cd] + 1 +
        Math.min(4 - Math.abs((i - cd) % 4), Math.abs((i - cd) % 4)) * 1000;
      if (nextScore != scoreGrid[nr][nc][i]) continue;
      checkQueue.unshift([nr, nc, i, [...currPath, [nr, nc].toString()]]);
    }
  }
  return Array.from(optimalTileSet).length;
};

const findPositions = (grid) => {
  let [sr, sc, er, ec] = [0, 0, 0, 0];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const el = grid[r][c];
      if (el == "S") [sr, sc] = [r, c];
      if (el == "E") [er, ec] = [r, c];
    }
  }
  return [sr, sc, er, ec];
};

const createScoreGrid = (rows, cols) =>
  Array.from(
    { length: rows },
    () =>
      Array.from({ length: cols }, () => new Array(4).fill(Number.MAX_VALUE)),
  );

console.log("Part One:", partOne(lines));
console.log("Part Two:", partTwo(lines));
