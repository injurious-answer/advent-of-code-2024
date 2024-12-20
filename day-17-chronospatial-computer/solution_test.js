import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

const file = await Deno.readTextFile("input.txt");

Deno.test("partOne", async () => {
  const result = await partOne(file);
  assertEquals(result, "5,7,3,0");
});

Deno.test("partTwo", async () => {
  const result = await partTwo(file);
  assertEquals(result, 117440);
});