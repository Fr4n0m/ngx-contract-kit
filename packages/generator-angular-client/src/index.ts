import { generateAngularClientFile } from "@ngx-contract-kit/core";
import type { ContractFile } from "@ngx-contract-kit/core";

export function generateAngularClient(contractsByFile: Record<string, ContractFile>): string {
  return generateAngularClientFile(contractsByFile);
}
