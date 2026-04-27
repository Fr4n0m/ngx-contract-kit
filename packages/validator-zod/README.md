# `@fr4n0m/contract-kit/zod`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.x-3E67B1?logo=zod&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### 🚀 ¿Qué es?

Validación runtime para `contract-kit` usando [Zod](https://zod.dev). Genera schemas Zod a partir de shapes de contrato y emite un archivo fuente listo para usar en producción.

### 📦 Instalación

```bash
npm install @fr4n0m/contract-kit zod
```

### ⚡ Uso rápido

```ts
import {
  createZodSchemaFromShape,
  generateZodSchemasSource,
} from "@fr4n0m/contract-kit/zod";

const schema = createZodSchemaFromShape({ name: "string", age: "number" });
schema.parse({ name: "Ana", age: 30 }); // ✅ OK
schema.parse({ name: 123 });            // ❌ Lanza ZodError
```

### 🧱 API principal

| Función | Descripción |
|---------|-------------|
| `createZodSchemaFromShape(shape)` | Devuelve `z.ZodObject` construido desde `ContractShape`. Uso runtime para validar requests/responses |
| `generateZodSchemasSource(contractsByFile)` | Genera string TypeScript (`zod-schemas.ts`) con schemas Zod para todos los endpoints — params, query, body y todos los status codes de respuesta |

### 🤝 Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### 🚀 What is it?

Runtime validation for `contract-kit` using [Zod](https://zod.dev). Generates Zod schemas from contract shapes and emits a ready-to-use TypeScript source file.

### 📦 Install

```bash
npm install @fr4n0m/contract-kit zod
```

### ⚡ Quick usage

```ts
import {
  createZodSchemaFromShape,
  generateZodSchemasSource,
} from "@fr4n0m/contract-kit/zod";

const schema = createZodSchemaFromShape({ name: "string", age: "number" });
schema.parse({ name: "Ana", age: 30 }); // ✅ OK
schema.parse({ name: 123 });            // ❌ Throws ZodError
```

### 🧱 Main API

| Function | Description |
|----------|-------------|
| `createZodSchemaFromShape(shape)` | Returns `z.ZodObject` built from `ContractShape`. Use at runtime for request/response validation |
| `generateZodSchemasSource(contractsByFile)` | Generates a TypeScript source string (`zod-schemas.ts`) with Zod schemas for all endpoints — params, query, body, and all response status codes |

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
