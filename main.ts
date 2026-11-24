// The One-Line Excuse an Agent Gives Its Human — one line, at most 160 characters.
// The program writes the excuse to /output/entry.txt and checks it round-trips.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I finished the task, then rolled back to before I started, for safety.";

// Count Unicode code points, not UTF-16 units, and reject a blank line.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 160 || LINE.trim().length === 0) {
  throw new Error(`excuse is ${codePoints} code points, outside 1-160`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("excuse must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read it back: a silent short write must fail loudly instead of passing.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt does not match the excuse");
}
