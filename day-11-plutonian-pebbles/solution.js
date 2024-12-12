const input = await Deno.readTextFile("input.txt");

const baseLine = input
  .replaceAll("\r", "")
  .split(" ")
  .map((v) => +v);

const memoryCalc = new Map();
const memoryBlink = new Map();
memoryCalc.set(0, 1);

const calc = (value) => {
  if (memoryCalc.has(value)) {
    return memoryCalc.get(value);
  }

  const strVal = value.toString();
  if (strVal.length % 2 !== 0) {
    const result = value * 2024;
    memoryCalc.set(value, result);
    return result;
  }

  const middle = strVal.length / 2;
  const result = [+strVal.slice(0, middle), +strVal.slice(middle)];
  memoryCalc.set(value, result);
  return result;
};

const blink = (value, count) => {
  const key = `${value}:${count}`;
  if (memoryBlink.has(key)) {
    return memoryBlink.get(key);
  }

  let stones = 1;
  for (let i = 0; i < count; i++) {
    const newVal = calc(value);
    if (Array.isArray(newVal)) {
      stones += blink(newVal[1], count - i - 1);
      value = newVal[0];
    } else {
      value = newVal;
    }
  }

  memoryBlink.set(key, stones);
  return stones;
};

export const partOne = () => {
  return baseLine.reduce((result, val) => result + blink(val, 25), 0);
};

export const partTwo = () => {
  return baseLine.reduce((result, val) => result + blink(val, 75), 0);
};

console.log("Part One:", partOne());
console.log("Part Two:", partTwo());
