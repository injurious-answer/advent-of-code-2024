function neighbours(i, j, map) {
  const candidates = [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
  ];
  return candidates.filter(([k, l]) =>
    0 <= k && k < map.length && 0 <= l && l < map[0].length
  );
}

function destinations(i, j, map, height = 0) {
  const accessibleNeighbours = neighbours(i, j, map)
    .filter(([k, l]) => parseInt(map[k].charAt(l)) === height + 1);

  if (height === 8) {
    return new Set(accessibleNeighbours.map(([k, l]) => `${k}-${l}`));
  }

  return accessibleNeighbours
    .map(([k, l]) => destinations(k, l, map, height + 1))
    .reduce((a, b) => {
      b.forEach((item) => a.add(item));
      return a;
    }, new Set());
}

export function partOne(input) {
  const map = input.split("\n").filter(Boolean);

  return map.flatMap((row, i) =>
    [...row]
      .map((c, j) => [parseInt(c), j])
      .filter(([h, _j]) => h === 0)
      .map(([_h, j]) => destinations(i, j, map).size)
  ).reduce((a, b) => a + b, 0);
}

function findTrailRating(i, j, map, height = 0) {
  const reachableNeighbours = neighbours(i, j, map)
    .filter(([k, l]) => parseInt(map[k].charAt(l)) === height + 1);

  if (height === 9) {
    return 1;
  }

  return reachableNeighbours
    .map(([k, l]) => findTrailRating(k, l, map, height + 1))
    .reduce((a, b) => a + b, 0);
}

export function partTwo(input) {
  const map = input.split("\n").filter(Boolean);

  return map.flatMap((row, i) =>
    [...row]
      .map((c, j) => [parseInt(c), j])
      .filter(([h, _j]) => h === 0)
      .map(([_h, j]) => findTrailRating(i, j, map))
  ).reduce((a, b) => a + b, 0);
}

const input = await Deno.readTextFile("input.txt");
console.log("Part One:", partOne(input));
console.log("Part Two:", partTwo(input));
