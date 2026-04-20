# Architecture

`ngx-contract-kit` is structured as a monorepo with clear package boundaries:

- `packages/core`: contract validation, parsing, summary, and diff logic.
- `packages/cli`: user-facing commands (`init`, `generate`, `check`).
- `packages/generator-*`: code generation targets (Angular, TypeScript, mocks).
- `packages/plugin-*`: backend integrations (NestJS first).

## Design principles

1. Single contract source.
2. Predictable generated output.
3. Safe upgrades with explicit compatibility checks.
4. Incremental adoption for existing projects.

## Current implementation scope

- Contract schema validation with strict TypeScript.
- CLI workflow to bootstrap and verify a project.
- Initial test coverage for core behavior.

## Near-term package roadmap

1. Richer endpoint schema and response modeling.
2. Angular client generator package.
3. NestJS plugin and runtime validator package.
4. Contract diff CLI with configurable policy levels.
