export function problem_one(input: string) {
  const parsed = parse_input(input);

  let sum = 0;

  for (const line of parsed) {
    const [from, to] = line;
    for (let i = from; i < to + 1; i++) {
      if (check_symmetry(i)) {
        sum += i;
      }
    }
  }

  return sum;
}

export function problem_two(input: string) {
  const parsed = parse_input(input);

  let sum = 0;

  for (const line of parsed) {
    const [from, to] = line;
    for (let i = from; i < to + 1; i++) {
      if (check_periodic(i)) {
        sum += i;
      }
    }
  }

  return sum;
}

function parse_input(input: string) {
  const splat = input
    .split(",")
    .map((l) => l.split("-").map((i) => parseInt(i)));
  return splat as [number, number][];
}

function check_symmetry(a: number): boolean {
  const asStr = String(a);
  if (asStr.length % 2 === 1) {
    return false;
  }

  let allMatch = true;
  for (let i = 0; i < asStr.length / 2; i++) {
    if (asStr[i] !== asStr[i + asStr.length / 2]) {
      allMatch = false;
      break;
    }
  }

  return allMatch;
}

function check_periodic(a: number) {
  const asStr = String(a);
  const len = asStr.length;

  for (let i = 1; i <= len / 2; i++) {
    if (asStr.length % i === 0) {
      const sub = asStr.slice(0, i);
      if (sub.repeat(len / i) === asStr) {
        return true;
      }
    }
  }
  return false;
}
