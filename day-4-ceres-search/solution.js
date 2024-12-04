function gp(x, y, grid) {
  return grid[y]?.[x];
}

function generateAllDirsForPoint(x, y, grid) {
  return [
    gp(x, y, grid) + gp(x + 1, y, grid) + gp(x + 2, y, grid) +
    gp(x + 3, y, grid),
    gp(x, y, grid) + gp(x - 1, y, grid) + gp(x - 2, y, grid) +
    gp(x - 3, y, grid),
    gp(x, y, grid) + gp(x, y + 1, grid) + gp(x, y + 2, grid) +
    gp(x, y + 3, grid),
    gp(x, y, grid) + gp(x, y - 1, grid) + gp(x, y - 2, grid) +
    gp(x, y - 3, grid),
    gp(x, y, grid) + gp(x + 1, y + 1, grid) + gp(x + 2, y + 2, grid) +
    gp(x + 3, y + 3, grid),
    gp(x, y, grid) + gp(x - 1, y + 1, grid) + gp(x - 2, y + 2, grid) +
    gp(x - 3, y + 3, grid),
    gp(x, y, grid) + gp(x + 1, y - 1, grid) + gp(x + 2, y - 2, grid) +
    gp(x + 3, y - 3, grid),
    gp(x, y, grid) + gp(x - 1, y - 1, grid) + gp(x - 2, y - 2, grid) +
    gp(x - 3, y - 3, grid),
  ];
}

function checkXmasFromCoordinate(x, y, grid) {
  if (gp(x, y, grid) !== "X") return 0;

  return generateAllDirsForPoint(x, y, grid).filter((dir) => dir === "XMAS")
    .length;
}

export function partOne(grid) {
  let total = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      total += checkXmasFromCoordinate(x, y, grid);
    }
  }
  return total;
}

function generateDiagonalsForPoint(x, y, grid) {
  return [
    gp(x - 1, y - 1, grid) + gp(x, y, grid) + gp(x + 1, y + 1, grid),
    gp(x - 1, y + 1, grid) + gp(x, y, grid) + gp(x + 1, y - 1, grid),
  ];
}

function checkMasPattern(x, y, grid) {
  return generateDiagonalsForPoint(x, y, grid).every(
    (dir) => dir === "MAS" || dir === "SAM",
  );
}

export function partTwo(grid) {
  let total = 0;
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (checkMasPattern(x, y, grid)) {
        total++;
      }
    }
  }
  return total;
}

const lines = (await Deno.readTextFile("./input.txt")).trimEnd().split("\n");
const grid = lines.map((line) => line.split(""));

console.log("Part 1: ", partOne(grid));
console.log("Part 2:", partTwo(grid));
