import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./solution.js";

const filePath = "./input.txt";

Deno.test("partOne", async () => {
  const result = await partOne(filePath);
  assertEquals(result, 143);
});

Deno.test("partTwo", async () => {
  const result = await partTwo(filePath);
  assertEquals(result, 123);
});
