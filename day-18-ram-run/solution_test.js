import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

Deno.test("partOne", async () => {
  const result = await partOne();
  assertEquals(result, 146);
});

Deno.test("partTwo", async () => {
  const result = await partTwo();
  assertEquals(result, "No byte blocks the path");
});
