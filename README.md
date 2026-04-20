# ngx-contract-kit

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-Client-DD0031?logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![VitePress](https://img.shields.io/badge/VitePress-Docs-646CFF?logo=vite&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Quick Nav:** [Español](#español) | [English](#english)

---

## Español

### 🚀 ¿Qué es?
`ngx-contract-kit` es un toolkit open source para equipos **Angular + backend** que permite definir un contrato API una sola vez y reutilizarlo para:

- tipos compartidos,
- generación de artefactos,
- validación del contrato,
- detección de cambios incompatibles.

### ✨ Estado actual

- Monorepo funcional con `pnpm`.
- CLI MVP: `init`, `generate`, `check`.
- Core en TypeScript estricto con tests.
- Landing i18n (ES/EN) con VitePress.

### 🧱 Stack principal

- `TypeScript`
- `Node.js`
- `pnpm workspaces`
- `Turbo`
- `Vitest`
- `VitePress`

### ⚡ Comandos rápidos

```bash
pnpm install
pnpm ckit:init
pnpm ckit:generate
pnpm ckit:check
pnpm docs:dev
pnpm docs:build
pnpm test
pnpm build
```

### 🗺️ Documentación del proyecto

- [ROADMAP.md](./ROADMAP.md)
- [REPOSITORY_PLAN.md](./REPOSITORY_PLAN.md)
- [BACKLOG.md](./BACKLOG.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)

### 🌍 Deploy de la landing (Vercel)

Ya está preparado con `vercel.json`:

- Build command: `pnpm docs:build`
- Output directory: `apps/docs/.vitepress/dist`

### 🤝 Contribuciones

¿Quieres aportar? PRs y propuestas son bienvenidas.

1. Crea una rama desde `main/master`.
2. Haz cambios pequeños y claros.
3. Añade/actualiza tests cuando aplique.
4. Abre un PR con contexto técnico y pasos de validación.

---

## English

### 🚀 What is it?
`ngx-contract-kit` is an open source toolkit for **Angular + backend** teams.  
Define your API contract once, then reuse it for:

- shared types,
- generated artifacts,
- contract validation,
- breaking-change detection.

### ✨ Current status

- Working monorepo with `pnpm`.
- MVP CLI: `init`, `generate`, `check`.
- Strict TypeScript core with tests.
- i18n landing (EN/ES) using VitePress.

### 🧱 Main stack

- `TypeScript`
- `Node.js`
- `pnpm workspaces`
- `Turbo`
- `Vitest`
- `VitePress`

### ⚡ Quick commands

```bash
pnpm install
pnpm ckit:init
pnpm ckit:generate
pnpm ckit:check
pnpm docs:dev
pnpm docs:build
pnpm test
pnpm build
```

### 🗺️ Project docs

- [ROADMAP.md](./ROADMAP.md)
- [REPOSITORY_PLAN.md](./REPOSITORY_PLAN.md)
- [BACKLOG.md](./BACKLOG.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)

### 🌍 Landing deployment (Vercel)

Deployment is already configured via `vercel.json`:

- Build command: `pnpm docs:build`
- Output directory: `apps/docs/.vitepress/dist`

### 🤝 Contributing

PRs are welcome and encouraged.

1. Create a branch from `main/master`.
2. Keep changes focused and readable.
3. Add/update tests when relevant.
4. Open a PR with technical context and validation steps.

---

## 📄 License

MIT

---

Portfolio Fr4n0m: https://codebyfran.es
