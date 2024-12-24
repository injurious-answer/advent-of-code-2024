import { assertEquals } from "jsr:@std/assert";
import { calculateCheats, path } from "./solution.js";

Deno.test("partOne", () => {
  const result = calculateCheats(path, 2);
  assertEquals(result, 0);
});

Deno.test("partTwo", () => {
  const result = calculateCheats(path, 20);
  assertEquals(result, 0);
});
