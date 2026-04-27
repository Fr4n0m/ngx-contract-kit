# contract-kit

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?logo=angular&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-10%2B-E0234E?logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### ¿Qué es contract-kit?

`contract-kit` es un toolkit CLI + librería para equipos **Angular + NestJS** que elimina la brecha entre frontend y backend. Defines tu API una vez en un archivo JSON tipado y el toolkit genera automáticamente todos los artefactos necesarios: tipos TypeScript compartidos, cliente Angular con `HttpClient`, schemas de validación Zod, controller NestJS y payloads mock para tests.

Sin desincronización. Sin código duplicado. Sin contratos rotos en producción.

### El contrato

Un contrato es un archivo JSON que describe los endpoints de tu API. Cada clave es el nombre del endpoint:

```json
{
  "getUser": {
    "method": "GET",
    "path": "/users/:id",
    "params": { "id": "string" },
    "query": { "includePosts": "boolean" },
    "response": {
      "200": { "id": "string", "name": "string", "email": "string" },
      "404": { "message": "string" }
    }
  },
  "createUser": {
    "method": "POST",
    "path": "/users",
    "body": { "name": "string", "email": "string" },
    "response": {
      "201": { "id": "string", "name": "string" },
      "400": { "message": "string" }
    }
  }
}
```

**Tipos escalares disponibles:** `string` | `number` | `boolean` | `unknown`

### Qué se genera

Con un solo `contract-kit generate`, el toolkit produce en tu carpeta `generated/`:

| Archivo | Contenido |
|---------|-----------|
| `contract-model.ts` | Tipos TypeScript namespaciados por endpoint (`users.getUser.Params`, `users.getUser.Response`) |
| `angular-client.ts` | Servicio Angular con métodos tipados usando `HttpClient` (`users_getUser(input): Observable<...>`) |
| `zod-schemas.ts` | Schemas Zod para validar params, query, body y respuestas en runtime |
| `nest-controller.ts` | Controller NestJS con decorators HTTP generados desde el contrato |
| `nest-handlers.stub.ts` | Stubs tipados de handlers listos para implementar |
| `mocks.json` | Payloads mock deterministas para cada endpoint, útiles en tests |
| `summary.json` | Snapshot del contrato usado como baseline para detección de breaking changes |

### Flujo de trabajo

```
1. contract-kit init          → Crea contract-kit.config.json + contrato de ejemplo
2. Edita contracts/*.json     → Define tus endpoints
3. contract-kit generate      → Genera todos los artefactos
4. contract-kit check         → Detecta breaking changes vs el baseline guardado
```

### Instalación y uso rápido

```bash
npm install -g @fr4n0m/contract-kit

contract-kit init
contract-kit generate
```

### Comandos CLI

```bash
contract-kit init        # Inicializa el proyecto con config + contrato de ejemplo
contract-kit generate    # Genera todos los artefactos (tipos, cliente, Zod, NestJS, mocks)
contract-kit backend     # Solo artefactos backend (Zod, NestJS controller + handlers)
contract-kit mock        # Solo payloads mock para todos los endpoints
contract-kit validate    # Valida los contratos sin generar nada
contract-kit check       # Compara contratos actuales vs baseline — reporta breaking changes
```

### Paquetes

| Paquete | Import | Propósito |
|---------|--------|-----------|
| `contract-kit` | CLI | Orquesta todos los comandos |
| `/core` | `@fr4n0m/contract-kit/core` | Parse, validación y tipos del contrato |
| `/generator-ts` | `@fr4n0m/contract-kit/generator-ts` | Genera `contract-model.ts` con tipos TypeScript |
| `/generator-angular` | `@fr4n0m/contract-kit/generator-angular` | Genera `angular-client.ts` con servicio HttpClient |
| `/validator-zod` | `@fr4n0m/contract-kit/zod` | Genera `zod-schemas.ts` para validación runtime |
| `/plugin-nestjs` | `@fr4n0m/contract-kit/nestjs` | Genera controller y handler stubs para NestJS |
| `/mock-generator` | `@fr4n0m/contract-kit/mock` | Genera `mocks.json` con payloads deterministas |
| `/contract-diff` | `@fr4n0m/contract-kit/diff` | Detecta breaking changes entre snapshots |

### Uso como librería

Importa solo los módulos que necesitas:

```ts
import { readContract, createSummary }       from "@fr4n0m/contract-kit/core";
import { compareContractSummaries }           from "@fr4n0m/contract-kit/diff";
import { generateMocksFromContracts }         from "@fr4n0m/contract-kit/mock";
import { createZodSchemaFromShape }           from "@fr4n0m/contract-kit/zod";
import { defineNestHandlers }                 from "@fr4n0m/contract-kit/nestjs";
import { generateTypeScriptModels }           from "@fr4n0m/contract-kit/generator-ts";
import { generateAngularClient }              from "@fr4n0m/contract-kit/generator-angular";
```

