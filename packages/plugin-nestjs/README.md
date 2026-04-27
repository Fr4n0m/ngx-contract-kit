# `@fr4n0m/contract-kit/nestjs`

NestJS integration for contract-kit. Generates typed controllers, handler stubs, and route tables from your contracts.

## Install

```bash
npm install @fr4n0m/contract-kit
```

## Usage

```ts
import {
  defineNestHandlers,
  createNestRouteTable,
  createNestModelFromContracts,
  generateNestControllerSource,
  generateNestHandlersStubSource,
} from "@fr4n0m/contract-kit/nestjs";
```

## API

#### `defineNestHandlers(model, handlers)`
Type-safe handler registration. Ensures all contract endpoints have a corresponding handler implementation.

```ts
const handlers = defineNestHandlers(ContractModel, {
  "users.getOne": async ({ params }) => ({ 200: { id: params.id } }),
});
```

#### `createNestRouteTable(model)`
Returns an array of `EndpointRoute` objects (`{ key, method, path }`) for all endpoints in the model.

#### `createNestModelFromContracts(contractsByFile)`
Derives a NestJS-compatible model from raw contract files.

#### `generateNestControllerSource(model)`
Emits a `nest-controller.ts` source string with HTTP decorators and method stubs.

#### `generateNestHandlersStubSource(model)`
Emits a `nest-handlers.stub.ts` source string with typed handler stubs ready to implement.

## Part of

[`@fr4n0m/contract-kit`](https://ngx-contract-kit-docs.vercel.app) — contract-driven API toolkit for Angular + NestJS.
