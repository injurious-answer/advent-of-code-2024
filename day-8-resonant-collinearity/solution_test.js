import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo, processMap } from "./solution.js";

const { map, antennaByFreq } = processMap("input.txt");

Deno.test("partOne", () => {
  const result = partOne(map, antennaByFreq);
  assertEquals(result, 45);
});

Deno.test("partTwo", () => {
  const result = partTwo(map, antennaByFreq);
  assertEquals(result, 103);
});
