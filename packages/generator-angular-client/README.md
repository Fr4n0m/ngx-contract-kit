# `@fr4n0m/contract-kit/generator-angular`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### ¿Qué es?

Generador de cliente Angular para `contract-kit`. Produce un archivo `angular-client.ts` con un servicio `ContractKitClient` que expone un método tipado por cada endpoint del contrato, usando `HttpClient` internamente.

### Instalación

```bash
npm install @fr4n0m/contract-kit
```

### Uso rápido

```ts
import { generateAngularClient } from "@fr4n0m/contract-kit/generator-angular";

const source = generateAngularClient({ "users.json": usersContract });
// → genera UsersService con users_getUser(input): Observable<UsersGetUserResponse>
```

El CLI escribe la salida en `generated/angular-client.ts`.

### Qué genera

Para un endpoint `getUser` en `users.contract.json`:

```ts
// generated/angular-client.ts (fragmento)
export type UsersGetUserRequest  = ContractModel["users.getUser"]["params"];
export type UsersGetUserResponse = ContractModel["users.getUser"]["response"]["200"];

@Injectable({ providedIn: 'root' })
export class ContractKitClient {
  constructor(private http: HttpClient) {}

  users_getUser(input: UsersGetUserRequest): Observable<UsersGetUserResponse> {
    return this.request<UsersGetUserResponse>("GET", "/users/:id", input);
  }
}
```

Los métodos usan `ContractModel` como única fuente de verdad — si el contrato cambia, el tipo del método cambia automáticamente en el siguiente `generate`.

### API principal

| Función | Descripción |
|---------|-------------|
| `generateAngularClient(contractsByFile)` | Devuelve string TypeScript con un `ContractKitClient` unificado. Cada endpoint se convierte en un método tipado usando `HttpClient` |

### Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### What is it?

Angular client generator for `contract-kit`. Produces an `angular-client.ts` file with a `ContractKitClient` service that exposes a typed method for each contract endpoint, backed by `HttpClient`.

### Install

```bash
npm install @fr4n0m/contract-kit
```

### Quick usage

```ts
import { generateAngularClient } from "@fr4n0m/contract-kit/generator-angular";

const source = generateAngularClient({ "users.json": usersContract });
// → generates ContractKitClient with users_getUser(input): Observable<UsersGetUserResponse>
```

The CLI writes the output to `generated/angular-client.ts`.

### What it generates

For a `getUser` endpoint in `users.contract.json`:

```ts
// generated/angular-client.ts (excerpt)
export type UsersGetUserRequest  = ContractModel["users.getUser"]["params"];
export type UsersGetUserResponse = ContractModel["users.getUser"]["response"]["200"];

@Injectable({ providedIn: 'root' })
export class ContractKitClient {
  constructor(private http: HttpClient) {}

  users_getUser(input: UsersGetUserRequest): Observable<UsersGetUserResponse> {
    return this.request<UsersGetUserResponse>("GET", "/users/:id", input);
  }
}
```

Methods reference `ContractModel` as the single source of truth — if the contract changes, the method type changes automatically on the next `generate`.

### Main API

| Function | Description |
|----------|-------------|
| `generateAngularClient(contractsByFile)` | Returns TypeScript source with a unified `ContractKitClient`. Each endpoint becomes a typed `HttpClient` method |

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
