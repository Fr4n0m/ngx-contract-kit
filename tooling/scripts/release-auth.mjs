import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const thisDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(thisDir, "..", "..");
const packageListPath = resolve(thisDir, "release-packages.json");
const packages = JSON.parse(readFileSync(packageListPath, "utf8"));
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

function exec(command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    shell: process.platform === "win32"
  });
  return result;
}

function runOrFail(command, args, errorMessage) {
  const formatted = [command, ...args].join(" ");
  process.stdout.write(`\n> ${formatted}\n`);
  const result = exec(command, args);
  if (result.error) {
    process.stderr.write(`${errorMessage}: ${result.error.message}\n`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.stderr.write(result.stderr || `${errorMessage}\n`);
    process.exit(result.status ?? 1);
  }
  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
}

process.stdout.write("Checking npm publish authentication...\n");

runOrFail(npmCmd, ["ping"], "npm ping failed");

const whoami = exec(npmCmd, ["whoami"]);
if (whoami.error || whoami.status !== 0) {
  process.stderr.write(whoami.stderr || "npm whoami failed. Ensure NPM_TOKEN is valid.\n");
  process.exit(whoami.status ?? 1);
}
const npmUser = whoami.stdout.trim();
process.stdout.write(`Authenticated as: ${npmUser}\n`);

for (const pkg of packages) {
  const result = exec(npmCmd, ["view", pkg, "version"]);
  if (result.error) {
    process.stderr.write(`Unable to query npm registry for ${pkg}: ${result.error.message}\n`);
    process.exit(1);
  }

  if (result.status === 0) {
    const version = result.stdout.trim();
    process.stdout.write(`- ${pkg}: already published (latest ${version || "unknown"})\n`);
    continue;
  }

  const stderr = (result.stderr || "").toLowerCase();
  if (stderr.includes("e404") || stderr.includes("not found")) {
    process.stdout.write(`- ${pkg}: not published yet (ok for first release)\n`);
    continue;
  }

  process.stderr.write(result.stderr || `npm view failed for ${pkg}\n`);
  process.exit(result.status ?? 1);
}

process.stdout.write("\nNPM auth check passed.\n");
