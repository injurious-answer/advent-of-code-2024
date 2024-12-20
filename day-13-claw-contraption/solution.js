const file = await Deno.readTextFile("input.txt");
const machines = file.split("\r\n\r\n");

export const partOne = (machines) => {
  const buttonCosts = [3, 1];
  let tokens = 0;

  function dp(moves, rem) {
    let cost = null;
    const [tx, ty] = rem;
    if (tx == 0 && ty == 0) return 0;
    if (!moves.length) return Number.MAX_VALUE;
    if (moves.length == 1) {
      const [btnCost, dx, dy] = moves[0];
      return tx % dx == 0 && ty % dy == 0 && tx / dx == ty / dy
        ? (btnCost * ty) / dy
        : Number.MAX_VALUE;
    }

    for (let i = 0; i < moves.length; i++) {
      const [btnCost, dx, dy] = moves[i];
      const otherMoves = [...moves.slice(0, i), ...moves.slice(i + 1)];
      let [cx, cy] = [0, 0];
      let currCost = 0;
      for (let j = 0; j < 100; j++) {
        cx += dx;
        cy += dy;
        currCost += btnCost;
        const restCost = dp(otherMoves, [tx - cx, ty - cy]);
        if (!cost) {
          cost = (restCost ?? Number.MAX_VALUE) + currCost;
        } else {
          cost = Math.min(cost, (restCost ?? Number.MAX_VALUE) + currCost);
        }
      }
    }
    return cost;
  }

  for (const machine of machines) {
    const lines = machine.split("\r\n").map((line, index) => {
      const [_, xy] = line.split(": ");
      return xy
        .split(", ")
        .map((el) => Number(index == 2 ? el.substring(2) : el.substring(1)));
    });
    const target = lines[2];
    const moves = lines
      .slice(0, 2)
      .map((el, index) => [buttonCosts[index], ...el]);

    const res = dp(moves, target);
    if (res != Number.MAX_VALUE && res) tokens += res;
  }
  return tokens;
};

export const partTwo = (machines) => {
  let tokens = 0;

  for (const machine of machines) {
    const lines = machine.split("\r\n").map((line, index) => {
      const [_, xy] = line.split(": ");
      return xy
        .split(", ")
        .map(
          (el) =>
            (index == 2 ? 10000000000000 : 0) +
            Number(index == 2 ? el.substring(2) : el.substring(1)),
        );
    });

    const [tx, ty] = lines[2];
    const moves = lines.slice(0, 2);
    const [x1, y1] = moves[0];
    const [x2, y2] = moves[1];

    const det = x1 * y2 - y1 * x2;
    if (det == 0) continue;

    const a = Math.round((1 / det) * (y2 * tx - x2 * ty) * 100) / 100;
    const b = Math.round((1 / det) * (x1 * ty - y1 * tx) * 100) / 100;

    if (a % 1 != 0 || b % 1 != 0) continue;

    tokens += a * 3 + b;
  }
  return tokens;
};

console.log("Part One:", partOne(machines));
console.log("Part Two:", partTwo(machines));
