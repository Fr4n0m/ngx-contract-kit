# Plan de repositorio

## Nombre

`contract-kit`

## Estrategia

- Monorepo para mantener CLI, core y adaptadores versionados en conjunto.
- Publicacion de paquetes independientes con semver.
- Documentacion y ejemplos en el mismo repo.

## Estructura propuesta

```text
contract-kit/
  apps/
    docs/                        # Sitio docs (VitePress o Docusaurus)
    examples/
      angular-nest-basic/
      angular-express-basic/
  packages/
    cli/                         # npx contract-kit
    core/                        # parser + AST + motor de generacion
    generator-typescript/        # tipos compartidos
    generator-angular-client/    # cliente Angular HttpClient
    plugin-nestjs/               # integracion backend Nest
    plugin-express/              # fase posterior al MVP
    validator-zod/               # validacion runtime
    mock-generator/              # mocks para test/e2e
    contract-diff/               # deteccion breaking changes
  tooling/
    eslint-config/
    tsconfig/
    scripts/
  .github/
    workflows/
  docs/
    adr/
  ROADMAP.md
  CONTRIBUTING.md
  LICENSE
```

## Convenciones

- Package manager: `pnpm`.
- Build: `tsup`.
- Tests: `vitest`.
- Lint: `eslint`.
- Formato: `prettier`.
- Release: `changesets` + GitHub Actions.

## Versionado inicial

- Rama principal: `main`.
- Pre-releases: `alpha`, `rc`.
- Releases estables: `x.y.z`.
