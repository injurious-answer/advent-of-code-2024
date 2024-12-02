import { assertEquals } from "jsr:@std/assert";
import { parseInput, part1, part2 } from "./solution.js";

const rawInput = await Deno.readTextFile("./input.txt");
const testInput = parseInput(rawInput);

Deno.test("part1", () => {
  assertEquals(part1(testInput), 2);
});

Deno.test("part2", () => {
  assertEquals(part2(testInput), 4);
});
