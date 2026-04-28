# Roadmap (6 semanas)

- 2026-04-27: CSS (`custom.css`) refactorizado: 461 líneas divididas en 7 archivos con responsabilidad única (`fonts.css`, `vars.css`, `nav.css`, `docs.css`, `components.css`, `demo.css`, `animations.css`); `custom.css` queda como índice de 12 líneas con `@import`.
- 2026-04-27: Fix UI (`QuickstartGuide`): `h2` dentro de cards bordeadas ahora sobreescribe estilos VitePress (`margin-top: 48px + padding-top + border-top`) que causaban espacio vacío en la parte superior de las cards "Before you start" y "Next steps".
- 2026-04-27: Iconos Copy añadidos a todos los botones copy de la web: `DemoFlowPanel`, `TerminalCodeBlock` y `TerminalCommandList` ahora muestran icono SVG clipboard que cambia a checkmark al copiar.
- 2026-04-27: Demo section (`LandingDemoSection`) componentizada: 470 líneas divididas en `LandingDemoSection.vue` (~100 líneas, layout + cards) y `DemoFlowPanel.vue` (panel interactivo con tabs, progress y código). Fix bug `flowTabs` → `outputTabs`. Cards de info ahora tienen animaciones reveal (`cardLeftRef`/`cardRightRef`).
- 2026-04-27: Fix colores light mode en panel de simulación: root cause era `--vp-c-bg-alt: #1f1f1f` en light mode (invertido en este tema), que hacía aparecer cajas oscuras alrededor del texto del panel. Fix: reemplazados todos los `bg-[color:var(--vp-c-*)]` internos del panel por `bg-gray-50`/`bg-white` con `dark:` explícito.
- 2026-04-27: READMEs del monorepo reescritos con foco en producto: root README ahora explica formato del contrato JSON, tabla de artefactos generados, workflow completo y tabla de paquetes; eliminadas secciones internas (Vercel deploy, estado de monorepo, links a BACKLOG/REPOSITORY_PLAN). Paquetes `cli`, `core`, `generator-ts` y `generator-angular` mejorados con ejemplos de output generado y tabla de configuración.
- 2026-04-27: Consolas/code highlighting corregido globalmente: se elimina el coloreado plano que forzaba bloques monocromos, se añade highlighter seguro compartido (sin rotura de markup) para demo + `TerminalCodeBlock`, y se unifica paleta con acento `#d2ff00` en keywords/comandos.
- 2026-04-27: Landing demo completada por paquete: tabs con ejemplos explícitos para `core`, `generator-typescript`, `generator-angular-client`, `plugin-nestjs`, `validator-zod`, `mock-generator`, `contract-diff` y flujo `cli`, con animación integrada contrato→generador→salidas.
- 2026-04-27: Landing demo interactiva refinada: animación de generación desacelerada para lectura real y bloque de flujo integrado dentro del mismo panel de código (sin separación visual), mejorando comprensión del proceso end-to-end.
- 2026-04-27: Landing demo (`See it in action`) evolucionada a experiencia interactiva: botón de ejecución, simulación visual de flujo contrato→generador→outputs, y cambio guiado de tabs de código generado (EN/ES i18n).
- 2026-04-27: Landing (`See it in action`) ampliada para primer usuario: ahora explica valor real de producto (qué problema elimina) y outputs concretos post-`generate` (Angular client, Nest scaffolding, Zod runtime schemas), en EN/ES i18n.
- 2026-04-27: Docs UI fix defensivo en `Contract Schema`: tarjeta `Modelo mental` ajustada para evitar reaparición de hueco/línea superior por estilos heredados de `vp-doc`.
- 2026-04-27: Docs UI (`sidebar`) ajustado en dark mode a fondo negro real (`#070707`) con borde carbono (`#1f1f1f`) para mantener consistencia visual con cards/hero/footer.
- 2026-04-27: Docs UI (`cards`) unificado con la home en dark mode: todas las cards de páginas `/docs/*` y quickstart pasan a fondo negro (`#070707`) con borde carbono (`#1f1f1f`) para eliminar contraste gris inconsistente.
- 2026-04-27: Docs UI fix: listas de contenido corregidas para evitar doble viñeta (marcador nativo + prefijo manual) en `Quickstart`, `CLI`, `Examples`, `Contributing` y `FAQ`.
- 2026-04-27: Docs producto (`/docs`) ampliados en modo onboarding para usuario nuevo: `Documentation`, `CLI Reference`, `Contract Schema`, `Generators` y `Examples` ahora incluyen contexto de uso, flujos recomendados, resultados esperados, errores frecuentes y mapa explícito de paquetes; validado con `@fr4n0m/docs build`.
- 2026-04-27: Docs producto completados en nivel explicativo alto para primera visita en todas las páginas principales (`Documentation`, `Quickstart`, `CLI`, `Schema`, `Generators`, `Examples`, `Contributing`, `FAQ`) con secciones de “cuándo usar”, “qué esperar”, troubleshooting y criterios de calidad; `docs build` en verde.
- 2026-04-27: Docs producto (`quickstart`) ampliado para onboarding real de primer uso: prerequisitos, explicación por paso (install/init/generate/check), resultados esperados y siguiente acción, todo en i18n EN/ES sin texto hardcodeado.
- 2026-04-27: Release (`npm`) preflight ejecutado de nuevo tras refactor docs/CLI: `release:preflight` verde (build+test+pack dry-run) y paquete `@fr4n0m/contract-kit@1.0.0` listo para publish; quedan solo warnings de `exports` (`default` antes de `require`) como mejora no bloqueante.
- 2026-04-27: Producto (`cli`) añadido soporte de versión (`contract-kit --version`, `-v`, `version`) con lectura segura de `package.json` y tests para diagnóstico/reporte en soporte y CI.
- 2026-04-27: Docs producto (`/docs/*`) refactor grande completado: páginas migradas a componentes Vue + i18n EN/ES por archivos JSON pequeños (`docsHome`, `cliReference`, `contractSchema`, `generators`, `examples`, `contributing`, `faq`) para eliminar contenido hardcodeado y facilitar mantenimiento.
- 2026-04-27: Docs producto (`commands`) normalizados a uso público del paquete (`contract-kit ...`) y quickstart actualizado al scope final `@fr4n0m/contract-kit` en instalación multi-gestor.
- 2026-04-27: Web/docs UX (`animations`) fix de estabilidad: `useReveal` pasa a modo fail-safe con estado `reveal-pending` + timeout de rescate para evitar elementos invisibles durante navegación SPA (regresión de `opacity:0` corregida).
- 2026-04-27: Web/docs UX (`animations`) ampliado coverage de `reveal/stagger`: `How It Works` completo (intro + steps + cards de example/release checks), bloque demo (`title + description + panel`) y footer global con entrada consistente.
- 2026-04-27: Release (`npm`) **0.1.0 publicado**: los 8 paquetes `@fr4n0m/*` (core, contract-kit, contract-diff, generator-typescript, generator-angular-client, mock-generator, plugin-nestjs, validator-zod) publicados en npm con tag `latest`. CLI renombrado de `@fr4n0m/cli` a `@fr4n0m/contract-kit` para instalación natural (`npm install -g @fr4n0m/contract-kit`).
- 2026-04-27: Release (`npm`) endurecido: todos los paquetes publicables `@fr4n0m/*` ahora incluyen metadatos npm de OSS (`license`, `homepage`, `repository`, `bugs`, `author`, `keywords`) para publicación profesional.
- 2026-04-27: Release (`npm`) pipeline verificado end-to-end con `release:preflight` + `release:publish:dry` en los 8 paquetes en orden de dependencias; publish real listo en cuanto se reemplace el token npm inválido (`E401` en `npm whoami`).
- 2026-04-27: Tooling (`turbo`) ajustado para `@fr4n0m/docs#build` con `outputs` explícito (`.vitepress/dist/**`) y eliminación de warning en preflight.
- 2026-04-28: Web/docs UX (`mobile`): menú hamburguesa añadido al header móvil (`MobileMenu.vue`) con drawer slide-in/out desde la derecha, selector de idioma EN/ES integrado y bloqueo de scroll mientras abierto. `HeaderLangSwitch` oculto en móvil (`hidden md:flex`). Pendiente: revisión UX completa en mobile (layout, tipografía, espaciados, hero, demo panel).
- 2026-04-27: Calidad web/docs (`Lighthouse`): añadir pasada completa y periódica de todas las áreas (Performance, Accessibility, Best Practices, SEO) hasta alcanzar el máximo rendimiento estable antes de release.
- 2026-04-27: Calidad de producto (`packages/*`): eliminados todos los `lint` placeholder; cada paquete valida tipos reales con `tsc --noEmit` y `pnpm lint` queda verde en todo el monorepo.
- 2026-04-27: Calidad de producto (`generator-typescript` + `generator-angular-client`): añadidos snapshots deterministas en tests de generación para blindar regresiones del código emitido.
- 2026-04-27: Release (`npm`): añadido `release:auth` para validar `npm ping` + `whoami` + estado publish de cada paquete antes de `release:publish:first`; detecta bloqueo de token (`E401`) de forma temprana.
- 2026-04-24: Release (`npm`) validado end-to-end en preflight + publish dry-run para `@fr4n0m/*`; publish real bloqueado por permisos del token npm actual (respuesta `E404/E403` en `PUT @fr4n0m/core`), pendiente regenerar token con permisos de publicación del scope para liberar `0.1.0` hoy.
- 2026-04-24: Producto+branding: migración de naming técnico completada (`@ngx-contract-kit/*` -> `@fr4n0m/*`, bin principal `contract-kit` con alias temporal `ngx-contract-kit` para transición).
- 2026-04-23: Release automation (`tooling/scripts`): añadido versionado automático de paquetes (`release-version.mjs`) con dry-run/apply y sincronización de versiones internas para preparar publish repetible sin edición manual.
- 2026-04-23: Release automation (`tooling/scripts`): flujo reproducible para `npm` con `release:preflight` (build+test+pack) y `release:publish` en orden de dependencias, incluyendo modo seguro dry-run y publish real.
- 2026-04-23: Release prep (`npm`): paquetes preparados para publicación inicial (`private: false`, `publishConfig.access`, `exports`, `files`, CLI bin en `dist/bin.js`, exclusión de tests de `dist`) y validación con `npm pack --dry-run` en todos los paquetes.
- 2026-04-23: Producto (`cli`): nuevo comando `validate` (`ckit:validate`) para validar contratos sin generar artefactos, pensado para pre-commit/CI rápido, con cobertura en tests.
- 2026-04-23: Producto (`cli` + `generator-typescript` + `generator-angular-client`): `ckit:generate` modularizado para escribir `contract-model.ts` y `angular-client.ts` mediante paquetes de generador dedicados (menos acoplamiento del CLI al `core`).
- 2026-04-23: Producto (`cli` + `contract-diff`): hito de hardening CI completado en `check` con flags `--json`, `--report <path>` y `--baseline <summary-path>`, incluyendo reporte estructurado reusable (`createContractDiffReport`) y tests de regresión para pipeline.
- 2026-04-23: Producto (`mock-generator` + `cli`): refactor de `ckit:mock` para usar API de paquete (`generateMocksFromContracts`) y nuevo formato de salida con `responseByStatus`, evitando lógica duplicada en CLI.
- 2026-04-23: Producto (`cli`): nuevo comando `backend` (`ckit:backend`) para generar únicamente artefactos backend (`zod-schemas.ts`, `nest-controller.ts`, `nest-handlers.stub.ts`) sin regenerar `types/summary/angular-client`.
- 2026-04-22: Producto (`cli` + `plugin-nestjs`): `ckit:generate` amplía backend scaffolding con `generated/nest-handlers.stub.ts` tipado (`defineNestHandlers<ContractModel>`) para implementar handlers sin boilerplate manual.
- 2026-04-22: Producto (`validator-zod`): `generateZodSchemasSource` ampliado para incluir schemas de `response` por status code además de `params/query/body`, mejorando validación runtime completa del contrato.
- 2026-04-22: Producto (`cli` + `plugin-nestjs`): `ckit:generate` ahora incluye `generated/nest-controller.ts` usando `generateNestControllerSource` y modelo derivado de contratos (`createNestModelFromContracts`), validado en flujo real de CLI.
- 2026-04-22: Producto (`plugin-nestjs`): añadido generador de skeleton de controller Nest (`generateNestControllerSource`) con decorators HTTP y stubs por endpoint, para acelerar wiring backend.
- 2026-04-22: Producto (`cli` + `validator-zod`): `ckit:generate` ahora emite también `generated/zod-schemas.ts` para validación runtime; flujo verificado end-to-end junto a `ckit:mock`.
- 2026-04-22: Producto (`cli`): nuevo comando `mock` integrado (`ckit:mock`) para generar `generated/mocks.json` por endpoint; `check` pasa a reutilizar `@fr4n0m/contract-diff` para reporte centralizado de breaking changes.
- 2026-04-22: Producto (`contract-diff`): paquete activado con API reusable (`compareContractSummaries`) y formateador de reporte (`formatContractDiffReport`) para reutilizar la lógica de breaking changes fuera del CLI.
- 2026-04-22: Producto (`generator-typescript` + `generator-angular-client`): ambos paquetes pasan de placeholder a módulos funcionales con wrappers de generación tipada y tests propios.
- 2026-04-22: Producto (`mock-generator`): paquete activado para generar payloads mock deterministas desde `ContractShape` (string/number/boolean/unknown) con tests.
- 2026-04-22: Producto (`validator-zod`): paquete activado con `createZodSchemaFromShape` para validación runtime desde contrato, incluyendo tests y dependencia `zod`.
- 2026-04-22: Producto (`plugin-nestjs`): paquete activado con API tipada mínima para backend-safe wiring (`defineNestHandlers`) y tabla de rutas (`createNestRouteTable`), incluyendo tests del paquete.
- 2026-04-22: Producto (`core`/`cli`): `check` amplía cobertura de breaking changes con detección de campos request añadidos (requeridos), cambios de tipo en request, campos de response eliminados y cambios de tipo en response, con reporte detallado en CLI y tests nuevos.
- 2026-04-22: Producto (`core`): generación tipada endurecida para evitar colisiones entre contratos (keys del `ContractModel` y tipos/métodos Angular ahora namespaced por archivo de contrato, p.ej. `users.getOne` / `users_getOne`), con tests añadidos para casos de nombres repetidos.
- 2026-04-22: Producto (`core`/`cli`): configuración de proyecto activada de forma real con `contract-kit.config.json` (`contractsDir`/`outputDir`) aplicada en `init`, `generate` y `check`; se añaden tests para lectura de config y escritura en `outputDir` personalizado.
- 2026-04-22: Producto (`core`/`cli`): generado nuevo artefacto `generated/angular-client.ts` con cliente Angular base tipado desde `contract-model` (tipos request/response por endpoint + métodos por operación) y salida integrada en `ckit:generate`.
- 2026-04-22: Producto (`core`/`cli`): `check` reforzado para detectar breaking changes reales adicionales (cambios de método/path por endpoint, status codes de respuesta eliminados y campos eliminados en `params/query/body`), con salida detallada en CLI y tests unitarios nuevos.
- 2026-04-22: Fix de despliegue en Vercel para `apps/docs` con `vercel.json` local y `outputDirectory` explícito en `.vitepress/dist` (evita error de carpeta `dist` no encontrada).
- 2026-04-22: Consolas de documentación unificadas al nuevo diseño (`TerminalCommandList`) en páginas de referencia (CLI, Contributing y FAQ) para consistencia visual.
- 2026-04-22: Sistema i18n refactorizado a archivos JSON pequeños por dominio (`meta`, `nav`, `quickstart`, `howItWorks`, `commandPalette`, `footer`, etc.) con agregador `i18n/index.ts`; se eliminan `en.json` y `es.json` monolíticos.
- 2026-04-22: `Quickstart` migrado a componente i18n completo (`QuickstartGuide`) con los 4 pasos (install/init/generate/check) renderizados dinámicamente desde JSON EN/ES.
- 2026-04-22: Se decide dejar la documentación de producto en estado iterativo y completar la versión final al cierre del desarrollo, cuando el paquete esté al 100%, para asegurar que todo el contenido sea exacto y definitivo.
- 2026-04-22: Tipografía de cuerpo en docs migrada de `Ubuntu Mono` a `Ubuntu Sans Mono` y eliminación completa de la familia/ficheros `Ubuntu Mono` del proyecto para unificar estilo visual.
- 2026-04-22: Sección `Versioning` eliminada de la documentación pública (página, sidebar, índice y cmd-kit) para mantener los docs enfocados en uso directo del producto.
- 2026-04-22: `Quickstart` actualizado con selector desplegable de gestor de paquetes (`pnpm`, `npm`, `yarn`, `bun`) y render dinámico del comando de instalación en formato consola, con etiquetas i18n EN/ES.
- 2026-04-22: Sección `How It Works` rediseñada para mostrar comandos en formato terminal dentro de cards (en lugar de badges), con componente reutilizable `TerminalCommandList` para mejorar claridad visual.
- 2026-04-21: `cmd-kit` de la web actualizado con navegación anidada para toda la documentación (`/docs/*`), iconografía personalizada con `@tabler/icons-vue` por sección/acción y estado hover/active alineado a la paleta verde del producto.
- 2026-04-21: Seccion `Docs` integrada en la landing single-page (`#docs`) con contenido EN/ES 100% desde JSON, enlace en header/footer y estructura de referencia (quickstart, cli, schema, generators, versioning, examples, contributing, faq).
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
- 2026-04-20: README rehecho en formato profesional bilingüe (ES/EN), badges, navegación rápida, secciones con iconos y guía de contribución.

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
- Publicar `1.0.0`. -.- - YA PUBLICADO: @fr4n0m/contract-kit
  CLI and library for contract-driven API development between Angular and NestJS

fr4n0m
published 1.0.0 • 12 hours ago

- Comunicar lanzamiento (README, changelog, post tecnico).
- Ejecutar todas las pasadas de Lighthouse (Performance, Accessibility, Best Practices y SEO) con objetivo de puntuaciones máximas estables en desktop y mobile.
- Web/docs UX: añadir animaciones de entrada (stagger/reveal) en todas las secciones de la web, con rendimiento estable en desktop y mobile.

## Criterios de exito

- Tiempo de setup < 10 minutos.
- Primer contrato funcional < 15 minutos.
- Cobertura de tests del core >= 80%.
- 0 errores criticos abiertos en release 1.0.0.
