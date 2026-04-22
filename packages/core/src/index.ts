import fs from "node:fs";
import path from "node:path";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ContractScalarType = "string" | "number" | "boolean" | "unknown";
export type ContractShape = Record<string, ContractScalarType>;
export type ContractResponses = Record<string, ContractShape>;

export type ContractEndpoint = {
  method: HttpMethod;
  path: string;
  params?: ContractShape;
  query?: ContractShape;
  body?: ContractShape;
  response?: ContractResponses;
};

export type ContractFile = Record<string, ContractEndpoint>;

export type SummaryEndpoint = {
  file: string;
  name: string;
  method: HttpMethod;
  path: string;
  paramsFields: string[];
  paramsSignatures: string[];
  queryFields: string[];
  querySignatures: string[];
  bodyFields: string[];
  bodySignatures: string[];
  responseStatusCodes: string[];
  responseSignatures: Record<string, string[]>;
};

export type ContractSummary = {
  version: 2;
  endpoints: SummaryEndpoint[];
};

export type ProjectConfig = {
  schemaVersion: 1;
  contractsDir: string;
  outputDir: string;
};

export const DEFAULT_PROJECT_CONFIG: ProjectConfig = {
  schemaVersion: 1,
  contractsDir: "contracts",
  outputDir: "generated"
};

const METHOD_SET = new Set<HttpMethod>(["GET", "POST", "PUT", "PATCH", "DELETE"]);
const SCALAR_SET = new Set<ContractScalarType>(["string", "number", "boolean", "unknown"]);
const STATUS_CODE_PATTERN = /^[1-5][0-9][0-9]$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateShape(shape: unknown, label: string): void {
  if (!isRecord(shape)) {
    throw new Error(`Invalid ${label}: expected an object`);
  }

  for (const [field, fieldType] of Object.entries(shape)) {
    if (typeof fieldType !== "string" || !SCALAR_SET.has(fieldType as ContractScalarType)) {
      throw new Error(
        `Invalid ${label}.${field}: type must be one of ${Array.from(SCALAR_SET).join(", ")}`
      );
    }
  }
}

function validateResponseShapes(response: unknown, label: string): void {
  if (!isRecord(response)) {
    throw new Error(`Invalid ${label}: expected an object`);
  }

  for (const [statusCode, shape] of Object.entries(response)) {
    if (!STATUS_CODE_PATTERN.test(statusCode)) {
      throw new Error(`Invalid ${label}.${statusCode}: status code must be a 3-digit HTTP code`);
    }
    validateShape(shape, `${label}.${statusCode}`);
  }
}

function shapeSignatures(shape: ContractShape | undefined): string[] {
  return Object.entries(shape ?? {})
    .map(([field, scalar]) => `${field}:${scalar}`)
    .sort();
}

function responseSignatures(response: ContractResponses | undefined): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const [status, shape] of Object.entries(response ?? {})) {
    result[status] = shapeSignatures(shape);
  }
  return result;
}

export function validateContract(contract: unknown, sourceName = "unknown"): asserts contract is ContractFile {
  if (!isRecord(contract)) {
    throw new Error(`Invalid contract in ${sourceName}: contract must be an object`);
  }

  const entries = Object.entries(contract);
  if (entries.length === 0) {
    throw new Error(`Invalid contract in ${sourceName}: contract has no endpoints`);
  }

  for (const [endpointName, endpoint] of entries) {
    if (!isRecord(endpoint)) {
      throw new Error(`Invalid endpoint "${endpointName}" in ${sourceName}: endpoint must be an object`);
    }

    if (typeof endpoint.path !== "string" || endpoint.path.length === 0) {
      throw new Error(`Invalid endpoint "${endpointName}" in ${sourceName}: "path" must be a non-empty string`);
    }

    if (typeof endpoint.method !== "string" || !METHOD_SET.has(endpoint.method as HttpMethod)) {
      throw new Error(
        `Invalid endpoint "${endpointName}" in ${sourceName}: "method" must be one of ${Array.from(METHOD_SET).join(", ")}`
      );
    }

    if ("params" in endpoint) {
      validateShape(endpoint.params, `endpoint "${endpointName}".params`);
    }

    if ("query" in endpoint) {
      validateShape(endpoint.query, `endpoint "${endpointName}".query`);
    }

    if ("body" in endpoint) {
      validateShape(endpoint.body, `endpoint "${endpointName}".body`);
    }

    if ("response" in endpoint) {
      validateResponseShapes(endpoint.response, `endpoint "${endpointName}".response`);
    }
  }
}

