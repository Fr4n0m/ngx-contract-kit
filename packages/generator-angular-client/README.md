# `@fr4n0m/contract-kit/generator-angular`

Angular client generator for contract-kit. Generates a typed `angular-client.ts` with methods for every contract endpoint.

## Install

```bash
npm install @fr4n0m/contract-kit
```

## Usage

```ts
import { generateAngularClient } from "@fr4n0m/contract-kit/generator-angular";
```

## API

#### `generateAngularClient(contractsByFile)`
Returns a TypeScript source string with an Angular service class. Each endpoint becomes a typed method using `HttpClient`, with namespaced request/response types.

```ts
const source = generateAngularClient({ "users.json": usersContract });
// → generates UsersService with getOne(params: users.getOne.Params): Observable<users.getOne.Response>
```

The output is written to `generated/angular-client.ts` by the CLI.

## Part of

[`@fr4n0m/contract-kit`](https://ngx-contract-kit-docs.vercel.app) — contract-driven API toolkit for Angular + NestJS.
