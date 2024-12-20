const cols = 101;
const rows = 103;

export const partOne = (lines) => {
  const midx = (cols - 1) / 2;
  const midy = (rows - 1) / 2;
  const quads = new Array(4).fill(0);

  for (let i = 0; i < lines.length; i++) {
    const [[posx, posy], [velx, vely]] = processLine(lines[i]);
    let [nx, ny] = [(posx + 100 * velx) % cols, (posy + 100 * vely) % rows];

    if (nx < 0) nx += cols;
    if (ny < 0) ny += rows;

    if (ny < midy) {
      if (nx < midx) {
        quads[0]++;
      } else if (nx > midx) {
        quads[1]++;
      }
    } else if (ny > midy) {
      if (nx < midx) {
        quads[2]++;
      } else if (nx > midx) {
        quads[3]++;
      }
    }
  }

  return quads.reduce((curr, next) => curr * next, 1);
};

export const partTwo = (lines) => {
  let maxIslandSize = 0;
  let maxIter = 0;

  for (let iter = 0; iter < 10000; iter++) {
    const grid = Array.from({ length: rows }, () => new Array(cols).fill("."));
    for (let i = 0; i < lines.length; i++) {
      const [[posx, posy], [velx, vely]] = processLine(lines[i]);
      let [nx, ny] = [(posx + iter * velx) % cols, (posy + iter * vely) % rows];

      if (nx < 0) nx += cols;
      if (ny < 0) ny += rows;

      grid[ny][nx] = "X";
    }

    const islands = countIslands(grid);
    if (islands > maxIslandSize) {
      maxIslandSize = islands;
      maxIter = iter;
    }
  }

  return maxIter;
};

function processLine(line) {
  const [pos, vel] = line.split(" ").map((el) => el.substring(2));
  return [pos.split(",").map(Number), vel.split(",").map(Number)];
}

function countIslands(grid) {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  let maxIslandSize = 0;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === ".") continue;
      if (visited[y][x] === 1) continue;
      visited[y][x] = 1;
      const queue = [[x, y]];
      let currIslandSize = 0;

      while (queue.length) {
        const [cx, cy] = queue.pop();
        currIslandSize++;

        for (const [dx, dy] of directions) {
          const [nx, ny] = [cx + dx, cy + dy];

          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
          if (grid[ny][nx] === ".") continue;
          if (visited[ny][nx] === 1) continue;
          visited[ny][nx] = 1;

          queue.push([nx, ny]);
        }
      }
      maxIslandSize = Math.max(maxIslandSize, currIslandSize);
    }
  }
  return maxIslandSize;
}

const file = await Deno.readTextFile("input.txt");
const lines = file.split("\r\n");

console.log("Part One:", partOne(lines));
console.log("Part Two:", partTwo(lines));