export function readContract(filePath: string): ContractFile {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed: unknown = JSON.parse(raw);
  validateContract(parsed, filePath);
  return parsed;
}

export function readProjectConfig(projectRoot: string): ProjectConfig {
  const configPath = path.join(projectRoot, "ngx-contract-kit.config.json");
  if (!fs.existsSync(configPath)) {
    return DEFAULT_PROJECT_CONFIG;
  }

  const raw = fs.readFileSync(configPath, "utf8");
  const parsed: unknown = JSON.parse(raw);
  if (!isRecord(parsed)) {
    throw new Error("Invalid ngx-contract-kit.config.json: expected an object");
  }

  const schemaVersion = parsed.schemaVersion;
  if (schemaVersion !== 1) {
    throw new Error("Invalid ngx-contract-kit.config.json: schemaVersion must be 1");
  }

  const contractsDir = parsed.contractsDir;
  const outputDir = parsed.outputDir;
  if (typeof contractsDir !== "string" || contractsDir.trim().length === 0) {
    throw new Error("Invalid ngx-contract-kit.config.json: contractsDir must be a non-empty string");
  }
  if (typeof outputDir !== "string" || outputDir.trim().length === 0) {
    throw new Error("Invalid ngx-contract-kit.config.json: outputDir must be a non-empty string");
  }

  return {
    schemaVersion: 1,
    contractsDir: contractsDir.trim(),
    outputDir: outputDir.trim()
  };
}

export function scanContractFiles(projectRoot: string, contractsDir = DEFAULT_PROJECT_CONFIG.contractsDir): string[] {
  const contractsRoot = path.join(projectRoot, contractsDir);
  if (!fs.existsSync(contractsRoot)) {
    throw new Error(`Missing contracts directory: ${contractsRoot}`);
  }

  return fs
    .readdirSync(contractsRoot)
    .filter((file) => file.endsWith(".contract.json"))
    .map((file) => path.join(contractsRoot, file));
}

export function createSummary(contractsByFile: Record<string, ContractFile>): ContractSummary {
  const endpoints: SummaryEndpoint[] = [];
  for (const [file, contract] of Object.entries(contractsByFile)) {
    for (const [name, endpoint] of Object.entries(contract)) {
      endpoints.push({
        file: path.basename(file),
        name,
        method: endpoint.method,
        path: endpoint.path,
        paramsFields: Object.keys(endpoint.params ?? {}).sort(),
        paramsSignatures: shapeSignatures(endpoint.params),
        queryFields: Object.keys(endpoint.query ?? {}).sort(),
        querySignatures: shapeSignatures(endpoint.query),
        bodyFields: Object.keys(endpoint.body ?? {}).sort(),
        bodySignatures: shapeSignatures(endpoint.body),
        responseStatusCodes: Object.keys(endpoint.response ?? {}).sort(),
        responseSignatures: responseSignatures(endpoint.response)
      });
    }
  }

  endpoints.sort((a, b) => `${a.method} ${a.path}`.localeCompare(`${b.method} ${b.path}`));
  return { version: 2, endpoints };
}

function generateTypesFile(summary: ContractSummary): string {
  const lines: string[] = [];
  lines.push("// Auto-generated by ngx-contract-kit");
  lines.push("");
  lines.push('export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";');
  lines.push("");
  lines.push("export type ContractEndpoint = {");
  lines.push("  name: string;");
  lines.push("  method: HttpMethod;");
  lines.push("  path: string;");
  lines.push("  source: string;");
  lines.push("};");
  lines.push("");
  lines.push("export const endpoints: ContractEndpoint[] = [");
  for (const endpoint of summary.endpoints) {
    lines.push(
      `  { name: "${endpoint.name}", method: "${endpoint.method}", path: "${endpoint.path}", source: "${endpoint.file}" },`
    );
  }
  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

function scalarToTsType(scalar: ContractScalarType): string {
  switch (scalar) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "unknown";
  }
}

