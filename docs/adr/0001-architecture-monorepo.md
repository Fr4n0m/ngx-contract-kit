# ADR 0001 - Monorepo para core + generadores + plugins

## Estado

Aceptado

## Contexto

El toolkit se compone de multiples paquetes con versiones relacionadas:

- core de contratos,
- CLI,
- generadores frontend,
- plugins backend,
- utilidades de validacion y diff.

Necesitamos coherencia entre cambios y releases sin friccion para contributors.

## Decision

Usar monorepo con `pnpm workspaces` + `turbo`.

## Consecuencias

- Pros:
  - cambios atomicos entre paquetes,
  - CI simplificada,
  - mejor DX para contribucion.
- Contras:
  - mayor complejidad de tooling inicial.

## Alternativas evaluadas

- Multirepo: rechazado por sobrecarga operativa en fases tempranas.
