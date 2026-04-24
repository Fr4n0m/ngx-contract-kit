import { generateContractModelFile } from "@fr4n0m/core";
import type { ContractFile } from "@fr4n0m/core";

export function generateTypeScriptModels(contractsByFile: Record<string, ContractFile>): string {
  return generateContractModelFile(contractsByFile);
}
