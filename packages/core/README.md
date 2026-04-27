# `@fr4n0m/contract-kit/core`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### 🚀 ¿Qué es?

Núcleo del toolkit `contract-kit`. Contiene los tipos de esquema, validación, parsing de contratos, generación de sumarios y utilidades de generación de código.

### 📦 Instalación

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Uso rápido

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

### 🧱 API principal

| Función | Descripción |
|---------|-------------|
| `validateContract(contract, sourceName?)` | Valida JSON crudo contra el schema del contrato. Lanza error si el shape es inválido |
| `readContract(filePath)` | Lee y valida un archivo JSON de contrato. Devuelve `ContractFile` |
| `readProjectConfig(projectRoot)` | Lee `contract-kit.config.json`. Usa defaults si no existe |
| `scanContractFiles(projectRoot, contractsDir?)` | Encuentra todos los archivos `.json` de contrato en `contractsDir` |
| `createSummary(contractsByFile)` | Produce un `ContractSummary` plano de todos los contratos |
| `writeGeneratedArtifacts(outputDir, artifacts)` | Escribe archivos generados en `outputDir` |

### 🤝 Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### 🚀 What is it?

Core runtime for `contract-kit`. Contains schema types, validation, contract parsing, summary generation, and code generation utilities.

### 📦 Install

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Quick usage

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

### 🧱 Main API

| Function | Description |
|----------|-------------|
| `validateContract(contract, sourceName?)` | Validates raw JSON against the contract schema. Throws on invalid shape |
| `readContract(filePath)` | Reads and validates a contract JSON file. Returns `ContractFile` |
| `readProjectConfig(projectRoot)` | Reads `contract-kit.config.json`. Falls back to defaults |
| `scanContractFiles(projectRoot, contractsDir?)` | Finds all `.json` contract files in `contractsDir` |
| `createSummary(contractsByFile)` | Produces a flat `ContractSummary` from all contract files |
| `writeGeneratedArtifacts(outputDir, artifacts)` | Writes generated files to `outputDir` |

### 🤝 Contributing

PRs are welcome and encouraged.

1. Create a branch from `master`.
2. Keep changes focused and readable.
3. Add/update tests when relevant.
4. Open a PR with technical context and validation steps.

---

## 📄 License

MIT

---

Portfolio Fr4n0m: https://codebyfran.es
