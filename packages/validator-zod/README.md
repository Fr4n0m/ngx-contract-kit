# `@fr4n0m/contract-kit/zod`

Runtime validation for contract-kit using [Zod](https://zod.dev). Generates Zod schemas from contract shapes and emits a ready-to-use source file.

## Install

```bash
npm install @fr4n0m/contract-kit zod
```

## Usage

```ts
import {
  createZodSchemaFromShape,
  generateZodSchemasSource,
} from "@fr4n0m/contract-kit/zod";
```

## API

#### `createZodSchemaFromShape(shape)`
Returns a `z.ZodObject` built from a `ContractShape`. Use at runtime for request/response validation.

```ts
const schema = createZodSchemaFromShape({ name: "string", age: "number" });
schema.parse({ name: "Ana", age: 30 }); // OK
```

#### `generateZodSchemasSource(contractsByFile)`
Generates a TypeScript source string (`zod-schemas.ts`) with Zod schemas for all endpoints — params, query, body, and all response status codes.

## Part of

[`@fr4n0m/contract-kit`](https://ngx-contract-kit-docs.vercel.app) — contract-driven API toolkit for Angular + NestJS.
