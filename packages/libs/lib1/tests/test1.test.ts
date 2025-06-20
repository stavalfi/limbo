import assert from "node:assert";
import test, { describe, it } from "node:test";

test("synchronous passing test", () => {
  assert.strict.strictEqual(1, 1);
});

describe("A thing", () => {
  it("should work", () => {
    assert.strictEqual(1, 1);
  });

  it("should be ok", () => {
    assert.strictEqual(2, 2);
  });

  describe("a nested thing", () => {
    it("should work", () => {
      assert.strictEqual(3, 3);
    });
  });
});
