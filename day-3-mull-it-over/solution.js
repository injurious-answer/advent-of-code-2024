export const partOne = (input) => {
  const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = [...input.matchAll(pattern)];
  let sum = 0;
  matches.forEach((match) => {
    const x = match[1];
    const y = match[2];
    sum += parseInt(x) * parseInt(y);
  });

  return sum;
};

export const partTwo = (input) => {
  const pattern = /(mul\((\d{1,3}),(\d{1,3})\))|do\(\)|don't\(\)/g;
  const matches = [...input.matchAll(pattern)];

  let sum = 0;
  let mulEnabled = true;

  matches.forEach((match) => {
    if (match[0] === "don't()") {
      mulEnabled = false;
    } else if (match[0] === "do()") {
      mulEnabled = true;
    } else if (mulEnabled && match[2] && match[3]) {
      const x = match[2];
      const y = match[3];
      sum += parseInt(x) * parseInt(y);
    }
  });

  return sum;
};

const input = (await Deno.readTextFile("./input.txt")).trimEnd();

console.log("Part 1: ", partOne(input));
console.log("Part 2:", partTwo(input));
