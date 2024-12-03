import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

Deno.test("part1", async () => {
  const rawInput = await Deno.readTextFile("./input.txt");
  assertEquals(partOne(rawInput), 161);
});

Deno.test("part2", async () => {
  const rawInput = await Deno.readTextFile("./input.txt");
  assertEquals(partTwo(rawInput), 48);
});
