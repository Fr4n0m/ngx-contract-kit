# `@fr4n0m/contract-kit`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?logo=angular&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-10%2B-E0234E?logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-1.0.0-CB3837?logo=npm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### ¿Qué es?

CLI y librería para desarrollo de APIs basado en contratos entre **Angular** y **NestJS**. Define el contrato una vez y genera tipos TypeScript, cliente Angular, schemas Zod, controller NestJS y mocks automáticamente.

### Instalación

```bash
# CLI global
npm install -g @fr4n0m/contract-kit

# Como dependencia de proyecto
npm install @fr4n0m/contract-kit
```

### Comandos CLI

```bash
contract-kit init        # Crea contract-kit.config.json + contrato de ejemplo
contract-kit generate    # Genera tipos TS + cliente Angular + artefactos backend
contract-kit backend     # Genera solo artefactos backend (Zod, NestJS controller + handlers)
contract-kit mock        # Genera payloads mock para todos los endpoints
contract-kit validate    # Valida contratos sin generar artefactos
contract-kit check       # Detecta breaking changes vs baseline guardado
```

### Configuración

`contract-kit.config.json` en la raíz del proyecto:

```json
{
  "schemaVersion": 1,
  "contractsDir": "contracts",
  "outputDir": "generated"
}
```

| Campo | Default | Descripción |
|-------|---------|-------------|
| `schemaVersion` | `1` | Versión del schema de config (siempre `1`) |
| `contractsDir` | `"contracts"` | Carpeta donde están los archivos `.json` de contrato |
| `outputDir` | `"generated"` | Carpeta donde se escriben los artefactos generados |

### Artefactos generados

Después de `contract-kit generate`, encontrarás en `outputDir/`:

| Archivo | Descripción |
|---------|-------------|
| `contract-model.ts` | Tipos TypeScript namespaciados por endpoint |
| `angular-client.ts` | Servicio Angular con métodos tipados via `HttpClient` |
| `zod-schemas.ts` | Schemas Zod para validación runtime |
| `nest-controller.ts` | Controller NestJS con decorators HTTP |
| `nest-handlers.stub.ts` | Stubs de handlers tipados para implementar |
| `mocks.json` | Payloads mock deterministas por endpoint |
| `summary.json` | Snapshot del contrato para detección de breaking changes |

### Subpath exports (librería)

Importa solo lo que necesitas:

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

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### What is it?

CLI and library for contract-driven API development between **Angular** and **NestJS**. Define your contract once and automatically generate TypeScript types, Angular client, Zod schemas, NestJS controller, and mocks.

### Install

```bash
# Global CLI
npm install -g @fr4n0m/contract-kit

# As project dependency
npm install @fr4n0m/contract-kit
```

### CLI Commands

```bash
contract-kit init        # Create contract-kit.config.json + sample contract
contract-kit generate    # Generate TypeScript types + Angular client + backend artifacts
contract-kit backend     # Generate only backend artifacts (Zod, NestJS controller + handlers)
contract-kit mock        # Generate mock payloads for all endpoints
contract-kit validate    # Validate contracts without generating artifacts
contract-kit check       # Detect breaking changes vs saved baseline
```

### Configuration

`contract-kit.config.json` at the project root:

```json
{
  "schemaVersion": 1,
  "contractsDir": "contracts",
  "outputDir": "generated"
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `schemaVersion` | `1` | Config schema version (always `1`) |
| `contractsDir` | `"contracts"` | Folder containing your `.json` contract files |
| `outputDir` | `"generated"` | Folder where generated artifacts are written |

### Generated artifacts

After `contract-kit generate`, you'll find in `outputDir/`:

| File | Description |
|------|-------------|
| `contract-model.ts` | Namespaced TypeScript types per endpoint |
| `angular-client.ts` | Angular service with typed `HttpClient` methods |
| `zod-schemas.ts` | Zod schemas for runtime validation |
| `nest-controller.ts` | NestJS controller with HTTP decorators |
| `nest-handlers.stub.ts` | Typed handler stubs ready to implement |
| `mocks.json` | Deterministic mock payloads per endpoint |
| `summary.json` | Contract snapshot for breaking-change detection |

### Subpath exports (library)

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
