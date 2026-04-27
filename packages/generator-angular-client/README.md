# `@fr4n0m/contract-kit/generator-angular`

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### 🚀 ¿Qué es?

Generador de cliente Angular para `contract-kit`. Produce un archivo `angular-client.ts` tipado con métodos `HttpClient` para cada endpoint del contrato.

### 📦 Instalación

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Uso rápido

```ts
import { generateAngularClient } from "@fr4n0m/contract-kit/generator-angular";

const source = generateAngularClient({ "users.json": usersContract });
// → genera UsersService con getOne(params: users.getOne.Params): Observable<users.getOne.Response>
```

El CLI escribe la salida en `generated/angular-client.ts`.

### 🧱 API principal

| Función | Descripción |
|---------|-------------|
| `generateAngularClient(contractsByFile)` | Devuelve string TypeScript con un servicio Angular por archivo de contrato. Cada endpoint se convierte en un método tipado usando `HttpClient` |

### 🤝 Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### 🚀 What is it?

Angular client generator for `contract-kit`. Produces a typed `angular-client.ts` file with `HttpClient` methods for every contract endpoint.

### 📦 Install

```bash
npm install @fr4n0m/contract-kit
```

### ⚡ Quick usage

```ts
import { generateAngularClient } from "@fr4n0m/contract-kit/generator-angular";

const source = generateAngularClient({ "users.json": usersContract });
// → generates UsersService with getOne(params: users.getOne.Params): Observable<users.getOne.Response>
```

The CLI writes the output to `generated/angular-client.ts`.

### 🧱 Main API

| Function | Description |
|----------|-------------|
| `generateAngularClient(contractsByFile)` | Returns TypeScript source with an Angular service per contract file. Each endpoint becomes a typed `HttpClient` method |

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
