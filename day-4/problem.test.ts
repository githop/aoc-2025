import { test_input, type AssertionMap, get_assertion_value } from "..";
import { problem_one, problem_two } from "./problem.ts";
import { describe, it, expect } from "bun:test";

const assertions: AssertionMap<number> = {
  problem_one: {
    example: 13,
    full: 1395,
  },
  problem_two: {
    example: 43,
    full: 8451,
  },
};

const assert = get_assertion_value(assertions);

describe("Day 4", () => {
  describe("Problem one", () => {
    it("should pass", async () => {
      const text = await test_input("day-4");
      const solution = problem_one(text);
      expect(solution).toBe(assert("problem_one"));
    });
  });
  describe("Problem two", () => {
    it("should pass", async () => {
      const text = await test_input("day-4");
      const solution = problem_two(text);
      expect(solution).toBe(assert("problem_two"));
    });
  });
});
