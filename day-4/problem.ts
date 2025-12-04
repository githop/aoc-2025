import { split_lines } from "..";

export function problem_one(input: string) {
  const grid = parse_input(input);
  let accessible_tp_rolls = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row]!.length; col++) {
      const candidate = grid[row]![col];

      if (
        candidate &&
        candidate === TP_ROLL_CHAR &&
        check_around_grid(row, col, grid)
      ) {
        accessible_tp_rolls += 1;
      }
    }
  }
  return accessible_tp_rolls;
}

export function problem_two(input: string) {
  const grid = parse_input(input);
  let removed_rolls_count = 0;

  let initial_run = remove_rolls_from_grid(grid);
  while (initial_run > 0) {
    removed_rolls_count += initial_run;
    initial_run = remove_rolls_from_grid(grid);
  }

  return removed_rolls_count;
}

function remove_rolls_from_grid(grid: string[][]) {
  let accessible_tp_rolls = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row]!.length; col++) {
      const candidate = grid[row]![col];

      if (
        candidate &&
        candidate === TP_ROLL_CHAR &&
        check_around_grid(row, col, grid)
      ) {
        accessible_tp_rolls += 1;
        grid[row]![col] = REMOVED_CHAR;
      }
    }
  }
  return accessible_tp_rolls;
}

function parse_input(input: string): string[][] {
  const lines = split_lines(input);
  return lines.map((l) => l.split(""));
}

const directions = [
  { row: -1, col: 0 }, // up
  { row: 1, col: 0 }, // down
  { row: 0, col: -1 }, // left
  { row: 0, col: 1 }, // right
  { row: -1, col: -1 }, // diag up-left
  { row: -1, col: 1 }, // diag up-right
  { row: 1, col: -1 }, // diag down-left
  { row: 1, col: 1 }, // diag down-right
];

const TP_ROLL_CHAR = "@";
const REMOVED_CHAR = ".";
const THRESHOLD = 4;

function check_around_grid(x: number, y: number, grid: string[][]) {
  let detections = 0;
  for (const dir of directions) {
    const candidateRow = grid[x + dir.row];
    if (candidateRow) {
      const candidateCol = candidateRow[y + dir.col];
      if (candidateRow && candidateCol && candidateCol === TP_ROLL_CHAR) {
        detections += 1;
        if (detections >= THRESHOLD) {
          return false;
        }
      }
    }
  }
  return true;
}
