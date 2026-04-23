import { generateContractModelFile } from "@ngx-contract-kit/core";
import type { ContractFile } from "@ngx-contract-kit/core";

export function generateTypeScriptModels(contractsByFile: Record<string, ContractFile>): string {
  return generateContractModelFile(contractsByFile);
}
