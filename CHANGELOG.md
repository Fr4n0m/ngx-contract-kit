# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-04-28

First stable release of `@fr4n0m/contract-kit`.

### Highlights

- **Single install, full stack.** `npm install -g @fr4n0m/contract-kit` gives you the CLI and all generators in one package via subpath exports (`@fr4n0m/contract-kit/core`, `/generator-typescript`, `/plugin-nestjs`, …).
- **Contract-driven workflow.** Define your API once in a JSON file; generate TypeScript types, Angular client, Zod schemas, NestJS controller scaffold, mocks, and a diff baseline — all from one command.
- **Breaking-change detection.** `contract-kit check` compares the current contract against a saved summary and exits non-zero on any incompatible change — safe to wire into CI.
- **i18n docs site** in EN/ES deployed at <https://ngx-contract-kit-docs.vercel.app/>.

### Added

#### Core (`@fr4n0m/contract-kit/core`)
- JSON contract parser and validator (`validateContract`) — rejects invalid HTTP methods, non-numeric status codes, and unsupported scalar types at runtime.
- Typed code generators: `generateContractModelFile`, `generateAngularClientFile` — namespaced by contract file to avoid key collisions across multiple contracts.
- Summary creation (`createSummary`) and diff engine (`diffSummaries`) — detects removed endpoints, changed method/path signatures, removed/added request fields, changed field types in request and response, removed response status codes.
- Project config support (`contract-kit.config.json`) — custom `contractsDir` and `outputDir` with schema version validation.
- `writeGeneratedArtifacts` — writes all generated files to the configured output directory.

#### CLI (`contract-kit`)
- `contract-kit init` — scaffolds `contract-kit.config.json` + example contract.
- `contract-kit generate` — emits `contract-model.ts`, `angular-client.ts`, `zod-schemas.ts`, `nest-controller.ts`, `nest-handlers.stub.ts`, `mocks.json`, `summary.json`.
- `contract-kit backend` — generates backend-only artifacts (Zod + NestJS) without touching frontend files.
- `contract-kit mock` — generates `mocks.json` with deterministic payloads per endpoint and status code.
- `contract-kit validate` — validates all contracts without generating output; fast pre-commit / CI check.
- `contract-kit check` — diffs current contracts against saved summary; supports `--json`, `--report <path>`, `--baseline <path>` flags.
- `contract-kit --version` / `-v` / `version` — prints installed version.

#### Generator packages
- `@fr4n0m/contract-kit/generator-typescript` — TypeScript model file generator (namespaced types, params/query/body/response per endpoint).
- `@fr4n0m/contract-kit/generator-angular-client` — Angular `HttpClient` service generator with fully typed request/response aliases.
- `@fr4n0m/contract-kit/plugin-nestjs` — NestJS controller scaffold generator (`generateNestControllerSource`, `createNestModelFromContracts`, `defineNestHandlers`).
- `@fr4n0m/contract-kit/validator-zod` — Zod schema generator from contract shapes, including per-status response schemas.
- `@fr4n0m/contract-kit/mock-generator` — deterministic mock payload generator for params, query, body and response by status.
- `@fr4n0m/contract-kit/contract-diff` — reusable diff report API (`compareContractSummaries`, `createContractDiffReport`, `formatContractDiffReport`) decoupled from CLI.

#### Tooling
- `release:preflight` — runs build + test + pack dry-run across all packages in dependency order.
- `release:version` / `release:version:apply` — automated version synchronisation across the monorepo.
- `release:auth` — validates npm credentials and publish status before release.

### Test coverage (all packages ≥ 80%)

| Package | Statements | Branches |
|---|---|---|
| core | 92% | 76% |
| cli | 81% | 67% |
| contract-diff | 100% | 100% |
| generator-angular-client | 100% | 100% |
| generator-typescript | 100% | 100% |
| mock-generator | 100% | 92% |
| plugin-nestjs | 97% | 86% |
| validator-zod | 94% | 76% |

### Docs & site
- VitePress docs site with full EN/ES i18n — Quickstart, CLI Reference, Contract Schema, Generators, Examples, Contributing, FAQ.
- Lighthouse scores: Performance 91, Accessibility 100, Best Practices 100, SEO 100.
- Interactive terminal demo on landing page with typewriter animation (contract → generate → outputs).
- Mobile hamburger menu with slide-in drawer, theme toggle, language switcher, and full docs sidebar navigation.
- Self-hosted fonts converted to woff2 (~60% smaller than TTF).

### Performance & quality fixes (docs)
- `useReveal`: above-fold elements now show immediately on mount — eliminates LCP render delay caused by `reveal-pending` opacity:0.
- `useReveal`: guards against non-`HTMLElement` refs — eliminates `TypeError: Cannot read properties of undefined (reading 'setProperty')` console errors.
- Ubuntu Sans Mono served as woff2 instead of TTF (48 KB vs 120 KB per weight).

---

## [0.1.0] — 2026-04-27

Internal alpha. All 8 packages (`@fr4n0m/*`) published to npm under the old scope. Superseded by 1.0.0 (consolidated into `@fr4n0m/contract-kit` with subpath exports). Old packages deprecated.
