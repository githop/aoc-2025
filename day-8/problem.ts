import { get_environment, split_lines } from "..";

export function problem_one(input: string) {
  const e = get_environment();
  const size = e === "example" ? 10 : 1000;

  const points = parse_input(input);
  const all_pairs_sorted = generate_pairs(points);
  const uf = new UnionFind(points.length);

  for (let i = 0; i < size; i++) {
    const pair = all_pairs_sorted[i]!;
    uf.union(pair.a_idx, pair.b_idx);
  }
  const sizes = uf.getComponentSizes();
  sizes.sort((a, b) => b - a);
  const [a, b, c] = sizes as [number, number, number];
  return a * b * c;
}

export function problem_two(input: string) {
  const points = parse_input(input);
  const all_pairs_sorted = generate_pairs(points);
  const uf = new UnionFind(points.length);
  for (let i = 0; i < all_pairs_sorted.length; i++) {
    const pair = all_pairs_sorted[i]!;
    if (uf.union(pair.a_idx, pair.b_idx)) {
      if (uf.count === 1) {
        return points[pair.a_idx]![0] * points[pair.b_idx]![0];
      }
    }
  }
  return 0;
}

function solve(input: string, size: number = 10) {
  const points = parse_input(input);
  const all_pairs_sorted = generate_pairs(points);
  const uf = new UnionFind(points.length);

  for (let i = 0; i < size; i++) {
    const pair = all_pairs_sorted[i]!;
    uf.union(pair.a_idx, pair.b_idx);
  }
  const sizes = uf.getComponentSizes();
  sizes.sort((a, b) => b - a);
  const [a, b, c] = sizes as [number, number, number];
  return a * b * c;
}

// x,y,z
type Point = [number, number, number];
// index of points array references Point
type Points = number[];

interface Pair {
  a_idx: number;
  b_idx: number;
  distance: number;
}

function parse_input(input: string) {
  const lines = split_lines(input);
  const points = lines.map((line) => row_to_point(line));
  return points;
}

// ie "162,817,812" -> Point
function row_to_point(row: string): Point {
  const parts = row.split(",").map((n) => parseInt(n)) as Point;
  return parts;
}

function euclidean_distance(a: Point, b: Point) {
  const distances = [];
  for (let i = 0; i < 3; i++) {
    distances.push(b[i]! - a[i]!);
  }
  return Math.hypot(...distances);
}

function generate_pairs(points: Point[]) {
  const distances: Pair[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];
      if (a && b) {
        const distance = euclidean_distance(a, b);
        const pair: Pair = { a_idx: i, b_idx: j, distance };
        distances.push(pair);
      }
    }
  }
  distances.sort((a, b) => a.distance - b.distance);
  return distances;
}

class UnionFind {
  count: number;
  #parent: number[];
  #size: number[];
  constructor(n: number) {
    this.count = n;
    this.#parent = new Array(n);
    this.#size = new Array(n);
    for (let i = 0; i < n; i++) {
      this.#parent[i] = i;
      this.#size[i] = 1;
    }
  }
  find(i: number): number {
    if (this.#parent[i] !== i) {
      this.#parent[i] = this.find(this.#parent[i]!);
    }
    return this.#parent[i];
  }
  union(i: number, j: number): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI === rootJ) {
      return false;
    }

    const sizeI = this.#size[rootI]!;
    const sizeJ = this.#size[rootJ]!;

    if (sizeI < sizeJ) {
      this.#parent[rootI] = rootJ;
      this.#size[rootJ]! += this.#size[rootI]!;
    } else {
      this.#parent[rootJ] = rootI;
      this.#size[rootI]! += this.#size[rootJ]!;
    }

    this.count--;
    return true;
  }

  getComponentSizes(): number[] {
    const sizes: number[] = [];
    for (let i = 0; i < this.#parent.length; i++) {
      if (this.#parent[i] === i) {
        sizes.push(this.#size[i]!);
      }
    }
    return sizes;
  }
}
