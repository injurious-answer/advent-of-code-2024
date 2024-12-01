import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test("testPartOne", () => {
  assertEquals(partOne(testInput), 11);
});

Deno.test("testPartTwo", () => {
  assertEquals(partTwo(testInput), 31);
});
