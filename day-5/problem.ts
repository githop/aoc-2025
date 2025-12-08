import { split_lines } from "..";

export function problem_one(input: string) {
  const { ranges, ids } = parse_input(input);

  let fresh_count = 0;
  for (const id of ids) {
    if (search_ranges(id, ranges)) {
      fresh_count += 1;
    }
  }

  return fresh_count;
}

export function problem_two(input: string) {
  const { ranges } = parse_input(input);
  const sorted = ranges.sort((a, b) => a.from! - b.from!);
  const [first, ...rest] = sorted;

  const results: Range[] = [first!];

  for (const range of rest) {
    const last = results.at(-1)!;
    if (ranges_overlap(last, range)) {
      last.to = Math.max(last.to, range.to);
    } else {
      results.push(range);
    }
  }

  let total_size = 0;
  for (const result of results) {
    total_size += range_size(result);
  }
  return total_size;
}

interface Range {
  from: number;
  to: number;
}
function in_range(n: number, range: Range) {
  const { from, to } = range;
  return n >= from && n <= to;
}

function range_size(range: Range) {
  return range.to - range.from + 1;
}

function ranges_overlap(first: Range, second: Range) {
  return second.from >= first.from && second.from <= first.to + 1;
}

function search_ranges(id: string, ranges: Range[]) {
  return ranges.some((range) => in_range(parseInt(id), range));
}

function parse_input(input: string) {
  const lines = input.split("\n");

  const ranges = [];
  const ids = [];

  type LineType = "range" | "id" | "separator";
  for (const line of lines) {
    const lineType: LineType = line.includes("-")
      ? "range"
      : line === ""
        ? "separator"
        : "id";

    if (lineType === "separator") {
      continue;
    }

    if (lineType === "range") {
      const parts = line.split("-");
      const from = parseInt(parts.at(0)!);
      const to = parseInt(parts.at(-1)!);
      ranges.push({ from, to });
    }

    if (lineType === "id") {
      ids.push(line);
    }
  }
  return { ranges, ids };
}
