#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createSummary, diffSummaries, readContract, scanContractFiles, writeGeneratedArtifacts } from "../../core/src";
import type { ContractFile, ContractSummary } from "../../core/src";

function log(message: string): void {
  process.stdout.write(`${message}\n`);
}

function fail(message: string): never {
  process.stderr.write(`Error: ${message}\n`);
  process.exit(1);
}

function initProject(projectRoot: string): void {
  const contractsDir = path.join(projectRoot, "contracts");
  const generatedDir = path.join(projectRoot, "generated");
  const contractFile = path.join(contractsDir, "users.contract.json");
  const configFile = path.join(projectRoot, "ngx-contract-kit.config.json");

  fs.mkdirSync(contractsDir, { recursive: true });
  fs.mkdirSync(generatedDir, { recursive: true });

  if (!fs.existsSync(contractFile)) {
    const starter: ContractFile = {
      getUser: {
        method: "GET",
        path: "/users/:id"
      },
      listUsers: {
        method: "GET",
        path: "/users"
      }
    };
    fs.writeFileSync(contractFile, JSON.stringify(starter, null, 2), "utf8");
  }

  if (!fs.existsSync(configFile)) {
    const config = {
      schemaVersion: 1,
      contractsDir: "contracts",
      outputDir: "generated"
    };
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2), "utf8");
  }

  log("Initialized ngx-contract-kit project.");
  log(`- Contracts: ${path.relative(projectRoot, contractsDir)}`);
  log(`- Generated: ${path.relative(projectRoot, generatedDir)}`);
}

function generate(projectRoot: string): void {
  const files = scanContractFiles(projectRoot);
  if (files.length === 0) {
    fail("No *.contract.json files found in contracts/");
  }

  const contractsByFile: Record<string, ContractFile> = {};
  for (const file of files) {
    contractsByFile[file] = readContract(file);
  }

  const summary = createSummary(contractsByFile);
  writeGeneratedArtifacts(projectRoot, summary);

  log(`Generated artifacts for ${summary.endpoints.length} endpoints.`);
  log("- generated/types.ts");
  log("- generated/summary.json");
}

function check(projectRoot: string): void {
  const summaryPath = path.join(projectRoot, "generated", "summary.json");
  if (!fs.existsSync(summaryPath)) {
    fail("Missing generated/summary.json. Run `ngx-contract-kit generate` first.");
  }

  const previous = JSON.parse(fs.readFileSync(summaryPath, "utf8")) as ContractSummary;
  const files = scanContractFiles(projectRoot);
  const contractsByFile: Record<string, ContractFile> = {};
  for (const file of files) {
    contractsByFile[file] = readContract(file);
  }

  const current = createSummary(contractsByFile);
  const diff = diffSummaries(previous, current);

  if (diff.breaking) {
    log("Breaking changes detected:");
    for (const removed of diff.removed) {
      log(`- Removed endpoint: ${removed}`);
    }
    process.exit(2);
  }

  log("No breaking changes detected.");
}

function printHelp(): void {
  log("ngx-contract-kit");
  log("");
  log("Usage:");
  log("  ngx-contract-kit init");
  log("  ngx-contract-kit generate");
  log("  ngx-contract-kit check");
}

function run(): void {
  const command = process.argv[2];
  const projectRoot = process.cwd();

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "init") {
    initProject(projectRoot);
    return;
  }
  if (command === "generate") {
    generate(projectRoot);
    return;
  }
  if (command === "check") {
    check(projectRoot);
    return;
  }

  fail(`Unknown command "${command}". Use --help.`);
}

run();
