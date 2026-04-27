# `@fr4n0m/contract-kit/core`

Core runtime for contract-kit. Schema types, validation, parsing, contract summarization, and code generation utilities.

## Install

```bash
npm install @fr4n0m/contract-kit
```

## Usage

```ts
import {
  readContract,
  validateContract,
  createSummary,
  scanContractFiles,
  readProjectConfig,
} from "@fr4n0m/contract-kit/core";
```

## API

### Types

| Type | Description |
|------|-------------|
| `HttpMethod` | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` |
| `ContractScalarType` | `"string" \| "number" \| "boolean" \| "unknown"` |
| `ContractShape` | `Record<string, ContractScalarType>` |
| `ContractEndpoint` | Single endpoint definition with method, path, params, query, body, response |
| `ContractFile` | `Record<string, ContractEndpoint>` |
| `ContractSummary` | Flat summary of all endpoints across contract files |
| `ProjectConfig` | `{ contractsDir, outputDir }` |

### Functions

#### `validateContract(contract, sourceName?)`
Validates raw JSON against the contract schema. Throws on invalid shape.

#### `readContract(filePath)`
Reads and validates a contract JSON file. Returns `ContractFile`.

#### `readProjectConfig(projectRoot)`
Reads `contract-kit.config.json` from project root. Falls back to defaults.

#### `scanContractFiles(projectRoot, contractsDir?)`
Finds all `.json` contract files in `contractsDir`.

#### `createSummary(contractsByFile)`
Produces a flat `ContractSummary` from a map of contract files.

#### `writeGeneratedArtifacts(outputDir, artifacts)`
Writes generated files to `outputDir`.

## Part of

[`@fr4n0m/contract-kit`](https://ngx-contract-kit-docs.vercel.app) — contract-driven API toolkit for Angular + NestJS.
