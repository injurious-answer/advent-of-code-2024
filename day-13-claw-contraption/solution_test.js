import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

const file = await Deno.readTextFile("input.txt");
const machines = file.split("\r\n\r\n");

Deno.test("partOne", async () => {
  const result = await partOne(machines);
  assertEquals(result, 480);
});

Deno.test("partTwo", async () => {
  const result = await partTwo(machines);
  assertEquals(result, 875318608908);
});
