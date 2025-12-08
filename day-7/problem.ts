import { split_lines } from "..";

export function problem_one(input: string) {
  const grid = parse_input(input);
  const first_row = grid[0]!;

  let split_count = 0;
  const start_index = first_row.findIndex((v) => v === CHARS.START);
  let current_beams = new Set<number>();
  current_beams.add(start_index);

  for (let row = 1; row < grid.length; row++) {
    const next_beams = new Set<number>();
    for (const col of current_beams) {
      const char_maybe = grid[row]![col];
      if (char_maybe && char_maybe === CHARS.SPLITTER) {
        split_count += 1;
        next_beams.add(col - 1);
        next_beams.add(col + 1);
      } else if (char_maybe === CHARS.EMPTY) {
        next_beams.add(col);
      }
    }
    current_beams = next_beams;
  }

  return split_count;
}

export function problem_two(input: string) {
  const grid = parse_input(input);
  const first_row = grid[0]!;

  let path_count = 0;
  const start_index = first_row.findIndex((v) => v === CHARS.START);
  let paths = new Map<number, number>();
  paths.set(start_index, 1);

  for (let row = 1; row < grid.length; row++) {
    const next_paths = new Map<number, number>();
    for (const col of paths.keys()) {
      const char = grid[row]![col];
      const count = paths.get(col)!;
      if (char == null) {
        continue;
      }
      if (char === CHARS.SPLITTER) {
        next_paths.set(col + 1, next_value(next_paths, col + 1) + count);
        next_paths.set(col - 1, next_value(next_paths, col - 1) + count);
      } else if (char === CHARS.EMPTY) {
        next_paths.set(col, next_value(next_paths, col) + count);
      }
    }
    paths = next_paths;
  }

  for (const count of paths.values()) {
    path_count += count;
  }

  return path_count;
}

function next_value(map: Map<number, number>, index: number) {
  return map.get(index) ?? 0;
}

const CHARS = {
  START: "S",
  EMPTY: ".",
  SPLITTER: "^",
} as const;

function parse_input(input: string) {
  const lines = split_lines(input);
  const grid = lines.map((l) => l.split(""));
  return grid;
}
