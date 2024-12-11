export async function partOne() {
  const text = await Deno.readTextFile("input.txt");
  const input = text.split("").map(Number);
  const fs = [];

  let id = 0;
  for (let idx = 0; idx < input.length; idx++) {
    if (idx % 2 === 0) {
      fs.push(...new Array(input[idx]).fill(id));
      id += 1;
    } else {
      fs.push(...new Array(input[idx]).fill("."));
    }
  }

  let R = fs.length - 1;
  for (let L = 0; L <= R; L++) {
    if (fs[L] === ".") {
      fs[L] = fs[R];
      fs[R] = ".";
      do {
        R -= 1;
      } while (fs[R] === ".");
    }
  }

  const result = checkSum(fs);
  console.log("Part 1:", result);
  return result;
}

export async function partTwo() {
  const text = await Deno.readTextFile("input.txt");
  const input = text.split("").map(Number);
  const fs = [];
  const fileIdx = [];
  const fileSizes = [];
  const emptyIdx = [];
  const emptySizes = [];

  let fid = 0;
  for (let idx = 0; idx < input.length; idx++) {
    const size = input[idx];

    if (idx % 2 === 0) {
      fileIdx[fid] = fs.length;
      fileSizes[fid] = size;
      fs.push(...new Array(size).fill(fid));
      fid += 1;
    } else {
      emptyIdx.push(fs.length);
      emptySizes.push(size);
      fs.push(...new Array(size).fill("."));
    }
  }

  for (let i = fileIdx.length - 1; i >= 0; i--) {
    const fIdx = fileIdx[i];
    const freeNeed = fileSizes[i];

    for (let j = 0; j < emptyIdx.length; j++) {
      const freeIdx = emptyIdx[j];
      const freeSpace = emptySizes[j];

      if (freeIdx > fIdx || !freeSpace) {
        continue;
      }

      if (freeNeed <= freeSpace) {
        for (let k = 0; k < freeNeed; k++) {
          fs[k + freeIdx] = fs[fIdx + k];
          fs[fIdx + k] = ".";
        }

        emptySizes[j] -= freeNeed;
        emptyIdx[j] += freeNeed;
        fileIdx[i] = freeIdx;

        break;
      }
    }
  }

  const result = checkSum(fs);
  console.log("Part 2:", result);
  return result;
}

function checkSum(arr) {
  let result = 0;
  for (let idx = 0; idx < arr.length; idx++) {
    if (arr[idx] === ".") {
      continue;
    }
    result += idx * Number(arr[idx]);
  }
  return result;
}

partOne();
partTwo();
