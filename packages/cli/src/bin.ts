#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  compareContractSummaries,
  createContractDiffReport,
  formatContractDiffReport
} from "@fr4n0m/contract-diff";
import {
  createSummary,
  readContract,
  readProjectConfig,
  scanContractFiles,
  writeGeneratedArtifacts
} from "@fr4n0m/core";
import { generateAngularClient } from "@fr4n0m/generator-angular-client";
import { generateTypeScriptModels } from "@fr4n0m/generator-typescript";
import { generateMocksFromContracts } from "@fr4n0m/mock-generator";
import { generateZodSchemasSource } from "@fr4n0m/validator-zod";
import {
  createNestModelFromContracts,
  generateNestControllerSource,
  generateNestHandlersStubSource
} from "@fr4n0m/plugin-nestjs";
import type { ContractFile, ContractSummary, ProjectConfig } from "@fr4n0m/core";

export type CliLogger = (message: string) => void;

export class CliCommandError extends Error {
  readonly exitCode: number;

  constructor(message: string, exitCode = 1) {
    super(message);
    this.name = "CliCommandError";
    this.exitCode = exitCode;
  }
}

export type CheckCommandOptions = {
  baselinePath?: string;
  jsonOutput?: boolean;
  reportPath?: string;
};

function readCliVersion(): string {
  try {
    const packageJsonPath = path.resolve(__dirname, "..", "package.json");
    if (!fs.existsSync(packageJsonPath)) {
      return "0.0.0";
    }
    const content = fs.readFileSync(packageJsonPath, "utf8");
    const parsed = JSON.parse(content) as { version?: string };
    if (typeof parsed.version === "string" && parsed.version.trim().length > 0) {
      return parsed.version;
    }
  } catch {
    // fallback handled below
  }

  return "0.0.0";
}

function defaultLogger(message: string): void {
  process.stdout.write(`${message}\n`);
}

function fail(message: string, exitCode = 1): never {
  throw new CliCommandError(message, exitCode);
}

function safeReadProjectConfig(projectRoot: string): ProjectConfig {
  try {
    return readProjectConfig(projectRoot);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to read project config";
    fail(message);
  }
}

export function initProject(projectRoot: string, log: CliLogger = defaultLogger): void {
  const config = safeReadProjectConfig(projectRoot);
  const contractsDir = path.join(projectRoot, config.contractsDir);
  const generatedDir = path.join(projectRoot, config.outputDir);
  const contractFile = path.join(contractsDir, "users.contract.json");
  const configFile = path.join(projectRoot, "contract-kit.config.json");

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

  log("Initialized contract-kit project.");
  log(`- Contracts: ${path.relative(projectRoot, contractsDir)}`);
  log(`- Generated: ${path.relative(projectRoot, generatedDir)}`);
}

function loadContractsByFile(projectRoot: string, config: ProjectConfig): Record<string, ContractFile> {
  const files = scanContractFiles(projectRoot, config.contractsDir);
  if (files.length === 0) {
    fail(`No *.contract.json files found in ${config.contractsDir}/`);
  }

  const contractsByFile: Record<string, ContractFile> = {};
  for (const file of files) {
    contractsByFile[file] = readContract(file);
  }
  return contractsByFile;
}

function writeFrontendArtifacts(
  projectRoot: string,
  config: ProjectConfig,
  contractsByFile: Record<string, ContractFile>
): void {
  const outputRoot = path.join(projectRoot, config.outputDir);
  fs.mkdirSync(outputRoot, { recursive: true });

  const contractModelPath = path.join(outputRoot, "contract-model.ts");
  fs.writeFileSync(contractModelPath, generateTypeScriptModels(contractsByFile), "utf8");

  const angularClientPath = path.join(outputRoot, "angular-client.ts");
  fs.writeFileSync(angularClientPath, generateAngularClient(contractsByFile), "utf8");
}

