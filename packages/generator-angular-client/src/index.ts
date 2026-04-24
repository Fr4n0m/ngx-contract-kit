import { generateAngularClientFile } from "@fr4n0m/core";
import type { ContractFile } from "@fr4n0m/core";

export function generateAngularClient(contractsByFile: Record<string, ContractFile>): string {
  return generateAngularClientFile(contractsByFile);
}
