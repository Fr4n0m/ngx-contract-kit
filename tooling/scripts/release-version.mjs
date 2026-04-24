import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const thisDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(thisDir, "..", "..");
const packageListPath = resolve(thisDir, "release-packages.json");
const packageNames = JSON.parse(readFileSync(packageListPath, "utf8"));

const args = process.argv.slice(2);
const nextVersion = args.find((arg) => !arg.startsWith("-"));
const apply = args.includes("--apply");

if (!nextVersion) {
  process.stderr.write("Usage: node tooling/scripts/release-version.mjs <version> [--apply]\n");
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(nextVersion)) {
  process.stderr.write(`Invalid semver version: ${nextVersion}\n`);
  process.exit(1);
}

const packageLocations = new Map();
for (const pkgName of packageNames) {
  const shortName = pkgName.replace("@fr4n0m/", "");
  const packageJsonPath = resolve(repoRoot, "packages", shortName, "package.json");
  if (!existsSync(packageJsonPath)) {
    process.stderr.write(`Missing package.json for ${pkgName}: ${packageJsonPath}\n`);
    process.exit(1);
  }
  packageLocations.set(pkgName, packageJsonPath);
}

function updateDependencyBlock(block) {
  if (!block) {
    return;
  }
  for (const depName of Object.keys(block)) {
    if (packageLocations.has(depName)) {
      const currentRange = String(block[depName]);
      if (currentRange.startsWith("workspace:")) {
        continue;
      }
      block[depName] = `^${nextVersion}`;
    }
  }
}

for (const [pkgName, packageJsonPath] of packageLocations.entries()) {
  const current = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  current.version = nextVersion;
  updateDependencyBlock(current.dependencies);
  updateDependencyBlock(current.devDependencies);
  updateDependencyBlock(current.peerDependencies);

  const output = `${JSON.stringify(current, null, 2)}\n`;
  if (apply) {
    writeFileSync(packageJsonPath, output, "utf8");
  }
  process.stdout.write(`${apply ? "Updated" : "Would update"} ${pkgName} -> ${nextVersion}\n`);
}

if (!apply) {
  process.stdout.write("Dry run complete. Re-run with --apply to write changes.\n");
}