function writeBackendArtifacts(
  projectRoot: string,
  config: ProjectConfig,
  contractsByFile: Record<string, ContractFile>
): void {
  const outputRoot = path.join(projectRoot, config.outputDir);
  fs.mkdirSync(outputRoot, { recursive: true });

  const zodSchemasPath = path.join(outputRoot, "zod-schemas.ts");
  fs.writeFileSync(zodSchemasPath, generateZodSchemasSource(contractsByFile), "utf8");

  const nestControllerPath = path.join(outputRoot, "nest-controller.ts");
  const nestHandlersPath = path.join(outputRoot, "nest-handlers.stub.ts");
  const nestModel = createNestModelFromContracts(contractsByFile);
  fs.writeFileSync(nestControllerPath, generateNestControllerSource(nestModel), "utf8");
  fs.writeFileSync(nestHandlersPath, generateNestHandlersStubSource(nestModel), "utf8");
}

export function generate(projectRoot: string, log: CliLogger = defaultLogger): void {
  const config = safeReadProjectConfig(projectRoot);
  const contractsByFile = loadContractsByFile(projectRoot, config);

  const summary = createSummary(contractsByFile);
  writeGeneratedArtifacts(projectRoot, summary, undefined, config.outputDir);
  writeFrontendArtifacts(projectRoot, config, contractsByFile);
  writeBackendArtifacts(projectRoot, config, contractsByFile);

  log(`Generated artifacts for ${summary.endpoints.length} endpoints.`);
  log(`- ${config.outputDir}/types.ts`);
  log(`- ${config.outputDir}/summary.json`);
  log(`- ${config.outputDir}/contract-model.ts`);
  log(`- ${config.outputDir}/angular-client.ts`);
  log(`- ${config.outputDir}/zod-schemas.ts`);
  log(`- ${config.outputDir}/nest-controller.ts`);
  log(`- ${config.outputDir}/nest-handlers.stub.ts`);
}

export function generateBackend(projectRoot: string, log: CliLogger = defaultLogger): void {
  const config = safeReadProjectConfig(projectRoot);
  const contractsByFile = loadContractsByFile(projectRoot, config);
  writeBackendArtifacts(projectRoot, config, contractsByFile);

  log("Generated backend artifacts.");
  log(`- ${config.outputDir}/zod-schemas.ts`);
  log(`- ${config.outputDir}/nest-controller.ts`);
  log(`- ${config.outputDir}/nest-handlers.stub.ts`);
}

