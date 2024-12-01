export const partOne = (input) => {
  const [l, r] = input.split("\n")
    .map((line) => line.split(" ").map(Number))
    .reduce(([l, r], [a, , , b]) => {
      l.push(a);
      r.push(b);
      return [l, r];
    }, [[], []]);

  l.sort((a, b) => a - b);
  r.sort((a, b) => a - b);

  return l.reduce((acc, v, i) => acc + Math.abs(v - r[i]), 0);
};

export const partTwo = (input) => {
  const { l, r } = input.split("\n")
    .map((line) => line.split(" ").map(Number))
    .reduce(({ l, r }, [a, , , b]) => {
      l.push(a);
      r.set(b, (r.get(b) ?? 0) + 1);
      return { l, r };
    }, { l: [], r: new Map() });

  return l.reduce((acc, v) => acc + v * (r.get(v) ?? 0), 0);
};

const input = (await Deno.readTextFile("./input.txt")).trimEnd();

console.log("Part 1: ", partOne(input));
console.log("Part 2: ", partTwo(input));
