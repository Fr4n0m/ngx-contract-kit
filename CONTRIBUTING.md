# Contribuir a ngx-contract-kit

## Flujo de trabajo

1. Crear rama desde `main`.
2. Implementar cambio con tests.
3. Ejecutar `pnpm lint && pnpm test && pnpm build`.
4. Abrir PR con contexto claro.

## Convenciones

- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.).
- TypeScript estricto en todos los paquetes.
- Evitar breaking changes sin documentar migracion.

## Criterio de aceptacion en PR

- Tests pasando.
- Sin regressions en ejemplos.
- Documentacion actualizada si cambia DX.