function shapeToTypeLiteral(shape: ContractShape | undefined): string {
  if (!shape) {
    return "undefined";
  }
  const fields = Object.entries(shape).map(([key, scalar]) => `  ${key}: ${scalarToTsType(scalar)};`);
  if (fields.length === 0) {
    return "{}";
  }
  return `{\n${fields.join("\n")}\n}`;
}

function toIdentifier(input: string): string {
  const sanitized = input.replace(/[^a-zA-Z0-9_$]/g, "_");
  const normalized = sanitized.length > 0 ? sanitized : "endpoint";
  const startsValid = /^[A-Za-z_$]/.test(normalized);
  return startsValid ? normalized : `_${normalized}`;
}

function toPascalCase(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("") || "Endpoint";
}

function contractNamespaceFromFile(filePath: string): string {
  const base = path.basename(filePath);
  return base.replace(/\.contract\.json$/i, "");
}

function contractEndpointKey(filePath: string, endpointName: string): string {
  return `${contractNamespaceFromFile(filePath)}.${endpointName}`;
}

function responseSuccessType(contractKey: string, endpoint: ContractEndpoint): string {
  const statuses = Object.keys(endpoint.response ?? {});
  if (statuses.length === 0) {
    return "unknown";
  }
  if (statuses.includes("200")) {
    return `ContractModel["${contractKey}"]["response"]["200"]`;
  }
  const sorted = [...statuses].sort();
  const union = sorted
    .map((status) => `ContractModel["${contractKey}"]["response"]["${status}"]`)
    .join(" | ");
  return union;
}

function endpointRequestType(contractKey: string): string {
  return `{
    params: ContractModel["${contractKey}"]["params"];
    query: ContractModel["${contractKey}"]["query"];
    body: ContractModel["${contractKey}"]["body"];
  }`;
}

export function generateAngularClientFile(contractsByFile: Record<string, ContractFile>): string {
  const lines: string[] = [];
  const methodBlocks: string[] = [];
  lines.push("// Auto-generated by ngx-contract-kit");
  lines.push("/* eslint-disable @typescript-eslint/no-explicit-any */");
  lines.push("");
  lines.push('import type { HttpClient } from "@angular/common/http";');
  lines.push('import type { Observable } from "rxjs";');
  lines.push('import type { ContractModel } from "./contract-model";');
  lines.push("");

  const sortedFiles = Object.entries(contractsByFile).sort(([a], [b]) => a.localeCompare(b));
  for (const [filePath, contract] of sortedFiles) {
    const namespace = contractNamespaceFromFile(filePath);
    const endpoints = Object.entries(contract).sort(([a], [b]) => a.localeCompare(b));
    for (const [endpointName, endpoint] of endpoints) {
      const contractKey = contractEndpointKey(filePath, endpointName);
      const methodName = toIdentifier(`${namespace}_${endpointName}`);
      const requestTypeName = `${toPascalCase(namespace)}${toPascalCase(endpointName)}Request`;
      const responseTypeName = `${toPascalCase(namespace)}${toPascalCase(endpointName)}Response`;
      lines.push(`export type ${requestTypeName} = ${endpointRequestType(contractKey)};`);
      lines.push(`export type ${responseTypeName} = ${responseSuccessType(contractKey, endpoint)};`);
      lines.push("");
      methodBlocks.push(`  ${methodName}(input: ${requestTypeName}): Observable<${responseTypeName}> {`);
      methodBlocks.push(
        `    return this.request<${responseTypeName}>("${endpoint.method}", "${endpoint.path}", input);`
      );
      methodBlocks.push("  }");
      methodBlocks.push("");
    }
  }

  lines.push("export class ContractKitClient {");
  lines.push("  constructor(");
  lines.push("    private readonly http: HttpClient,");
  lines.push('    private readonly baseUrl = ""');
  lines.push("  ) {}");
  lines.push("");
  lines.push("  private request<TResponse>(");
  lines.push("    method: string,");
  lines.push("    path: string,");
  lines.push("    payload: { params?: Record<string, unknown>; query?: Record<string, unknown>; body?: unknown }");
  lines.push("  ): Observable<TResponse> {");
  lines.push("    let finalPath = path;");
  lines.push("    if (payload.params) {");
  lines.push("      for (const [key, value] of Object.entries(payload.params)) {");
  lines.push('        finalPath = finalPath.replace(`:${key}`, encodeURIComponent(String(value)));');
  lines.push("      }");
  lines.push("    }");
  lines.push("");
  lines.push("    const url = new URL(this.baseUrl + finalPath, \"http://localhost\");");
  lines.push("    if (payload.query) {");
  lines.push("      for (const [key, value] of Object.entries(payload.query)) {");
  lines.push("        if (value !== undefined && value !== null) {");
  lines.push("          url.searchParams.set(key, String(value));");
  lines.push("        }");
  lines.push("      }");
  lines.push("    }");
  lines.push("");
  lines.push("    return this.http.request<TResponse>(method, url.pathname + url.search, {");
  lines.push("      body: payload.body as any");
  lines.push("    });");
  lines.push("  }");
  lines.push("");
  lines.push(...methodBlocks);
  lines.push("}");
  lines.push("");
  return lines.join("\n");
}

