export const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));
};

export const part1 = (parsedInput) => {
  return parsedInput.filter((row) => isMonotone(row) && checkAdjacency(row))
    .length;
};

export const part2 = (parsedInput) => {
  return parsedInput.filter((row) =>
    (isMonotone(row) && checkAdjacency(row)) || isSalvageable(row)
  ).length;
};

const isMonotone = (arr) => {
  let inc = true, dec = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) inc = false;
    if (arr[i] > arr[i - 1]) dec = false;
  }
  return inc || dec;
};

const checkAdjacency = (arr, min = 1, max = 3) => {
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - arr[i - 1]);
    if (diff < min || diff > max) return false;
  }
  return true;
};

const isSalvageable = (arr) => {
  return arr.some((_, i) => {
    const temp = [...arr];
    temp.splice(i, 1);
    return isMonotone(temp) && checkAdjacency(temp);
  });
};
