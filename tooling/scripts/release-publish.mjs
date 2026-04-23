import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const thisDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(thisDir, "..", "..");
const packageListPath = resolve(thisDir, "release-packages.json");
const packages = JSON.parse(readFileSync(packageListPath, "utf8"));
const pnpmCmd = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

const args = process.argv.slice(2);
const isPublish = args.includes("--publish");
const isDryRun = !isPublish;

let tag = "latest";
const tagIndex = args.indexOf("--tag");
if (tagIndex >= 0) {
  const value = args[tagIndex + 1];
  if (!value || value.startsWith("-")) {
    process.stderr.write("Error: missing value for --tag\n");
    process.exit(1);
  }
  tag = value;
}

function run(command, runArgs, cwd = repoRoot) {
  const formatted = [command, ...runArgs].join(" ");
  process.stdout.write(`\n> ${formatted}\n`);
  const result = spawnSync(command, runArgs, {
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

process.stdout.write(
  `${isDryRun ? "Running publish dry-run" : "Publishing packages"} (tag=${tag}) for ${packages.length} package(s).\n`
);

for (const pkg of packages) {
  const publishArgs = ["--filter", pkg, "publish", "--access", "public", "--no-git-checks", "--tag", tag];
  if (isDryRun) {
    publishArgs.push("--dry-run");
  }
  run(pnpmCmd, publishArgs);
}

process.stdout.write(
  `\n${isDryRun ? "Publish dry-run finished." : "Publish finished successfully."}\n`
);
