import { split_lines } from "..";

export function problem_one(input: string) {
  const banks = parse_input(input);

  let sum = 0;
  for (const bank of banks) {
    const joltage = find_joltage(bank, 2);
    sum += joltage;
  }

  return sum;
}

export function problem_two(input: string) {
  const banks = parse_input(input);

  let sum = 0;
  for (const bank of banks) {
    const joltage = find_joltage(bank, 12);
    sum += joltage;
  }

  return sum;
}

function parse_input(input: string) {
  const lines = split_lines(input);
  return lines.map((line) => {
    const nums = [];
    for (const char of line) {
      nums.push(parseInt(char));
    }
    return nums;
  });
}

function find_joltage(bank: number[], size: number) {
  let joltage_str = "";
  let start = 0;
  const bank_size = bank.length;
  let end = bank_size - size;

  for (let i = 0; i < size; i++) {
    let candidate = 0;
    for (let j = start; j < end + 1; j++) {
      if (bank[j]! > candidate) {
        candidate = bank[j]!;
        start = j + 1;
      }
    }
    end++;
    joltage_str += String(candidate);
  }

  return parseInt(joltage_str);
}
