const input = await Deno.readTextFile("input.txt");

const coords = input.split("\n").map((row) => row.split(",").map(Number));

export const partOne = () => {
  const rows = 71;
  const cols = 71;
  const fillGridAfterNBytes = (n) => {
    const grid = Array.from({ length: rows }, () => new Array(cols).fill("."));
    for (const [x, y] of coords.slice(0, n)) grid[y][x] = "#";
    return grid;
  };

  const shortestPath = (grid) => {
    const [sx, sy] = [0, 0];
    const [ex, ey] = [cols - 1, rows - 1];
    const queue = [[sx, sy, 0]];
    const visited = new Set();
    visited.add([sx, sy].toString());
    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    while (queue.length) {
      const [cx, cy, length] = queue.shift();
      if (cx === ex && cy === ey) return length;
      for (const [dx, dy] of directions) {
        const [nx, ny] = [cx + dx, cy + dy];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        if (grid[ny][nx] === "#") continue;
        const key = [nx, ny].toString();
        if (visited.has(key)) continue;
        visited.add(key);
        queue.push([nx, ny, length + 1]);
      }
    }
    return -1;
  };

  const grid = fillGridAfterNBytes(1024);
  return shortestPath(grid);
};

export const partTwo = () => {
  const rows = 71;
  const cols = 71;
  const shortestPath = (grid) => {
    const [sx, sy] = [0, 0];
    const [ex, ey] = [cols - 1, rows - 1];
    const queue = [[sx, sy, 0]];
    const visited = new Set();
    visited.add([sx, sy].toString());
    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    while (queue.length) {
      const [cx, cy, length] = queue.shift();
      if (cx === ex && cy === ey) return length;
      for (const [dx, dy] of directions) {
        const [nx, ny] = [cx + dx, cy + dy];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        if (grid[ny][nx] === "#") continue;
        const key = [nx, ny].toString();
        if (visited.has(key)) continue;
        visited.add(key);
        queue.push([nx, ny, length + 1]);
      }
    }
    return -1;
  };

  const grid = Array.from({ length: rows }, () => new Array(cols).fill("."));
  for (let i = 0; i < coords.length; i++) {
    const [x, y] = coords[i];
    grid[y][x] = "#";
    if (shortestPath(grid) === -1) return `${x},${y}`;
  }
  return "No byte blocks the path";
};

console.log("Part One:", partOne());
console.log("Part Two:", partTwo());
