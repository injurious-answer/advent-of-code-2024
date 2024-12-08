import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

Deno.test("partOne", async () => {
  const result = await partOne();
  assertEquals(result, 3749);
});

Deno.test("partTwo", async () => {
  const result = await partTwo();
  assertEquals(result, 11387);
});
