import { split_lines } from "..";

export function problem_one(input: string) {
  const lines = parse_input(input);
  let result = 0;
  let num_cols = lines[0]!.length;
  const num_rows = lines.length;
  for (let row = 0; row < num_cols; row++) {
    const stack = [];
    for (let col = 0; col < num_rows; col++) {
      if (lines[col] && lines[col]!.length > row) {
        stack.push(lines[col]![row]);
      }
    }

    const operand = stack.pop() as Operation;
    let operation_acc = OperationStart[operand];

    for (const val of stack) {
      const num = parseInt(val!);
      if (operand === Operations["*"]) {
        operation_acc *= num;
      } else if (operand === Operations["+"]) {
        operation_acc += num;
      }
    }

    result += operation_acc;
  }
  return result;
}

export function problem_two(input: string) {
  const lines = input.split("\n");
  let num_cols = lines[0]!.length;
  const num_rows = lines.length;
  const stacks = [];
  for (let row = 0; row < num_cols; row++) {
    const stack = [];
    for (let col = 0; col < num_rows; col++) {
      if (lines[col] && lines[col]!.length > row) {
        stack.push(lines[col]![row]);
      }
    }
    stacks.push(stack);
  }

  let operand;
  let result = 0;
  let accm = 0;
  for (let i = 0; i < stacks.length; i++) {
    const s = stacks[i]!;

    if (s.at(-1) === Operations["*"] || s.at(-1) === Operations["+"]) {
      operand = s.pop() as Operation;
      accm = OperationStart[operand];
    }

    const num = parseInt(s.join(""));

    if (Number.isNaN(num)) {
      result += accm;
    }

    if (operand === Operations["*"]) {
      accm *= num;
    } else if (operand === Operations["+"]) {
      accm += num;
    }
  }
  result += accm;

  return result;
}

const Operations = {
  "*": "*",
  "+": "+",
} as const;

const OperationStart = {
  "*": 1,
  "+": 0,
} as const;

type Operation = keyof typeof Operations;

function parse_input(input: string) {
  const lines = split_lines(input).map((l) => l.split(" ").filter(Boolean));
  return lines;
}
