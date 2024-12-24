const input = await Deno.readTextFile("input.txt");

const START = "S";
const END = "E";
const WALL = "#";
const MIN_CHEATS = 100;

const grid = input.split("\r\n").map((row) => row.split(""));

const directions = [
  { i: -1, j: 0 },
  { i: 0, j: 1 },
  { i: 1, j: 0 },
  { i: 0, j: -1 },
];

function findPosition(type) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === type) {
        return { i, j };
      }
    }
  }
  return { i: -1, j: -1 };
}

function addPosition(p, dir) {
  return { i: p.i + dir.i, j: p.j + dir.j };
}

function getNeighbors(pos) {
  const neighbors = [];
  for (const dir of directions) {
    const newPos = addPosition(pos, dir);
    if (
      newPos.i >= 0 && newPos.i < grid.length && newPos.j >= 0 &&
      newPos.j < grid[0].length && grid[newPos.i][newPos.j] !== WALL
    ) {
      neighbors.push(newPos);
    }
  }
  return neighbors;
}

function manhattanDist(p1, p2) {
  return Math.abs(p1.i - p2.i) + Math.abs(p1.j - p2.j);
}

function discoverPath() {
  const startPos = findPosition(START);
  const endPos = findPosition(END);
  const queue = [{ pos: startPos, path: [startPos] }];
  const visited = new Set();
  visited.add(`${startPos.i},${startPos.j}`);

  while (queue.length > 0) {
    const { pos, path } = queue.shift();

    if (pos.i === endPos.i && pos.j === endPos.j) {
      return path;
    }

    const neighbors = getNeighbors(pos);
    for (const neighbor of neighbors) {
      if (!visited.has(`${neighbor.i},${neighbor.j}`)) {
        visited.add(`${neighbor.i},${neighbor.j}`);
        queue.push({ pos: neighbor, path: [...path, neighbor] });
      }
    }
  }
  return [];
}

export function calculateCheats(path, limit) {
  let count = 0;

  for (let i = 0; i < path.length; i++) {
    for (let j = i + MIN_CHEATS; j < path.length; j++) {
      const cheatLength = manhattanDist(path[i], path[j]);

      if (cheatLength > limit) {
        j += cheatLength - limit - 1;
      } else if (cheatLength <= j - i - MIN_CHEATS) {
        count++;
      }
    }
  }

  return count;
}

export const path = discoverPath();
const totalCountPartOne = calculateCheats(path, 2);
const totalCountPartTwo = calculateCheats(path, 20);

console.log("Part One:", totalCountPartOne);
console.log("Part Two:", totalCountPartTwo);
