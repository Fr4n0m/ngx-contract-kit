# `@fr4n0m/contract-kit`

CLI and library for contract-driven API development between Angular and NestJS.

[![npm](https://img.shields.io/npm/v/@fr4n0m/contract-kit)](https://www.npmjs.com/package/@fr4n0m/contract-kit)
[![license](https://img.shields.io/badge/license-MIT-green)](../../LICENSE)

## Install

```bash
# Global CLI
npm install -g @fr4n0m/contract-kit

# Or as project dependency
npm install @fr4n0m/contract-kit
```

## CLI Commands

```bash
contract-kit init        # Create contract-kit.config.json + sample contract
contract-kit generate    # Generate TypeScript types + Angular client + backend artifacts
contract-kit backend     # Generate only backend artifacts (Zod, NestJS controller + handlers)
contract-kit mock        # Generate mock payloads for all endpoints
contract-kit validate    # Validate contracts without generating artifacts
contract-kit check       # Detect breaking changes vs saved baseline
```

## Library Subpath Exports

Import only what you need:

```ts
import { readContract, createSummary }       from "@fr4n0m/contract-kit/core";
import { compareContractSummaries }           from "@fr4n0m/contract-kit/diff";
import { generateMocksFromContracts }         from "@fr4n0m/contract-kit/mock";
import { createZodSchemaFromShape }           from "@fr4n0m/contract-kit/zod";
import { defineNestHandlers }                 from "@fr4n0m/contract-kit/nestjs";
import { generateTypeScriptModels }           from "@fr4n0m/contract-kit/generator-ts";
import { generateAngularClient }              from "@fr4n0m/contract-kit/generator-angular";
```

## Quick Start

```bash
npm install -g @fr4n0m/contract-kit
contract-kit init
contract-kit generate
contract-kit check
```

## Documentation

[ngx-contract-kit-docs.vercel.app](https://ngx-contract-kit-docs.vercel.app)

## License

MIT
