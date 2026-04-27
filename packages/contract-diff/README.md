# `@fr4n0m/contract-kit/diff`

Breaking-change detection for contract-kit. Compares two `ContractSummary` snapshots and reports added, removed, or modified endpoints.

## Install

```bash
npm install @fr4n0m/contract-kit
```

## Usage

```ts
import {
  compareContractSummaries,
  createContractDiffReport,
  formatContractDiffReport,
} from "@fr4n0m/contract-kit/diff";
```

## API

#### `compareContractSummaries(baseline, current)`
Returns a `ContractDiffResult` with all breaking and non-breaking changes.

#### `createContractDiffReport(diff)`
Converts a `ContractDiffResult` into a structured `ContractDiffReport` object.

#### `formatContractDiffReport(diff)`
Returns a human-readable string array suitable for CLI output.

### Issue codes

| Code | Meaning |
|------|---------|
| `endpoint_removed` | Endpoint deleted from contract |
| `method_changed` | HTTP method changed |
| `path_changed` | URL path changed |
| `status_removed` | Response status code removed |
| `request_field_added` | Required request field added |
| `request_type_changed` | Request field type changed |
| `response_field_removed` | Response field removed |
| `response_type_changed` | Response field type changed |

## Part of

[`@fr4n0m/contract-kit`](https://ngx-contract-kit-docs.vercel.app) — contract-driven API toolkit for Angular + NestJS.
