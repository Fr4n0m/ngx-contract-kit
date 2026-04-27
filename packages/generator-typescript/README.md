# `@fr4n0m/contract-kit/generator-ts`

TypeScript model generator for contract-kit. Generates a `contract-model.ts` file with namespaced types for all contract endpoints.

## Install

```bash
npm install @fr4n0m/contract-kit
```

## Usage

```ts
import { generateTypeScriptModels } from "@fr4n0m/contract-kit/generator-ts";
```

## API

#### `generateTypeScriptModels(contractsByFile)`
Returns a TypeScript source string with request/response types for every endpoint, namespaced by contract file to avoid collisions.

```ts
const source = generateTypeScriptModels({ "users.json": usersContract });
// → generates types like users.getOne.Params, users.getOne.Response
```

The output is written to `generated/contract-model.ts` by the CLI.

## Part of

[`@fr4n0m/contract-kit`](https://ngx-contract-kit-docs.vercel.app) — contract-driven API toolkit for Angular + NestJS.
