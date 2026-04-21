# FAQ

## `ckit:generate` does not create outputs

Check that your contract files exist and pass schema validation first.

## `ckit:check` fails unexpectedly

Review response status and request/response shape changes in the contract.

## How do I validate contract changes before release?

Run:

```bash
pnpm ckit:check
```
