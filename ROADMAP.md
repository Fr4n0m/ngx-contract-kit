# Roadmap (6 semanas)

## Seguimiento de cambios importantes

- 2026-04-20: Inicializacion del repositorio, estructura monorepo, CI base y documentacion fundacional.
- 2026-04-20: Regla de contribucion añadida para actualizar este roadmap en cada cambio importante.
- 2026-04-20: Landing/docs inicial creada en `apps/docs` con VitePress y scripts `docs:dev` / `docs:build`.
- 2026-04-20: Estilos de la landing migrados a Tailwind CSS con tema visual custom para VitePress.
- 2026-04-20: Landing mejorada con seccion de demo end-to-end, CTAs de producto y navegacion de docs ampliada.
- 2026-04-20: Workflow CI de GitHub eliminado por decision del proyecto (sin Actions por ahora).
- 2026-04-20: MVP tecnico inicial implementado en `packages/core` y `packages/cli` (`init`, `generate`, `check`) con contratos JSON.
- 2026-04-20: `core` y `cli` migrados a TypeScript estricto; tests unitarios iniciales añadidos en `packages/core`.
- 2026-04-20: Fix de docs/VitePress para ESM (`apps/docs/package.json` con `type: module`) para poder iniciar la landing en local.
- 2026-04-20: Rediseño mayor de la landing/docs: nueva home orientada a producto, página de arquitectura, sidebar/footer y build limpio sin warnings de Tailwind.
- 2026-04-20: Tipografía de landing migrada a fuentes locales (`Ubuntu Sans Mono` para títulos y `Ubuntu Mono` para cuerpo).
- 2026-04-20: Revisión de paleta y contraste en modo oscuro para docs/landing (mejor legibilidad en contenido y navegación).
- 2026-04-20: Layout de docs refinado: sidebar izquierda eliminada y hero ajustado para evitar cortes/overflow en resoluciones medias y móviles.
- 2026-04-20: Landing convertida a single-page i18n (`en/es`) con todos los textos en JSON y render dinámico por selector de idioma.
- 2026-04-20: Footer rediseñado como componente dedicado y profesional (`AppFooter.vue`) con contenido i18n desde JSON.
- 2026-04-20: Paleta dark mode ajustada de azul a verde carbón para coherencia visual (hero, cards, selector de idioma y footer).
- 2026-04-20: Paleta refinada tomando referencia cromática de `landonorris.com` (oliva oscuro + marfil + acento lima).
- 2026-04-20: Sistema de iconos migrado a `@tabler/icons-vue` para componentes de docs (footer y enlaces externos).
- 2026-04-20: Validación del schema en `core` reforzada con chequeo de status HTTP en `response` y tests adicionales de errores de shape.
- 2026-04-20: `generate` ahora produce `generated/contract-model.ts` con tipos por endpoint (params/query/body/response) a partir del contrato.
- 2026-04-20: Configuración de despliegue preparada para Vercel (`vercel.json`) apuntando a la landing de VitePress.
- 2026-04-20: README rehacido en formato profesional bilingüe (ES/EN), badges, navegación rápida, secciones con iconos y guía de contribución.

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
