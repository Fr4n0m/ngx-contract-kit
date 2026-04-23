import path from "node:path";
import type { ContractFile, ContractScalarType, ContractShape } from "@ngx-contract-kit/core";

function scalarMock(field: string, scalar: ContractScalarType): unknown {
  switch (scalar) {
    case "string":
      return `${field}_value`;
    case "number":
      return 1;
    case "boolean":
      return true;
    default:
      return null;
  }
}

export function generateMockFromShape(shape: ContractShape | undefined): Record<string, unknown> {
  const output: Record<string, unknown> = {};
  for (const [field, scalar] of Object.entries(shape ?? {})) {
    output[field] = scalarMock(field, scalar);
  }
  return output;
}

function contractNamespaceFromPath(contractFilePath: string): string {
  return path.basename(contractFilePath).replace(/\.contract\.json$/i, "");
}

export type EndpointMocks = {
  params: Record<string, unknown>;
  query: Record<string, unknown>;
  body: Record<string, unknown>;
  responseByStatus: Record<string, Record<string, unknown>>;
};

export function generateMocksFromContracts(
  contractsByFile: Record<string, ContractFile>
): Record<string, EndpointMocks> {
  const mocks: Record<string, EndpointMocks> = {};
  const sortedFiles = Object.entries(contractsByFile).sort(([a], [b]) => a.localeCompare(b));
  for (const [filePath, contract] of sortedFiles) {
    const namespace = contractNamespaceFromPath(filePath);
    const endpoints = Object.entries(contract).sort(([a], [b]) => a.localeCompare(b));
    for (const [endpointName, endpoint] of endpoints) {
      const key = `${namespace}.${endpointName}`;
      const responseByStatus: Record<string, Record<string, unknown>> = {};
      const sortedResponses = Object.entries(endpoint.response ?? {}).sort(([a], [b]) => a.localeCompare(b));
      for (const [statusCode, shape] of sortedResponses) {
        responseByStatus[statusCode] = generateMockFromShape(shape);
      }

      mocks[key] = {
        params: generateMockFromShape(endpoint.params),
        query: generateMockFromShape(endpoint.query),
        body: generateMockFromShape(endpoint.body),
        responseByStatus
      };
    }
  }

  return mocks;
}
