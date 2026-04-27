# `@fr4n0m/contract-kit/diff`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### 🚀 ¿Qué es?

Detección de breaking changes para `contract-kit`. Compara dos snapshots `ContractSummary` y reporta endpoints añadidos, eliminados o modificados de forma incompatible.

### 📦 Instalación

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Uso rápido

```ts
import {
  compareContractSummaries,
  createContractDiffReport,
  formatContractDiffReport,
} from "@fr4n0m/contract-kit/diff";

const diff = compareContractSummaries(baseline, current);
const lines = formatContractDiffReport(diff);
console.log(lines.join("\n"));
```

### 🧱 API principal

| Función | Descripción |
|---------|-------------|
| `compareContractSummaries(baseline, current)` | Devuelve `ContractDiffResult` con todos los cambios breaking y no-breaking |
| `createContractDiffReport(diff)` | Convierte `ContractDiffResult` en un objeto `ContractDiffReport` estructurado |
| `formatContractDiffReport(diff)` | Devuelve array de strings legibles para salida CLI |

### 🔴 Códigos de issue

| Código | Significado |
|--------|-------------|
| `endpoint_removed` | Endpoint eliminado del contrato |
| `method_changed` | Método HTTP cambiado |
| `path_changed` | Path de URL cambiado |
| `status_removed` | Status code de respuesta eliminado |
| `request_field_added` | Campo requerido añadido a la request |
| `request_type_changed` | Tipo de campo de request cambiado |
| `response_field_removed` | Campo de response eliminado |
| `response_type_changed` | Tipo de campo de response cambiado |

### 🤝 Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### 🚀 What is it?

Breaking-change detection for `contract-kit`. Compares two `ContractSummary` snapshots and reports added, removed, or incompatibly modified endpoints.

### 📦 Install

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Quick usage

```ts
import {
  compareContractSummaries,
  createContractDiffReport,
  formatContractDiffReport,
} from "@fr4n0m/contract-kit/diff";

const diff = compareContractSummaries(baseline, current);
const lines = formatContractDiffReport(diff);
console.log(lines.join("\n"));
```

### 🧱 Main API

| Function | Description |
|----------|-------------|
| `compareContractSummaries(baseline, current)` | Returns `ContractDiffResult` with all breaking and non-breaking changes |
| `createContractDiffReport(diff)` | Converts `ContractDiffResult` into a structured `ContractDiffReport` object |
| `formatContractDiffReport(diff)` | Returns human-readable string array for CLI output |

### 🔴 Issue codes

| Code | Meaning |
|------|---------|
| `endpoint_removed` | Endpoint deleted from contract |
| `method_changed` | HTTP method changed |
| `path_changed` | URL path changed |
| `status_removed` | Response status code removed |
| `request_field_added` | Required request field added |
| `request_type_changed` | Request field type changed |
| `response_field_removed` | Response field removed |
| `response_type_changed` | Response field type changed |

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
