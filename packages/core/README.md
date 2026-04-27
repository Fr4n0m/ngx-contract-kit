# `@fr4n0m/contract-kit/core`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### ¿Qué es?

Núcleo del toolkit `contract-kit`. Define los tipos del schema de contrato, valida archivos JSON, parsea contratos y genera sumarios que el resto de paquetes usan como entrada.

### Instalación

```bash
npm install @fr4n0m/contract-kit
```

### El schema del contrato

Un contrato es un `Record<string, ContractEndpoint>` donde cada clave es el nombre del endpoint:

```ts
// ContractFile — lo que escribes en contracts/*.json
{
  "getUser": {
    "method": "GET",             // "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    "path": "/users/:id",
    "params": { "id": "string" },           // parámetros de ruta
    "query": { "active": "boolean" },       // query string
    "body": { "name": "string" },           // cuerpo de la request (POST/PUT/PATCH)
    "response": {
      "200": { "id": "string", "name": "string" },
      "404": { "message": "string" }
    }
  }
}
```

**Tipos escalares:** `"string"` | `"number"` | `"boolean"` | `"unknown"`

Los campos `params`, `query`, `body` y cada status de `response` son de tipo `ContractShape`: `Record<string, ContractScalarType>`.

### Uso rápido

```ts
import {
  readContract,
  validateContract,
  createSummary,
  scanContractFiles,
  readProjectConfig,
} from "@fr4n0m/contract-kit/core";

const contracts = scanContractFiles(process.cwd());
const summary = createSummary(contracts);
```

### API principal

| Función | Descripción |
|---------|-------------|
| `validateContract(contract, sourceName?)` | Valida JSON crudo contra el schema del contrato. Lanza error si el shape es inválido |
| `readContract(filePath)` | Lee y valida un archivo JSON de contrato. Devuelve `ContractFile` |
| `readProjectConfig(projectRoot)` | Lee `contract-kit.config.json`. Usa defaults si no existe |
| `scanContractFiles(projectRoot, contractsDir?)` | Encuentra todos los archivos `.json` de contrato en `contractsDir` |
| `createSummary(contractsByFile)` | Produce un `ContractSummary` plano de todos los contratos |
| `writeGeneratedArtifacts(outputDir, artifacts)` | Escribe archivos generados en `outputDir` |

### Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### What is it?

Core runtime for `contract-kit`. Defines contract schema types, validates JSON files, parses contracts, and generates summaries that other packages use as input.

### Install

```bash
npm install @fr4n0m/contract-kit
```

### The contract schema

A contract is a `Record<string, ContractEndpoint>` where each key is the endpoint name:

```ts
// ContractFile — what you write in contracts/*.json
{
  "getUser": {
    "method": "GET",             // "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    "path": "/users/:id",
    "params": { "id": "string" },           // path parameters
    "query": { "active": "boolean" },       // query string
    "body": { "name": "string" },           // request body (POST/PUT/PATCH)
    "response": {
      "200": { "id": "string", "name": "string" },
      "404": { "message": "string" }
    }
  }
}
```

**Scalar types:** `"string"` | `"number"` | `"boolean"` | `"unknown"`

The `params`, `query`, `body` fields and each status under `response` are of type `ContractShape`: `Record<string, ContractScalarType>`.

### Quick usage

```ts
import {
  readContract,
  validateContract,
  createSummary,
  scanContractFiles,
  readProjectConfig,
} from "@fr4n0m/contract-kit/core";

const contracts = scanContractFiles(process.cwd());
const summary = createSummary(contracts);
```

### Main API

| Function | Description |
|----------|-------------|
| `validateContract(contract, sourceName?)` | Validates raw JSON against the contract schema. Throws on invalid shape |
| `readContract(filePath)` | Reads and validates a contract JSON file. Returns `ContractFile` |
| `readProjectConfig(projectRoot)` | Reads `contract-kit.config.json`. Falls back to defaults |
| `scanContractFiles(projectRoot, contractsDir?)` | Finds all `.json` contract files in `contractsDir` |
| `createSummary(contractsByFile)` | Produces a flat `ContractSummary` from all contract files |
| `writeGeneratedArtifacts(outputDir, artifacts)` | Writes generated files to `outputDir` |

### Contributing

PRs are welcome and encouraged.

1. Create a branch from `master`.
2. Keep changes focused and readable.
3. Add/update tests when relevant.
4. Open a PR with technical context and validation steps.

---

## License

MIT

---

Portfolio Fr4n0m: https://codebyfran.es
