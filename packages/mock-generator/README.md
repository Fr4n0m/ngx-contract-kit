# `@fr4n0m/contract-kit/mock`

Deterministic mock payload generator for contract-kit. Generates typed mock responses from `ContractShape` definitions.

## Install

```bash
npm install @fr4n0m/contract-kit
```

## Usage

```ts
import {
  generateMockFromShape,
  generateMocksFromContracts,
} from "@fr4n0m/contract-kit/mock";
```

## API

#### `generateMockFromShape(shape)`
Generates a mock object from a `ContractShape`. Scalar types map to deterministic values:
- `string` → `"string"`
- `number` → `0`
- `boolean` → `false`
- `unknown` → `null`

#### `generateMocksFromContracts(contractsByFile)`
Generates a full mock map for all endpoints across all contract files.

Returns `Record<string, EndpointMocks>` — keyed by `"file.endpointName"`, each with `responseByStatus`.

## Part of

[`@fr4n0m/contract-kit`](https://ngx-contract-kit-docs.vercel.app) — contract-driven API toolkit for Angular + NestJS.
