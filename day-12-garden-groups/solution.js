const id = (x, y) => `${x}#${y}`;
const id2 = (x, y, dx, dy) => `${x}#${y}#${dx}#${dy}`;

export const partOne = (input) => {
  const grid = input.split(/\r?\n/).map((r) => r.split(""));

  const regions = [];
  const visited = new Set();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const position = id(x, y);
      if (visited.has(position)) {
        continue;
      }

      const region = { type: grid[y][x], positions: [] };
      const stack = [[x, y]];
      regions.push(region);

      while (stack.length) {
        const [cx, cy] = stack.pop();
        const currentPosition = id(cx, cy);

        if (visited.has(currentPosition) || grid[cy][cx] != region.type) {
          continue;
        }

        visited.add(currentPosition);
        region.positions.push([cx, cy]);

        for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
          if (
            cx + dx >= 0 && cx + dx < grid[0].length && cy + dy >= 0 &&
            cy + dy < grid.length
          ) {
            stack.push([cx + dx, cy + dy]);
          }
        }
      }
    }
  }

  let price = 0;

  for (const { type, positions } of regions) {
    for (const [x, y] of positions) {
      let perimeter = 0;
      for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        if (
          x + dx < 0 || x + dx >= grid[0].length || y + dy < 0 ||
          y + dy >= grid.length || grid[y + dy][x + dx] != type
        ) {
          perimeter++;
        }
      }
      price += perimeter * positions.length;
    }
  }
  return price;
};

export const partTwo = (input) => {
  const grid = input.split(/\r?\n/).map((r) => r.split(""));

  const regions = [];
  const visited = new Set();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const position = id(x, y);
      if (visited.has(position)) {
        continue;
      }

      const region = { type: grid[y][x], positions: [] };
      const stack = [[x, y]];
      regions.push(region);

      while (stack.length) {
        const [cx, cy] = stack.pop();
        const currentPosition = id(cx, cy);

        if (visited.has(currentPosition) || grid[cy][cx] != region.type) {
          continue;
        }

        visited.add(currentPosition);
        region.positions.push([cx, cy]);

        for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
          if (
            cx + dx >= 0 && cx + dx < grid[0].length && cy + dy >= 0 &&
            cy + dy < grid.length
          ) {
            stack.push([cx + dx, cy + dy]);
          }
        }
      }
    }
  }

  let price = 0;

  const isDifferent = (x, y, type) =>
    x < 0 || x >= grid[0].length || y < 0 || y >= grid.length ||
    grid[y][x] != type;

  for (const { type, positions } of regions) {
    const visitedSides = new Set();
    const sides = [];

    for (const [x, y] of positions) {
      let side = [];

      const add = (s) => {
        if (!visitedSides.has(s)) {
          side.push(s);
          visitedSides.add(s);
        }
      };

      for (const dx of [1, -1]) {
        if (isDifferent(x + dx, y, type)) {
          let py = y;
          add(id2(x, y, dx, 0));

          for (const dy of [1, -1]) {
            py = y;

            while (
              !isDifferent(x, py + dy, type) &&
              isDifferent(x + dx, py + dy, type)
            ) {
              py += dy;
              add(id2(x, py, dx, 0));
            }
          }

          visitedSides.add(...side);
          sides.push(side);
          side = [];
        }
      }

      for (const dy of [1, -1]) {
        if (isDifferent(x, y + dy, type)) {
          add(id2(x, y, 0, dy));

          for (const dx of [1, -1]) {
            let px = x;

            while (
              !isDifferent(px + dx, y, type) &&
              isDifferent(px + dx, y + dy, type)
            ) {
              px += dx;
              add(id2(px, y, 0, dy));
            }
          }

          visitedSides.add(...side);
          sides.push(side);
          side = [];
        }
      }
    }

    price += sides.filter((c) => c.length).length * positions.length;
  }
  return price;
};

const input = await Deno.readTextFile("input.txt");

console.log("Part One:", partOne(input));
console.log("Part Two:", partTwo(input));
