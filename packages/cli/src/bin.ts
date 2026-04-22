#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  createSummary,
  diffSummaries,
  readContract,
  readProjectConfig,
  scanContractFiles,
  writeGeneratedArtifacts
} from "../../core/src";
import type { ContractFile, ContractSummary, ProjectConfig } from "../../core/src";

function log(message: string): void {
  process.stdout.write(`${message}\n`);
}

function fail(message: string): never {
  process.stderr.write(`Error: ${message}\n`);
  process.exit(1);
}

function safeReadProjectConfig(projectRoot: string): ProjectConfig {
  try {
    return readProjectConfig(projectRoot);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to read project config";
    fail(message);
  }
}

function initProject(projectRoot: string): void {
  const config = safeReadProjectConfig(projectRoot);
  const contractsDir = path.join(projectRoot, config.contractsDir);
  const generatedDir = path.join(projectRoot, config.outputDir);
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
    const initialConfig: ProjectConfig = {
      schemaVersion: 1,
      contractsDir: "contracts",
      outputDir: "generated"
    };
    fs.writeFileSync(configFile, JSON.stringify(initialConfig, null, 2), "utf8");
  }

  log("Initialized ngx-contract-kit project.");
  log(`- Contracts: ${path.relative(projectRoot, contractsDir)}`);
  log(`- Generated: ${path.relative(projectRoot, generatedDir)}`);
}

function generate(projectRoot: string): void {
  const config = safeReadProjectConfig(projectRoot);
  const files = scanContractFiles(projectRoot, config.contractsDir);
  if (files.length === 0) {
    fail(`No *.contract.json files found in ${config.contractsDir}/`);
  }

  const contractsByFile: Record<string, ContractFile> = {};
  for (const file of files) {
    contractsByFile[file] = readContract(file);
  }

  const summary = createSummary(contractsByFile);
  writeGeneratedArtifacts(projectRoot, summary, contractsByFile, config.outputDir);

  log(`Generated artifacts for ${summary.endpoints.length} endpoints.`);
  log(`- ${config.outputDir}/types.ts`);
  log(`- ${config.outputDir}/summary.json`);
  log(`- ${config.outputDir}/contract-model.ts`);
  log(`- ${config.outputDir}/angular-client.ts`);
}

function check(projectRoot: string): void {
  const config = safeReadProjectConfig(projectRoot);
  const summaryPath = path.join(projectRoot, config.outputDir, "summary.json");
  if (!fs.existsSync(summaryPath)) {
    fail(`Missing ${config.outputDir}/summary.json. Run \`ngx-contract-kit generate\` first.`);
  }

  const previous = JSON.parse(fs.readFileSync(summaryPath, "utf8")) as ContractSummary;
  const files = scanContractFiles(projectRoot, config.contractsDir);
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
    for (const changed of diff.changedSignatures) {
      log(`- Changed endpoint signature: ${changed}`);
    }
    for (const removedStatus of diff.removedResponseStatuses) {
      log(`- Removed response status: ${removedStatus}`);
    }
    for (const removedFields of diff.removedRequestFields) {
      log(`- Removed request field: ${removedFields}`);
    }
    for (const addedFields of diff.addedRequestFields) {
      log(`- Added required request field: ${addedFields}`);
    }
    for (const changedRequestTypes of diff.changedRequestFieldTypes) {
      log(`- Changed request field type: ${changedRequestTypes}`);
    }
    for (const removedResponseFields of diff.removedResponseFields) {
      log(`- Removed response field: ${removedResponseFields}`);
    }
    for (const changedResponseTypes of diff.changedResponseFieldTypes) {
      log(`- Changed response field type: ${changedResponseTypes}`);
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
