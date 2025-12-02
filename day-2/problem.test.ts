import { test_input, type AssertionMap, get_assertion_value } from "..";
import { problem_one, problem_two } from "./problem.ts";
import { describe, it, expect } from "bun:test";

const assertions: AssertionMap<number> = {
  problem_one: {
    example: 1227775554,
    full: 19605500130,
  },
  problem_two: {
    example: 4174379265,
    full: 36862281418,
  },
};

const assert = get_assertion_value(assertions);

describe("Day 2", () => {
  describe("Problem one", () => {
    it("should pass", async () => {
      const text = await test_input("day-2");
      const solution = problem_one(text);
      expect(solution).toBe(assert("problem_one"));
    });
  });
  describe("Problem two", () => {
    it("should pass", async () => {
      const text = await test_input("day-2");
      const solution = problem_two(text);
      expect(solution).toBe(assert("problem_two"));
    });
  });
});
