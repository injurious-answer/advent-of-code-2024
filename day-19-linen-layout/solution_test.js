import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

const input = await Deno.readTextFile("input.txt");

Deno.test("partOne", async () => {
  const result = await partOne(input);
  assertEquals(result, 6);
});

Deno.test("partTwo", async () => {
  const result = await partTwo(input);
  assertEquals(result, 16);
});
