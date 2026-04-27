# `@fr4n0m/contract-kit/mock`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### 🚀 ¿Qué es?

Generador de payloads mock deterministas para `contract-kit`. Genera respuestas mock tipadas a partir de definiciones `ContractShape` — ideal para tests y desarrollo frontend sin backend real.

### 📦 Instalación

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Uso rápido

```ts
import {
  generateMockFromShape,
  generateMocksFromContracts,
} from "@fr4n0m/contract-kit/mock";

const mock = generateMockFromShape({ name: "string", age: "number" });
// → { name: "string", age: 0 }
```

### 🧱 API principal

| Función | Descripción |
|---------|-------------|
| `generateMockFromShape(shape)` | Genera un objeto mock desde un `ContractShape`. Valores deterministas por tipo escalar |
| `generateMocksFromContracts(contractsByFile)` | Genera mocks completos para todos los endpoints. Devuelve `Record<string, EndpointMocks>` con `responseByStatus` |

### 🔢 Mapeo de tipos escalares

| Tipo | Valor mock |
|------|------------|
| `string` | `"string"` |
| `number` | `0` |
| `boolean` | `false` |
| `unknown` | `null` |

### 🤝 Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### 🚀 What is it?

Deterministic mock payload generator for `contract-kit`. Generates typed mock responses from `ContractShape` definitions — ideal for tests and frontend development without a real backend.

### 📦 Install

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Quick usage

```ts
import {
  generateMockFromShape,
  generateMocksFromContracts,
} from "@fr4n0m/contract-kit/mock";

const mock = generateMockFromShape({ name: "string", age: "number" });
// → { name: "string", age: 0 }
```

### 🧱 Main API

| Function | Description |
|----------|-------------|
| `generateMockFromShape(shape)` | Generates a mock object from a `ContractShape`. Deterministic values per scalar type |
| `generateMocksFromContracts(contractsByFile)` | Generates full mocks for all endpoints. Returns `Record<string, EndpointMocks>` with `responseByStatus` |

### 🔢 Scalar type mapping

| Type | Mock value |
|------|------------|
| `string` | `"string"` |
| `number` | `0` |
| `boolean` | `false` |
| `unknown` | `null` |

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
