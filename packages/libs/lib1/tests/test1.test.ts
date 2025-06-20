import assert from "node:assert";
import test, { describe, it } from "node:test";
import { setupUnitTests } from "#libs/unit-test-infra";

setupUnitTests();

await test("synchronous passing test", () => {
  assert.strict.strictEqual(1, 1);
});

await describe("A thing", async () => {
  await it("should work", () => {
    assert.strictEqual(1, 1);
  });

  await it("should be ok", () => {
    assert.strictEqual(2, 2);
  });

  await describe("a nested thing", async () => {
    await it("should work", () => {
      assert.strictEqual(3, 3);
    });
  });
});
