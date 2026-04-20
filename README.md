# ngx-contract-kit

Toolkit open source para Angular + backend que define el contrato API una sola vez y genera:

- tipos TypeScript compartidos,
- cliente Angular tipado,
- validaciones runtime,
- mocks para tests/e2e,
- chequeo de breaking changes en CI.

## Estado

Proyecto en fase de planificacion (pre-MVP).

## Objetivo del MVP (4 semanas)

1. Definir formato de contrato (`.contract.ts`).
2. CLI inicial: `init`, `generate`.
3. Generacion de tipos compartidos + cliente Angular.
4. Plugin backend para NestJS.
5. Validacion runtime y mocks basicos.
6. Pipeline CI con pruebas y release alpha.

## Estructura del repositorio

Ver [REPOSITORY_PLAN.md](./REPOSITORY_PLAN.md) y [ROADMAP.md](./ROADMAP.md).

## Comandos previstos (fase inicial)

```bash
pnpm install
pnpm ckit:init
pnpm ckit:generate
pnpm ckit:check
pnpm docs:dev
pnpm docs:build
pnpm lint
pnpm test
pnpm build
pnpm changeset
```

## Licencia

MIT
