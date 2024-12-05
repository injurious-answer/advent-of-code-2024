function parseInput(inputFile) {
  const rulesInput = [];
  const updatesInput = [];

  for (const line of inputFile) {
    if (line.includes("|")) {
      rulesInput.push(line);
    } else {
      updatesInput.push(line);
    }
  }

  const rules = rulesInput.map((rule) => rule.split("|").map(Number));
  const updates = updatesInput.map((update) => update.split(",").map(Number));

  return { rules, updates };
}

function isCorrectOrder(update, rules) {
  const indexMap = new Map();
  update.forEach((page, index) => indexMap.set(page, index));

  for (const [before, after] of rules) {
    if (indexMap.has(before) && indexMap.has(after)) {
      if (indexMap.get(before) > indexMap.get(after)) {
        return false;
      }
    }
  }

  return true;
}

function topologicalSort(update, rules) {
  const graph = new Map();
  const inDegree = new Map();

  for (const page of update) {
    graph.set(page, []);
    inDegree.set(page, 0);
  }

  for (const [before, after] of rules) {
    if (graph.has(before) && graph.has(after)) {
      graph.get(before).push(after);
      inDegree.set(after, inDegree.get(after) + 1);
    }
  }

  const queue = [];
  for (const [page, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(page);
    }
  }

  const sorted = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    for (const neighbor of graph.get(current)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return sorted;
}

export async function partOne(filePath) {
  const inputFile = (await Deno.readTextFile(filePath)).trim().split("\n");
  const { rules, updates } = parseInput(inputFile);
  let middlePageSum = 0;

  for (const update of updates) {
    const relevantRules = rules.filter(
      ([before, after]) => update.includes(before) && update.includes(after),
    );

    if (isCorrectOrder(update, relevantRules)) {
      const middleIndex = Math.floor(update.length / 2);
      middlePageSum += update[middleIndex];
    }
  }

  return middlePageSum;
}

export async function partTwo(filePath) {
  const inputFile = (await Deno.readTextFile(filePath)).trim().split("\n");
  const { rules, updates } = parseInput(inputFile);
  let middlePageSum = 0;

  for (const update of updates) {
    const relevantRules = rules.filter(
      ([before, after]) => update.includes(before) && update.includes(after),
    );

    if (!isCorrectOrder(update, relevantRules)) {
      const sortedUpdate = topologicalSort(update, relevantRules);
      const middleIndex = Math.floor(sortedUpdate.length / 2);
      middlePageSum += sortedUpdate[middleIndex];
    }
  }

  return middlePageSum;
}

const filePath = "./input.txt";

(async () => {
  console.log("Part One Result:", await partOne(filePath));
  console.log("Part Two Result:", await partTwo(filePath));
})();
