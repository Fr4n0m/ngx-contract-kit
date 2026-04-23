import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const thisDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(thisDir, "..", "..");
const packageListPath = resolve(thisDir, "release-packages.json");
const packages = JSON.parse(readFileSync(packageListPath, "utf8"));
const pnpmCmd = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function run(command, args, cwd = repoRoot) {
  const formatted = [command, ...args].join(" ");
  process.stdout.write(`\n> ${formatted}\n`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32"
  });
  if (result.error) {
    process.stderr.write(`Command error: ${result.error.message}\n`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run(pnpmCmd, ["build"]);
run(pnpmCmd, ["test"]);

for (const pkg of packages) {
  run(pnpmCmd, ["--filter", pkg, "exec", "npm", "pack", "--dry-run"]);
}

process.stdout.write("\nRelease preflight passed.\n");