export function generateMocks(projectRoot: string, log: CliLogger = defaultLogger): void {
  const config = safeReadProjectConfig(projectRoot);
  const contractsByFile = loadContractsByFile(projectRoot, config);
  const mocks = generateMocksFromContracts(contractsByFile);

  const outputPath = path.join(projectRoot, config.outputDir, "mocks.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(mocks, null, 2), "utf8");
  log(`Generated mocks for ${Object.keys(mocks).length} endpoints.`);
  log(`- ${config.outputDir}/mocks.json`);
}

export function validateContracts(projectRoot: string, log: CliLogger = defaultLogger): void {
  const config = safeReadProjectConfig(projectRoot);
  const contractsByFile = loadContractsByFile(projectRoot, config);
  const summary = createSummary(contractsByFile);
  log(`Validated ${Object.keys(contractsByFile).length} contract file(s).`);
  log(`- Endpoints: ${summary.endpoints.length}`);
  log("Contracts are valid.");
}

export function check(
  projectRoot: string,
  log: CliLogger = defaultLogger,
  options: CheckCommandOptions = {}
): number {
  const config = safeReadProjectConfig(projectRoot);
  const baselinePath = options.baselinePath
    ? path.resolve(projectRoot, options.baselinePath)
    : path.join(projectRoot, config.outputDir, "summary.json");
  const summaryPath = baselinePath;
  if (!fs.existsSync(summaryPath)) {
    fail(
      options.baselinePath
        ? `Missing baseline summary file: ${options.baselinePath}`
        : `Missing ${config.outputDir}/summary.json. Run \`contract-kit generate\` first.`
    );
  }

  const previous = JSON.parse(fs.readFileSync(summaryPath, "utf8")) as ContractSummary;
  const files = scanContractFiles(projectRoot, config.contractsDir);
  const contractsByFile: Record<string, ContractFile> = {};
  for (const file of files) {
    contractsByFile[file] = readContract(file);
  }

  const current = createSummary(contractsByFile);
  const diff = compareContractSummaries(previous, current);
  const report = createContractDiffReport(diff);

  if (options.reportPath) {
    const resolvedReportPath = path.resolve(projectRoot, options.reportPath);
    fs.mkdirSync(path.dirname(resolvedReportPath), { recursive: true });
    fs.writeFileSync(resolvedReportPath, JSON.stringify(report, null, 2), "utf8");
    log(`Wrote contract diff report: ${path.relative(projectRoot, resolvedReportPath)}`);
  }

  if (options.jsonOutput) {
    log(JSON.stringify(report));
  }

  if (diff.breaking) {
    const lines = formatContractDiffReport(diff);
    for (const line of lines) {
      log(line);
    }
    return 2;
  }

  log("No breaking changes detected.");
  return 0;
}

function parseCheckOptions(rawArgs: string[]): CheckCommandOptions {
  const options: CheckCommandOptions = {};

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (!arg) {
      continue;
    }

    if (arg === "--json") {
      options.jsonOutput = true;
      continue;
    }

    if (arg === "--baseline") {
      const value = rawArgs[index + 1];
      if (!value || value.startsWith("-")) {
        fail("Missing value for --baseline");
      }
      options.baselinePath = value;
      index += 1;
      continue;
    }

    if (arg === "--report") {
      const value = rawArgs[index + 1];
      if (!value || value.startsWith("-")) {
        fail("Missing value for --report");
      }
      options.reportPath = value;
      index += 1;
      continue;
    }

    fail(`Unknown check option "${arg}".`);
  }

  return options;
}

export function printHelp(log: CliLogger = defaultLogger): void {
  log(`contract-kit v${readCliVersion()}`);
  log("");
  log("Usage:");
  log("  contract-kit init");
  log("  contract-kit generate");
  log("  contract-kit backend");
  log("  contract-kit mock");
  log("  contract-kit validate");
  log("  contract-kit check [--json] [--report <path>] [--baseline <summary-path>]");
  log("  contract-kit --version");
}

export function runCommand(
  command: string | undefined,
  projectRoot: string,
  log: CliLogger = defaultLogger,
  rawArgs: string[] = []
): number {
  if (!command || command === "--help" || command === "-h") {
    printHelp(log);
    return 0;
  }

  if (command === "--version" || command === "-v" || command === "version") {
    log(readCliVersion());
    return 0;
  }

  if (command === "init") {
    initProject(projectRoot, log);
    return 0;
  }
  if (command === "generate") {
    generate(projectRoot, log);
    return 0;
  }
  if (command === "backend") {
    generateBackend(projectRoot, log);
    return 0;
  }
  if (command === "mock") {
    generateMocks(projectRoot, log);
    return 0;
  }
  if (command === "validate") {
    validateContracts(projectRoot, log);
    return 0;
  }
  if (command === "check") {
    return check(projectRoot, log, parseCheckOptions(rawArgs));
  }

  fail(`Unknown command "${command}". Use --help.`);
}

function run(): void {
  const [, , command, ...rawArgs] = process.argv;
  const projectRoot = process.cwd();
  try {
    const exitCode = runCommand(command, projectRoot, defaultLogger, rawArgs);
    if (exitCode !== 0) {
      process.exit(exitCode);
    }
  } catch (error) {
    if (error instanceof CliCommandError) {
      process.stderr.write(`Error: ${error.message}\n`);
      process.exit(error.exitCode);
    }
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`Error: ${message}\n`);
    process.exit(1);
  }
}

run();
