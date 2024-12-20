export const partOne = (file) => {
  const [towelsString, patternString] = file.split("\r\n\r\n");

  const towels = towelsString.split(", ");
  const patterns = patternString.split("\r\n");

  const visited = new Set();

  function dp(curr, desired) {
    if (curr.length === desired.length) return curr === desired;
    let res = false;
    for (const towel of towels) {
      visited.add(curr + towel);
      if (!desired.startsWith(curr + towel)) continue;
      res = res || dp(curr + towel, desired);
    }
    return res;
  }

  let count = 0;

  for (const pattern of patterns) {
    if (visited.has(pattern)) {
      count++;
      continue;
    }
    count += dp("", pattern) ? 1 : 0;
  }

  return count;
};

export const partTwo = (file) => {
  const [towelsString, patternString] = file.split("\r\n\r\n");

  const towels = towelsString.split(", ");
  const patterns = patternString.split("\r\n");

  const memo = new Map();

  function dp(curr, desired) {
    const remaining = desired.substring(curr.join("").length);
    if (curr.join("") === desired) return 1;
    if (memo.has(remaining)) return memo.get(remaining);
    let res = 0;
    for (const towel of towels) {
      if (!desired.startsWith(curr.join("") + towel)) continue;
      res += dp([...curr, towel], desired);
    }
    memo.set(remaining, res);
    return res;
  }

  let count = 0;

  for (const pattern of patterns) {
    count += dp([], pattern);
  }

  return count;
};

const input = await Deno.readTextFile("input.txt");
console.log("Part One:", partOne(input));
console.log("Part Two:", partTwo(input));
