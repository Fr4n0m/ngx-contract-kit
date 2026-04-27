# `@fr4n0m/contract-kit/generator-ts`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### 🚀 ¿Qué es?

Generador de modelos TypeScript para `contract-kit`. Produce un archivo `contract-model.ts` con tipos namespaciados para todos los endpoints de tus contratos, evitando colisiones entre archivos.

### 📦 Instalación

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Uso rápido

```ts
import { generateTypeScriptModels } from "@fr4n0m/contract-kit/generator-ts";

const source = generateTypeScriptModels({ "users.json": usersContract });
// → genera tipos como users.getOne.Params, users.getOne.Response
```

El CLI escribe la salida en `generated/contract-model.ts`.

### 🧱 API principal

| Función | Descripción |
|---------|-------------|
| `generateTypeScriptModels(contractsByFile)` | Devuelve string TypeScript con tipos request/response por endpoint, namespaciados por archivo de contrato |

### 🤝 Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### 🚀 What is it?

TypeScript model generator for `contract-kit`. Produces a `contract-model.ts` file with namespaced types for all contract endpoints, preventing name collisions across files.

### 📦 Install

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Quick usage

```ts
import { generateTypeScriptModels } from "@fr4n0m/contract-kit/generator-ts";

const source = generateTypeScriptModels({ "users.json": usersContract });
// → generates types like users.getOne.Params, users.getOne.Response
```

The CLI writes the output to `generated/contract-model.ts`.

### 🧱 Main API

| Function | Description |
|----------|-------------|
| `generateTypeScriptModels(contractsByFile)` | Returns TypeScript source with request/response types per endpoint, namespaced by contract file |

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
