import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

Deno.test("part1", async () => {
  const lines = (await Deno.readTextFile("./input.txt")).trimEnd().split("\n");
  const grid = lines.map((line) => line.split(""));
  assertEquals(partOne(grid), 18);
});

Deno.test("part2", async () => {
  const lines = (await Deno.readTextFile("./input.txt")).trimEnd().split("\n");
  const grid = lines.map((line) => line.split(""));
  assertEquals(partTwo(grid), 9);
});