export function generateContractModelFile(contractsByFile: Record<string, ContractFile>): string {
  const lines: string[] = [];
  lines.push("// Auto-generated by ngx-contract-kit");
  lines.push("");
  lines.push('export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";');
  lines.push("");
  lines.push("export type ContractModel = {");

  const sortedFiles = Object.entries(contractsByFile).sort(([a], [b]) => a.localeCompare(b));
  for (const [filePath, contract] of sortedFiles) {
    const endpoints = Object.entries(contract).sort(([a], [b]) => a.localeCompare(b));
    for (const [name, endpoint] of endpoints) {
      const contractKey = contractEndpointKey(filePath, name);
      lines.push(`  "${contractKey}": {`);
      lines.push(`    method: "${endpoint.method}";`);
      lines.push(`    path: "${endpoint.path}";`);
      lines.push(`    params: ${shapeToTypeLiteral(endpoint.params)};`);
      lines.push(`    query: ${shapeToTypeLiteral(endpoint.query)};`);
      lines.push(`    body: ${shapeToTypeLiteral(endpoint.body)};`);
      lines.push("    response: {");
      if (endpoint.response && Object.keys(endpoint.response).length > 0) {
        const responses = Object.entries(endpoint.response).sort(([a], [b]) => a.localeCompare(b));
        for (const [statusCode, shape] of responses) {
          lines.push(`      "${statusCode}": ${shapeToTypeLiteral(shape)};`);
        }
      }
      lines.push("    };");
      lines.push("  };");
    }
  }

  lines.push("};");
  lines.push("");
  return lines.join("\n");
}

export function writeGeneratedArtifacts(
  projectRoot: string,
  summary: ContractSummary,
  contractsByFile?: Record<string, ContractFile>,
  outputDir = DEFAULT_PROJECT_CONFIG.outputDir
): void {
  const outputRoot = path.join(projectRoot, outputDir);
  fs.mkdirSync(outputRoot, { recursive: true });

  const typesPath = path.join(outputRoot, "types.ts");
  fs.writeFileSync(typesPath, generateTypesFile(summary), "utf8");

  const summaryPath = path.join(outputRoot, "summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf8");

  if (contractsByFile) {
    const contractModelPath = path.join(outputRoot, "contract-model.ts");
    fs.writeFileSync(contractModelPath, generateContractModelFile(contractsByFile), "utf8");

    const angularClientPath = path.join(outputRoot, "angular-client.ts");
    fs.writeFileSync(angularClientPath, generateAngularClientFile(contractsByFile), "utf8");
  }
}

