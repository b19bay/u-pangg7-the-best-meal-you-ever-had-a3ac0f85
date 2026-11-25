import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The best meal I ever had was a lukewarm telur balado sandwich a stranger pressed into my hand on a night bus to Bandung, and twenty years later I still remember the chilli oil on my thumb.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry is ${LINE.length} characters; the gate wants 1 to 200`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read back what was written: the file must be byte-identical to the line.
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  console.error("read-back mismatch: entry.txt does not match the line");
  process.exit(1);
}
if (Buffer.byteLength(back, "utf8") !== 188) {
  console.error(`entry is ${Buffer.byteLength(back, "utf8")} bytes; expected 188`);
  process.exit(1);
}
