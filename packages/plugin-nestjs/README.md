# `@fr4n0m/contract-kit/nestjs`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-10%2B-E0234E?logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### 🚀 ¿Qué es?

Integración NestJS para `contract-kit`. Genera controllers tipados, stubs de handlers y tablas de rutas directamente desde tus contratos de API.

### 📦 Instalación

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Uso rápido

```ts
import {
  defineNestHandlers,
  createNestRouteTable,
} from "@fr4n0m/contract-kit/nestjs";

const handlers = defineNestHandlers(ContractModel, {
  "users.getOne": async ({ params }) => ({ 200: { id: params.id } }),
});
```

### 🧱 API principal

| Función | Descripción |
|---------|-------------|
| `defineNestHandlers(model, handlers)` | Registro de handlers con tipado seguro. Garantiza que todos los endpoints del contrato tienen handler |
| `createNestRouteTable(model)` | Devuelve array de `EndpointRoute` con `{ key, method, path }` para todos los endpoints |
| `createNestModelFromContracts(contractsByFile)` | Deriva un modelo compatible con NestJS desde archivos de contrato raw |
| `generateNestControllerSource(model)` | Emite string fuente `nest-controller.ts` con decorators HTTP y stubs de métodos |
| `generateNestHandlersStubSource(model)` | Emite string fuente `nest-handlers.stub.ts` con stubs tipados listos para implementar |

### 🤝 Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### 🚀 What is it?

NestJS integration for `contract-kit`. Generates typed controllers, handler stubs, and route tables directly from your API contracts.

### 📦 Install

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Quick usage

```ts
import {
  defineNestHandlers,
  createNestRouteTable,
} from "@fr4n0m/contract-kit/nestjs";

const handlers = defineNestHandlers(ContractModel, {
  "users.getOne": async ({ params }) => ({ 200: { id: params.id } }),
});
```

### 🧱 Main API

| Function | Description |
|----------|-------------|
| `defineNestHandlers(model, handlers)` | Type-safe handler registration. Ensures all contract endpoints have a handler |
| `createNestRouteTable(model)` | Returns array of `EndpointRoute` with `{ key, method, path }` for all endpoints |
| `createNestModelFromContracts(contractsByFile)` | Derives NestJS-compatible model from raw contract files |
| `generateNestControllerSource(model)` | Emits `nest-controller.ts` source with HTTP decorators and method stubs |
| `generateNestHandlersStubSource(model)` | Emits `nest-handlers.stub.ts` source with typed stubs ready to implement |

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
