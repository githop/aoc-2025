#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: $0 <day_number>"
  echo "Example: $0 1"
  exit 1
fi

DAY=$1
DIR="day-$DAY"

if [ -d "$DIR" ]; then
  echo "Error: Directory $DIR already exists"
  exit 1
fi

cp -r template "$DIR"
echo "Created $DIR from template"

# Interpolate DAY into problem.test.ts
sed -i "s/describe(\"Day \",/describe(\"Day $DAY\",/" "$DIR/problem.test.ts"
sed -i "s/test_input()/test_input(\"day-$DAY\")/" "$DIR/problem.test.ts"
