export async function open_input(day: string, type: "example" | "full") {
  const name = type === "example" ? "example.input.txt" : "input.txt";
  const file = Bun.file(`${day}/${name}`);

  const text = await file.text();
  return text;
}

type Environment = "example" | "full";
export function get_environment(): Environment {
  const inputFileEnvVar = process.env.INPUT_FILE;
  const input =
    inputFileEnvVar != null && typeof inputFileEnvVar === "string"
      ? (inputFileEnvVar as "full")
      : "example";
  return input;
}

export type AssertionMap<T> = {
  problem_one: {
    example: T;
    full: T;
  };
  problem_two: {
    example: T;
    full: T;
  };
};

export function get_assertion_value<T>(assertions: AssertionMap<T>) {
  return (problem: keyof AssertionMap<T>) => {
    const env = get_environment();
    return assertions[problem][env];
  };
}

export async function test_input(day: string) {
  const text = await open_input(day, get_environment());
  return text;
}

export function split_lines(text: string) {
  return text.split("\n").filter(Boolean);
}
