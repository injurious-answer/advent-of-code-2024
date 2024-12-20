import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

const file = await Deno.readTextFile("input.txt");
const lines = file.split("\r\n");

Deno.test("partOne", async () => {
  const result = await partOne(lines);
  assertEquals(result, 7036);
});

Deno.test("partTwo", async () => {
  const result = await partTwo(lines);
  assertEquals(result, 45);
});
