const lines = await Deno.readTextFile("input.txt").then((data) =>
  data.split("\n")
);

const grid = lines.map((line) => line.split(""));

const hashpoints = new Set();

let start = [0, 0];

grid.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "#") hashpoints.add(`${x},${y}`);
    if (cell === "^") start = [x, y];
  });
});

const directions = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};

const turns = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};

function getNextLocation(currentLocation, currentDirection, extraPoint) {
  const nextX = currentLocation[0] + directions[currentDirection][0];
  const nextY = currentLocation[1] + directions[currentDirection][1];
  const nextPoint = `${nextX},${nextY}`;
  const inBounds = nextX >= 0 && nextX < grid[0].length && nextY >= 0 &&
    nextY < grid.length;

  if (!inBounds) {
    return {
      outOfBounds: true,
    };
  }

  if (hashpoints.has(`${nextX},${nextY}`) || extraPoint === nextPoint) {
    return {
      nextLocation: currentLocation,
      nextDirection: turns[currentDirection],
      outOfBounds: false,
    };
  }

  return {
    nextLocation: [nextX, nextY],
    nextDirection: currentDirection,
    outOfBounds: false,
  };
}

export function partOne() {
  const visitedPoints = new Set();

  let currentLocation = start;
  let currentDirection = "N";

  while (true) {
    visitedPoints.add(
      `${currentLocation[0]},${currentLocation[1]},${currentDirection}`,
    );

    const next = getNextLocation(currentLocation, currentDirection);

    if (next.outOfBounds) break;

    currentLocation = next.nextLocation;
    currentDirection = next.nextDirection;
  }

  const pointsNoDirection = new Set();

  visitedPoints.forEach((point) => {
    pointsNoDirection.add(point.split(",")[0] + "," + point.split(",")[1]);
  });

  return pointsNoDirection.size;
}

export function partTwo() {
  let loopCount = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (gridHasLoop([x, y])) {
        loopCount++;
      }
    }
  }

  return loopCount;
}

function gridHasLoop(newHashPoint) {
  const turnPoints = new Set();

  if (hashpoints.has(`${newHashPoint[0]},${newHashPoint[1]}`)) {
    return false;
  }

  const nhp = `${newHashPoint[0]},${newHashPoint[1]}`;

  let currentLocation = start;
  let currentDirection = "N";

  while (true) {
    const next = getNextLocation(currentLocation, currentDirection, nhp);
    if (next.outOfBounds) return false;

    if (next.nextDirection !== currentDirection) {
      const key = `${currentLocation[0]},${
        currentLocation[1]
      },${currentDirection}`;
      if (turnPoints.has(key)) {
        return true;
      }
      turnPoints.add(key);
    }

    currentLocation = next.nextLocation;
    currentDirection = next.nextDirection;
  }
}

console.log("Part One Result:", await partOne());
console.log("Part Two Result:", await partTwo());