### Documentación

[ngx-contract-kit-docs.vercel.app](https://ngx-contract-kit-docs.vercel.app)

### Contribuciones

PRs y propuestas son bienvenidas. Abre un issue primero para cambios grandes.

---

## English

### What is contract-kit?

`contract-kit` is a CLI + library toolkit for **Angular + NestJS** teams that eliminates the gap between frontend and backend. You define your API once in a typed JSON file, and the toolkit automatically generates everything: shared TypeScript types, an Angular `HttpClient` service, Zod validation schemas, a NestJS controller, and mock payloads for tests.

No drift. No duplicated code. No broken contracts in production.

### The contract

A contract is a JSON file describing your API endpoints. Each key is the endpoint name:

```json
{
  "getUser": {
    "method": "GET",
    "path": "/users/:id",
    "params": { "id": "string" },
    "query": { "includePosts": "boolean" },
    "response": {
      "200": { "id": "string", "name": "string", "email": "string" },
      "404": { "message": "string" }
    }
  },
  "createUser": {
    "method": "POST",
    "path": "/users",
    "body": { "name": "string", "email": "string" },
    "response": {
      "201": { "id": "string", "name": "string" },
      "400": { "message": "string" }
    }
  }
}
```

**Available scalar types:** `string` | `number` | `boolean` | `unknown`

### What gets generated

A single `contract-kit generate` produces the following in your `generated/` folder:

| File | Contents |
|------|----------|
| `contract-model.ts` | Namespaced TypeScript types per endpoint (`users.getUser.Params`, `users.getUser.Response`) |
| `angular-client.ts` | Angular service with typed `HttpClient` methods (`users_getUser(input): Observable<...>`) |
| `zod-schemas.ts` | Zod schemas for runtime validation of params, query, body, and responses |
| `nest-controller.ts` | NestJS controller with HTTP decorators generated from the contract |
| `nest-handlers.stub.ts` | Typed handler stubs ready to implement |
| `mocks.json` | Deterministic mock payloads for every endpoint, useful in tests |
| `summary.json` | Contract snapshot used as baseline for breaking-change detection |

### Workflow

```
1. contract-kit init          → Creates contract-kit.config.json + sample contract
2. Edit contracts/*.json      → Define your endpoints
3. contract-kit generate      → Generate all artifacts
4. contract-kit check         → Detect breaking changes vs saved baseline
```

### Install and quick start

```bash
npm install -g @fr4n0m/contract-kit

contract-kit init
contract-kit generate
```

### CLI commands

```bash
contract-kit init        # Initialize project with config + sample contract
contract-kit generate    # Generate all artifacts (types, client, Zod, NestJS, mocks)
contract-kit backend     # Only backend artifacts (Zod, NestJS controller + handlers)
contract-kit mock        # Only mock payloads for all endpoints
contract-kit validate    # Validate contracts without generating anything
contract-kit check       # Compare current contracts vs baseline — reports breaking changes
```

### Packages

| Package | Import | Purpose |
|---------|--------|---------|
| `contract-kit` | CLI | Orchestrates all commands |
| `/core` | `@fr4n0m/contract-kit/core` | Contract parsing, validation, and types |
| `/generator-ts` | `@fr4n0m/contract-kit/generator-ts` | Generates `contract-model.ts` with TypeScript types |
| `/generator-angular` | `@fr4n0m/contract-kit/generator-angular` | Generates `angular-client.ts` with HttpClient service |
| `/validator-zod` | `@fr4n0m/contract-kit/zod` | Generates `zod-schemas.ts` for runtime validation |
| `/plugin-nestjs` | `@fr4n0m/contract-kit/nestjs` | Generates NestJS controller and handler stubs |
| `/mock-generator` | `@fr4n0m/contract-kit/mock` | Generates `mocks.json` with deterministic payloads |
| `/contract-diff` | `@fr4n0m/contract-kit/diff` | Detects breaking changes between snapshots |

### Library usage

Import only what you need:

```ts
import { readContract, createSummary }       from "@fr4n0m/contract-kit/core";
import { compareContractSummaries }           from "@fr4n0m/contract-kit/diff";
import { generateMocksFromContracts }         from "@fr4n0m/contract-kit/mock";
import { createZodSchemaFromShape }           from "@fr4n0m/contract-kit/zod";
import { defineNestHandlers }                 from "@fr4n0m/contract-kit/nestjs";
import { generateTypeScriptModels }           from "@fr4n0m/contract-kit/generator-ts";
import { generateAngularClient }              from "@fr4n0m/contract-kit/generator-angular";
```

### Documentation

[ngx-contract-kit-docs.vercel.app](https://ngx-contract-kit-docs.vercel.app)

### Contributing

PRs and proposals are welcome. Open an issue first for large changes.

---

## License

MIT

---

Portfolio Fr4n0m: https://codebyfran.es