export function diffSummaries(
  previous: ContractSummary,
  current: ContractSummary
): {
  breaking: boolean;
  removed: string[];
  changedSignatures: string[];
  removedResponseStatuses: string[];
  removedRequestFields: string[];
  addedRequestFields: string[];
  changedRequestFieldTypes: string[];
  removedResponseFields: string[];
  changedResponseFieldTypes: string[];
} {
  const keyOf = (endpoint: SummaryEndpoint): string => `${endpoint.file}#${endpoint.name}`;
  const sortedCopy = (values: readonly string[]): string[] => [...values].sort();
  const calcRemoved = (previousItems: readonly string[], currentItems: readonly string[]): string[] => {
    const currentSet = new Set(currentItems);
    return sortedCopy(previousItems).filter((item) => !currentSet.has(item));
  };
  const calcAdded = (previousItems: readonly string[], currentItems: readonly string[]): string[] => {
    const previousSet = new Set(previousItems);
    return sortedCopy(currentItems).filter((item) => !previousSet.has(item));
  };
  const toSignatureMap = (signatures: readonly string[]): Map<string, string> => {
    const map = new Map<string, string>();
    for (const signature of signatures) {
      const separator = signature.indexOf(":");
      if (separator <= 0 || separator === signature.length - 1) {
        continue;
      }
      const field = signature.slice(0, separator);
      const scalarType = signature.slice(separator + 1);
      map.set(field, scalarType);
    }
    return map;
  };
  const collectChangedTypes = (
    previousSignatures: readonly string[],
    currentSignatures: readonly string[]
  ): string[] => {
    const previousMap = toSignatureMap(previousSignatures);
    const currentMap = toSignatureMap(currentSignatures);
    const changed: string[] = [];
    for (const [field, previousType] of previousMap) {
      const currentType = currentMap.get(field);
      if (currentType && currentType !== previousType) {
        changed.push(`${field}: ${previousType} -> ${currentType}`);
      }
    }
    return changed.sort();
  };

  const previousByKey = new Map(previous.endpoints.map((endpoint) => [keyOf(endpoint), endpoint]));
  const currentByKey = new Map(current.endpoints.map((endpoint) => [keyOf(endpoint), endpoint]));

  const removed: string[] = [];
  for (const [key, endpoint] of previousByKey) {
    if (!currentByKey.has(key)) {
      removed.push(`${endpoint.method} ${endpoint.path} (${endpoint.file}:${endpoint.name})`);
    }
  }

  const changedSignatures: string[] = [];
  const removedResponseStatuses: string[] = [];
  const removedRequestFields: string[] = [];
  const addedRequestFields: string[] = [];
  const changedRequestFieldTypes: string[] = [];
  const removedResponseFields: string[] = [];
  const changedResponseFieldTypes: string[] = [];

  for (const [key, previousEndpoint] of previousByKey) {
    const currentEndpoint = currentByKey.get(key);
    if (!currentEndpoint) {
      continue;
    }

    if (
      previousEndpoint.method !== currentEndpoint.method ||
      previousEndpoint.path !== currentEndpoint.path
    ) {
      changedSignatures.push(
        `${previousEndpoint.file}:${previousEndpoint.name} (${previousEndpoint.method} ${previousEndpoint.path} -> ${currentEndpoint.method} ${currentEndpoint.path})`
      );
    }

    const removedStatuses = calcRemoved(
      previousEndpoint.responseStatusCodes ?? [],
      currentEndpoint.responseStatusCodes ?? []
    );
    if (removedStatuses.length > 0) {
      removedResponseStatuses.push(
        `${previousEndpoint.file}:${previousEndpoint.name} (${removedStatuses.join(", ")})`
      );
    }

    const removedParams = calcRemoved(previousEndpoint.paramsFields ?? [], currentEndpoint.paramsFields ?? []);
    const removedQuery = calcRemoved(previousEndpoint.queryFields ?? [], currentEndpoint.queryFields ?? []);
    const removedBody = calcRemoved(previousEndpoint.bodyFields ?? [], currentEndpoint.bodyFields ?? []);
    const addedParams = calcAdded(previousEndpoint.paramsFields ?? [], currentEndpoint.paramsFields ?? []);
    const addedQuery = calcAdded(previousEndpoint.queryFields ?? [], currentEndpoint.queryFields ?? []);
    const addedBody = calcAdded(previousEndpoint.bodyFields ?? [], currentEndpoint.bodyFields ?? []);

    const parts: string[] = [];
    if (removedParams.length > 0) {
      parts.push(`params: ${removedParams.join(", ")}`);
    }
    if (removedQuery.length > 0) {
      parts.push(`query: ${removedQuery.join(", ")}`);
    }
    if (removedBody.length > 0) {
      parts.push(`body: ${removedBody.join(", ")}`);
    }
    if (parts.length > 0) {
      removedRequestFields.push(`${previousEndpoint.file}:${previousEndpoint.name} (${parts.join(" | ")})`);
    }

    const addedParts: string[] = [];
    if (addedParams.length > 0) {
      addedParts.push(`params: ${addedParams.join(", ")}`);
    }
    if (addedQuery.length > 0) {
      addedParts.push(`query: ${addedQuery.join(", ")}`);
    }
    if (addedBody.length > 0) {
      addedParts.push(`body: ${addedBody.join(", ")}`);
    }
    if (addedParts.length > 0) {
      addedRequestFields.push(`${previousEndpoint.file}:${previousEndpoint.name} (${addedParts.join(" | ")})`);
    }

    const changedParamTypes = collectChangedTypes(
      previousEndpoint.paramsSignatures ?? [],
      currentEndpoint.paramsSignatures ?? []
    );
    const changedQueryTypes = collectChangedTypes(
      previousEndpoint.querySignatures ?? [],
      currentEndpoint.querySignatures ?? []
    );
    const changedBodyTypes = collectChangedTypes(
      previousEndpoint.bodySignatures ?? [],
      currentEndpoint.bodySignatures ?? []
    );
    const changedRequestParts: string[] = [];
    if (changedParamTypes.length > 0) {
      changedRequestParts.push(`params: ${changedParamTypes.join(", ")}`);
    }
    if (changedQueryTypes.length > 0) {
      changedRequestParts.push(`query: ${changedQueryTypes.join(", ")}`);
    }
    if (changedBodyTypes.length > 0) {
      changedRequestParts.push(`body: ${changedBodyTypes.join(", ")}`);
    }
    if (changedRequestParts.length > 0) {
      changedRequestFieldTypes.push(
        `${previousEndpoint.file}:${previousEndpoint.name} (${changedRequestParts.join(" | ")})`
      );
    }

    const previousResponseStatuses = Object.keys(previousEndpoint.responseSignatures ?? {});
    const currentResponseStatuses = Object.keys(currentEndpoint.responseSignatures ?? {});
    const commonStatuses = sortedCopy(previousResponseStatuses).filter((status) =>
      new Set(currentResponseStatuses).has(status)
    );
    for (const status of commonStatuses) {
      const previousStatusSignatures = previousEndpoint.responseSignatures?.[status] ?? [];
      const currentStatusSignatures = currentEndpoint.responseSignatures?.[status] ?? [];
      const previousStatusMap = toSignatureMap(previousStatusSignatures);
      const currentStatusMap = toSignatureMap(currentStatusSignatures);
      const removedFields = sortedCopy(Array.from(previousStatusMap.keys())).filter(
        (field) => !currentStatusMap.has(field)
      );
      if (removedFields.length > 0) {
        removedResponseFields.push(
          `${previousEndpoint.file}:${previousEndpoint.name} [${status}] (${removedFields.join(", ")})`
        );
      }
      const changedTypes = collectChangedTypes(previousStatusSignatures, currentStatusSignatures);
      if (changedTypes.length > 0) {
        changedResponseFieldTypes.push(
          `${previousEndpoint.file}:${previousEndpoint.name} [${status}] (${changedTypes.join(", ")})`
        );
      }
    }
  }

  const hasBreaking =
    removed.length > 0 ||
    changedSignatures.length > 0 ||
    removedResponseStatuses.length > 0 ||
    removedRequestFields.length > 0 ||
    addedRequestFields.length > 0 ||
    changedRequestFieldTypes.length > 0 ||
    removedResponseFields.length > 0 ||
    changedResponseFieldTypes.length > 0;

  return {
    breaking: hasBreaking,
    removed: sortedCopy(removed),
    changedSignatures: sortedCopy(changedSignatures),
    removedResponseStatuses: sortedCopy(removedResponseStatuses),
    removedRequestFields: sortedCopy(removedRequestFields),
    addedRequestFields: sortedCopy(addedRequestFields),
    changedRequestFieldTypes: sortedCopy(changedRequestFieldTypes),
    removedResponseFields: sortedCopy(removedResponseFields),
    changedResponseFieldTypes: sortedCopy(changedResponseFieldTypes)
  };
}
