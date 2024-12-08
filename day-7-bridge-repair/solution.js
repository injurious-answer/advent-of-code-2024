const lines = await Deno.readTextFile("input.txt").then((data) =>
  data.split("\n")
);

function evaluateExpression(numbers, operators) {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += numbers[i + 1];
    } else if (operators[i] === "*") {
      result *= numbers[i + 1];
    } else if (operators[i] === "||") {
      result = parseInt(result.toString() + numbers[i + 1].toString(), 10);
    }
  }
  return result;
}

export function partOne() {
  let total = 0;

  for (const line of lines) {
    const [testValueStr, numsStr] = line.split(":");
    const testValue = parseInt(testValueStr.trim(), 10);
    const numbers = numsStr.trim().split(" ").map((num) => parseInt(num, 10));

    const operatorCount = numbers.length - 1;
    const operators = ["+", "*"];

    const generateCombinations = (length) => {
      if (length === 0) return [[]];
      const smaller = generateCombinations(length - 1);
      return smaller.flatMap((comb) => operators.map((op) => [...comb, op]));
    };

    const allOperatorCombos = generateCombinations(operatorCount);

    let found = false;
    for (const operatorCombo of allOperatorCombos) {
      if (evaluateExpression([...numbers], operatorCombo) === testValue) {
        found = true;
        break;
      }
    }

    if (found) {
      total += testValue;
    }
  }

  return total;
}

export function partTwo() {
  let total = 0;

  for (const line of lines) {
    const [testValueStr, numsStr] = line.split(":");
    const testValue = parseInt(testValueStr.trim(), 10);
    const numbers = numsStr.trim().split(" ").map((num) => parseInt(num, 10));

    const operatorCount = numbers.length - 1;
    const operators = ["+", "*", "||"];

    const generateCombinations = (length) => {
      if (length === 0) return [[]];
      const smaller = generateCombinations(length - 1);
      return smaller.flatMap((comb) => operators.map((op) => [...comb, op]));
    };

    const allOperatorCombos = generateCombinations(operatorCount);

    let found = false;
    for (const operatorCombo of allOperatorCombos) {
      if (evaluateExpression([...numbers], operatorCombo) === testValue) {
        found = true;
        break;
      }
    }

    if (found) {
      total += testValue;
    }
  }

  return total;
}

console.log("Part One Result:", partOne());
console.log("Part Two Result:", partTwo());
