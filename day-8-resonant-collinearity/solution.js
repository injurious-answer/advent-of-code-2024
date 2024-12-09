export const processMap = (inputFile) => {
  const lines = Deno.readTextFileSync(inputFile).split("\n");
  const map = lines.map((l) => l.split(""));

  const antennaByFreq = {};
  map.forEach((row, y) =>
    row.forEach((freq, x) => {
      if (freq === ".") return;
      if (!antennaByFreq[freq]) antennaByFreq[freq] = [];
      antennaByFreq[freq].push([x, y]);
    })
  );

  return { map, antennaByFreq };
};

export const partOne = (map, antennaByFreq) => {
  const A1 = new Set();
  const R = map.length;
  const C = map[0].length;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      for (const positions of Object.values(antennaByFreq)) {
        for (let i = 0; i < positions.length; i++) {
          for (let j = 0; j < positions.length; j++) {
            if (i === j) continue;
            const [r1, c1] = positions[i];
            const [r2, c2] = positions[j];
            const d1 = Math.abs(r - r1) + Math.abs(c - c1);
            const d2 = Math.abs(r - r2) + Math.abs(c - c2);
            const dr1 = r - r1;
            const dr2 = r - r2;
            const dc1 = c - c1;
            const dc2 = c - c2;

            if (
              (d1 === 2 * d2 || d1 * 2 === d2) && valid(map, r, c) &&
              (dr1 * dc2 === dc1 * dr2)
            ) {
              A1.add(`${r},${c}`);
            }
          }
        }
      }
    }
  }

  return A1.size;
};

export const partTwo = (map, antennaByFreq) => {
  const A2 = new Set();
  const R = map.length;
  const C = map[0].length;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      for (const positions of Object.values(antennaByFreq)) {
        for (let i = 0; i < positions.length; i++) {
          for (let j = 0; j < positions.length; j++) {
            if (i === j) continue;
            const [r1, c1] = positions[i];
            const [r2, c2] = positions[j];
            const dr1 = r - r1;
            const dr2 = r - r2;
            const dc1 = c - c1;
            const dc2 = c - c2;

            if (valid(map, r, c) && (dr1 * dc2 === dc1 * dr2)) {
              A2.add(`${r},${c}`);
            }
          }
        }
      }
    }
  }

  return A2.size;
};

const valid = (map, x, y) =>
  x >= 0 && x < map[0].length && y >= 0 && y < map.length;

const { map, antennaByFreq } = processMap("input.txt");

console.log("Part 1:", partOne(map, antennaByFreq));
console.log("Part 2:", partTwo(map, antennaByFreq));
