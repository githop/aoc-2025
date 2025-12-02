import { split_lines } from "..";

export function problem_one(input: string) {
  const lines = parse_input(input);

  let pointer = 50;
  let password = 0;
  const n = 100;

  for (const line of lines) {
    const [dir, count] = line;
    if (dir === Dirs.L) {
      pointer = (((pointer - count) % n) + n) % n;
    }
    if (dir === Dirs.R) {
      pointer = (pointer + count) % n;
    }

    if (pointer === 0) {
      password += 1;
    }
  }

  return password;
}

export function problem_two(input: string) {
  const lines = parse_input(input);

  let password = 0;
  let pointer = 50;
  let n = 100;
  for (const line of lines) {
    const [dir, count] = line;
    for (let i = 0; i < count; i++) {
      if (dir === Dirs.L) {
        pointer = (((pointer - 1) % n) + n) % n;
      }
      if (dir === Dirs.R) {
        pointer = (pointer + 1) % n;
      }
      if (pointer === 0) {
        password += 1;
      }
    }
  }

  return password;
}

type Dir = "L" | "R";
const Dirs = {
  L: "L",
  R: "R",
} as const;

function parse_input(input: string): Array<readonly [Dir, number]> {
  const lines = split_lines(input);
  const parsed = lines.map((l) => {
    return [l[0] as Dir, parseInt(l.slice(1))] as const;
  });
  return parsed;
}
