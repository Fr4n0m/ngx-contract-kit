# Roadmap (6 semanas)

## Seguimiento de cambios importantes

- 2026-04-20: Inicializacion del repositorio, estructura monorepo, CI base y documentacion fundacional.
- 2026-04-20: Regla de contribucion añadida para actualizar este roadmap en cada cambio importante.
- 2026-04-20: Landing/docs inicial creada en `apps/docs` con VitePress y scripts `docs:dev` / `docs:build`.

## Semana 0 - Descubrimiento y alcance (2-3 dias)

- Validar problema y propuesta de valor.
- Congelar alcance MVP y no-MVP.
- Elegir stack inicial del monorepo (pnpm + turbo + tsup).
- Definir reglas de versionado semantico y estrategia release.

## Semana 1 - Fundaciones tecnicas

- Crear monorepo y toolchain base.
- Configurar lint, format, test unitario y CI.
- Diseñar el schema de contrato v0.
- Escribir ADR de arquitectura y decisiones clave.

## Semana 2 - Generador core

- Implementar parser del contrato.
- Implementar generacion de tipos compartidos.
- Implementar generacion de cliente Angular tipado.
- Publicar primer `alpha.0` interno.

## Semana 3 - Backend y validacion

- Plugin NestJS (decorators y DTOs).
- Validacion runtime (Zod o class-validator, decision ADR).
- Flujo de errores y mensajes de DX.
- Ejemplo funcional Angular + Nest.

## Semana 4 - Calidad de desarrollo

- Generador de mocks para tests/e2e.
- Pruebas de snapshot de codigo generado.
- Documentacion de "quickstart" y "migracion".
- Publicar `alpha.1` en npm.

## Semana 5 - Breaking changes + release candidate

- Comparador de contratos (`check` command).
- Integracion CI para bloquear cambios incompatibles.
- Hardening de DX (mensajes, logs, help).
- Publicar `rc.0`.

## Semana 6 - Lanzamiento OSS

- Cerrar issues criticos.
- Documentacion final y ejemplos extra.
- Publicar `1.0.0`.
- Comunicar lanzamiento (README, changelog, post tecnico).

## Criterios de exito

- Tiempo de setup < 10 minutos.
- Primer contrato funcional < 15 minutos.
- Cobertura de tests del core >= 80%.
- 0 errores criticos abiertos en release 1.0.0.
