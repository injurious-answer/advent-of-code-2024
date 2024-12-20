export const partOne = (fileContent) => {
  const [registerString, instructionString] = fileContent.split("\r\n\r\n");
  const registers = registerString.split("\r\n").map((el) =>
    Number(el.slice(12))
  );
  const instructions = instructionString.slice(9).split(",").map(Number);

  const comboMap = {
    0: () => 0,
    1: () => 1,
    2: () => 2,
    3: () => 3,
    4: () => registers[0],
    5: () => registers[1],
    6: () => registers[2],
  };

  const outputBuffer = [];
  let currIndex = 0;

  const operatorMap = {
    0: (i) => {
      const numberator = registers[0];
      const denominator = 2 ** comboMap[instructions[i]]();
      const res = Math.floor(numberator / denominator);
      registers[0] = res;
      currIndex += 2;
    },
    1: (i) => {
      const operand1 = registers[1];
      const operand2 = instructions[i];
      const res = Number(BigInt(operand1) ^ BigInt(operand2));
      registers[1] = res;
      currIndex += 2;
    },
    2: (i) => {
      const res = comboMap[instructions[i]]() % 8;
      registers[1] = res;
      currIndex += 2;
    },
    3: (i) => {
      const registerA = registers[0];
      if (registerA == 0) {
        currIndex += 2;
        return;
      }
      currIndex = instructions[i];
    },
    4: (_i) => {
      const operand1 = registers[1];
      const operand2 = registers[2];
      const res = Number(BigInt(operand1) ^ BigInt(operand2));
      registers[1] = res;
      currIndex += 2;
    },
    5: (i) => {
      const res = comboMap[instructions[i]]() % 8;
      outputBuffer.push(res);
      currIndex += 2;
    },
    6: (i) => {
      const numberator = registers[0];
      const denominator = 2 ** comboMap[instructions[i]]();
      const res = Math.floor(numberator / denominator);
      registers[1] = res;
      currIndex += 2;
    },
    7: (i) => {
      const numberator = registers[0];
      const denominator = 2 ** comboMap[instructions[i]]();
      const res = Math.floor(numberator / denominator);
      registers[2] = res;
      currIndex += 2;
    },
  };

  while (currIndex < instructions.length - 1) {
    operatorMap[instructions[currIndex]](currIndex + 1);
  }

  return outputBuffer.join(",");
};

export const partTwo = (fileContent) => {
  const [registerString, instructionString] = fileContent.split("\r\n\r\n");
  let registers = registerString.split("\r\n").map((el) =>
    Number(el.slice(12))
  );
  const instructions = instructionString.slice(9).split(",").map(Number);

  const comboMap = {
    0: () => 0,
    1: () => 1,
    2: () => 2,
    3: () => 3,
    4: () => registers[0],
    5: () => registers[1],
    6: () => registers[2],
  };

  const registerCopy = [...registers];

  const pass = (A, nLast) => {
    const outputBuffer = [];
    let currIndex = 0;
    registers = [...registerCopy];
    registers[0] = A;

    const operatorMap = {
      0: (i) => {
        const numberator = registers[0];
        const denominator = 2 ** comboMap[instructions[i]]();
        const res = Math.floor(numberator / denominator);
        registers[0] = res;
        currIndex += 2;
      },
      1: (i) => {
        const operand1 = registers[1];
        const operand2 = instructions[i];
        const res = Number(BigInt(operand1) ^ BigInt(operand2));
        registers[1] = res;
        currIndex += 2;
      },
      2: (i) => {
        const res = comboMap[instructions[i]]() % 8;
        registers[1] = res;
        currIndex += 2;
      },
      3: (i) => {
        const registerA = registers[0];
        if (registerA == 0) {
          currIndex += 2;
          return;
        }
        currIndex = instructions[i];
      },
      4: (_i) => {
        const operand1 = registers[1];
        const operand2 = registers[2];
        const res = Number(BigInt(operand1) ^ BigInt(operand2));
        registers[1] = res;
        currIndex += 2;
      },
      5: (i) => {
        const res = comboMap[instructions[i]]() % 8;
        outputBuffer.push(res);
        currIndex += 2;
      },
      6: (i) => {
        const numberator = registers[0];
        const denominator = 2 ** comboMap[instructions[i]]();
        const res = Math.floor(numberator / denominator);
        registers[1] = res;
        currIndex += 2;
      },
      7: (i) => {
        const numberator = registers[0];
        const denominator = 2 ** comboMap[instructions[i]]();
        const res = Math.floor(numberator / denominator);
        registers[2] = res;
        currIndex += 2;
      },
    };

    while (currIndex < instructions.length - 1) {
      operatorMap[instructions[currIndex]](currIndex + 1);
    }

    return outputBuffer.toString() ===
      instructions.slice(-1 - nLast).toString();
  };

  const dp = (decimal, index) => {
    if (index === instructions.length) {
      return parseInt(decimal, 2);
    }

    let minNum = Number.MAX_SAFE_INTEGER;
    let successFound = false;

    for (let i = 0; i < 8; i++) {
      const a = parseInt(decimal + i.toString(2).padStart(3, "0"), 2);

      if (!pass(a, index)) continue;

      const currNum = dp(decimal + i.toString(2).padStart(3, "0"), index + 1);

      successFound = true;
      minNum = Math.min(minNum, currNum);
    }

    return successFound ? minNum : Number.MAX_SAFE_INTEGER;
  };

  return dp("", 0);
};

const file = await Deno.readTextFile("input.txt");

console.log("Part One:", partOne(file));
console.log("Part Two:", partTwo(file));
