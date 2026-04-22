import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  createSummary,
  diffSummaries,
  generateAngularClientFile,
  generateContractModelFile,
  readProjectConfig,
  validateContract,
  writeGeneratedArtifacts
} from "./index";

describe("validateContract", () => {
  it("accepts a valid contract", () => {
    expect(() =>
      validateContract({
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "string" },
          query: { includePosts: "boolean" },
          response: {
            "200": { id: "string", name: "string" },
            "404": { message: "string" }
          }
        }
      })
    ).not.toThrow();
  });

  it("rejects an invalid method", () => {
    expect(() =>
      validateContract({
        getUser: { method: "FETCH", path: "/users/:id" }
      })
    ).toThrow(/method/);
  });

  it("rejects invalid response status code keys", () => {
    expect(() =>
      validateContract({
        getUser: {
          method: "GET",
          path: "/users/:id",
          response: {
            ok: { id: "string" }
          }
        }
      })
    ).toThrow(/status code/);
  });

  it("rejects invalid shape types", () => {
    expect(() =>
      validateContract({
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "uuid" }
        }
      })
    ).toThrow(/type must be one of/);
  });
});

describe("createSummary", () => {
  it("sorts endpoints by method and path", () => {
    const summary = createSummary({
      "b.contract.json": {
        postUser: { method: "POST", path: "/users" }
      },
      "a.contract.json": {
        getUser: { method: "GET", path: "/users/:id" }
      }
    });

    expect(summary.endpoints.map((e) => `${e.method} ${e.path}`)).toEqual(["GET /users/:id", "POST /users"]);
  });
});

describe("diffSummaries", () => {
  it("detects removed endpoints as breaking", () => {
    const previous = {
      version: 2 as const,
      endpoints: [
        {
          file: "users.contract.json",
          name: "getUser",
          method: "GET" as const,
          path: "/users/:id",
          paramsFields: ["id"],
          paramsSignatures: ["id:string"],
          queryFields: [],
          querySignatures: [],
          bodyFields: [],
          bodySignatures: [],
          responseStatusCodes: ["200", "404"]
          ,
          responseSignatures: {
            "200": ["id:string"],
            "404": ["message:string"]
          }
        },
        {
          file: "users.contract.json",
          name: "listUsers",
          method: "GET" as const,
          path: "/users",
          paramsFields: [],
          paramsSignatures: [],
          queryFields: [],
          querySignatures: [],
          bodyFields: [],
          bodySignatures: [],
          responseStatusCodes: ["200"]
          ,
          responseSignatures: {
            "200": ["items:unknown"]
          }
        }
      ]
    };
    const current = {
      version: 2 as const,
      endpoints: [
        {
          file: "users.contract.json",
          name: "listUsers",
          method: "GET" as const,
          path: "/users",
          paramsFields: [],
          paramsSignatures: [],
          queryFields: [],
          querySignatures: [],
          bodyFields: [],
          bodySignatures: [],
          responseStatusCodes: ["200"]
          ,
          responseSignatures: {
            "200": ["items:unknown"]
          }
        }
      ]
    };

    const diff = diffSummaries(previous, current);
    expect(diff.breaking).toBe(true);
    expect(diff.removed).toEqual(["GET /users/:id (users.contract.json:getUser)"]);
    expect(diff.changedSignatures).toEqual([]);
    expect(diff.removedResponseStatuses).toEqual([]);
    expect(diff.removedRequestFields).toEqual([]);
    expect(diff.addedRequestFields).toEqual([]);
    expect(diff.changedRequestFieldTypes).toEqual([]);
    expect(diff.removedResponseFields).toEqual([]);
    expect(diff.changedResponseFieldTypes).toEqual([]);
  });

  it("detects signature/status/field removals as breaking", () => {
    const previous = {
      version: 2 as const,
      endpoints: [
        {
          file: "users.contract.json",
          name: "getUser",
          method: "GET" as const,
          path: "/users/:id",
          paramsFields: ["id"],
          paramsSignatures: ["id:string"],
          queryFields: ["expand"],
          querySignatures: ["expand:boolean"],
          bodyFields: [],
          bodySignatures: [],
          responseStatusCodes: ["200", "404"]
          ,
          responseSignatures: {
            "200": ["id:string"],
            "404": ["message:string"]
          }
        }
      ]
    };
    const current = {
      version: 2 as const,
      endpoints: [
        {
          file: "users.contract.json",
          name: "getUser",
          method: "POST" as const,
          path: "/users/find",
          paramsFields: [],
          paramsSignatures: [],
          queryFields: [],
          querySignatures: [],
          bodyFields: [],
          bodySignatures: [],
          responseStatusCodes: ["200"]
          ,
          responseSignatures: {
            "200": ["id:string"]
          }
        }
      ]
    };

    const diff = diffSummaries(previous, current);
    expect(diff.breaking).toBe(true);
    expect(diff.removed).toEqual([]);
    expect(diff.changedSignatures).toEqual([
      "users.contract.json:getUser (GET /users/:id -> POST /users/find)"
    ]);
    expect(diff.removedResponseStatuses).toEqual(["users.contract.json:getUser (404)"]);
    expect(diff.removedRequestFields).toEqual([
      "users.contract.json:getUser (params: id | query: expand)"
    ]);
    expect(diff.addedRequestFields).toEqual([]);
    expect(diff.changedRequestFieldTypes).toEqual([]);
    expect(diff.removedResponseFields).toEqual([]);
    expect(diff.changedResponseFieldTypes).toEqual([]);
  });

  it("detects added required request fields and field type changes", () => {
    const previous = {
      version: 2 as const,
      endpoints: [
        {
          file: "users.contract.json",
          name: "updateUser",
          method: "PUT" as const,
          path: "/users/:id",
          paramsFields: ["id"],
          paramsSignatures: ["id:string"],
          queryFields: [],
          querySignatures: [],
          bodyFields: ["name"],
          bodySignatures: ["name:string"],
          responseStatusCodes: ["200"],
          responseSignatures: {
            "200": ["id:string", "name:string"]
          }
        }
      ]
    };
    const current = {
      version: 2 as const,
      endpoints: [
        {
          file: "users.contract.json",
          name: "updateUser",
          method: "PUT" as const,
          path: "/users/:id",
          paramsFields: ["id"],
          paramsSignatures: ["id:number"],
          queryFields: [],
          querySignatures: [],
          bodyFields: ["name", "email"],
          bodySignatures: ["email:string", "name:string"],
          responseStatusCodes: ["200"],
          responseSignatures: {
            "200": ["id:number"]
          }
        }
      ]
    };

    const diff = diffSummaries(previous, current);
    expect(diff.breaking).toBe(true);
    expect(diff.removed).toEqual([]);
    expect(diff.changedSignatures).toEqual([]);
    expect(diff.removedResponseStatuses).toEqual([]);
    expect(diff.removedRequestFields).toEqual([]);
    expect(diff.addedRequestFields).toEqual([
      "users.contract.json:updateUser (body: email)"
    ]);
    expect(diff.changedRequestFieldTypes).toEqual([
      "users.contract.json:updateUser (params: id: string -> number)"
    ]);
    expect(diff.removedResponseFields).toEqual([
      "users.contract.json:updateUser [200] (name)"
    ]);
    expect(diff.changedResponseFieldTypes).toEqual([
      "users.contract.json:updateUser [200] (id: string -> number)"
    ]);
  });
});

describe("generateContractModelFile", () => {
  it("renders endpoint request and response shapes", () => {
    const output = generateContractModelFile({
      "users.contract.json": {
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "string" },
          query: { includePosts: "boolean" },
          response: {
            "200": { id: "string", age: "number" },
            "404": { message: "string" }
          }
        }
      }
    });

    expect(output).toContain('"users.getUser": {');
    expect(output).toContain('params: {\n  id: string;\n};');
    expect(output).toContain('"200": {\n  id: string;\n  age: number;\n};');
    expect(output).toContain('"404": {\n  message: string;\n};');
  });
});

describe("generateAngularClientFile", () => {
  it("renders typed request/response aliases and client methods", () => {
    const output = generateAngularClientFile({
      "users.contract.json": {
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "string" },
          query: { includePosts: "boolean" },
          response: {
            "200": { id: "string" }
          }
        }
      }
    });

    expect(output).toContain("export type UsersGetUserRequest");
    expect(output).toContain('ContractModel["users.getUser"]["params"]');
    expect(output).toContain("export class ContractKitClient");
    expect(output).toContain('users_getUser(input: UsersGetUserRequest): Observable<UsersGetUserResponse>');
    expect(output).toContain('return this.request<UsersGetUserResponse>("GET", "/users/:id", input);');
  });

  it("namespaces generated keys and methods to avoid collisions", () => {
    const output = generateAngularClientFile({
      "users.contract.json": {
        getOne: { method: "GET", path: "/users/:id", response: { "200": { id: "string" } } }
      },
      "teams.contract.json": {
        getOne: { method: "GET", path: "/teams/:id", response: { "200": { id: "string" } } }
      }
    });

    expect(output).toContain("users_getOne(input: UsersGetOneRequest)");
    expect(output).toContain("teams_getOne(input: TeamsGetOneRequest)");
    expect(output).toContain('ContractModel["users.getOne"]["response"]["200"]');
    expect(output).toContain('ContractModel["teams.getOne"]["response"]["200"]');
  });
});

describe("readProjectConfig", () => {
  it("returns defaults when config is missing", () => {
    const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ckit-config-missing-"));
    try {
      const config = readProjectConfig(projectRoot);
      expect(config.contractsDir).toBe("contracts");
      expect(config.outputDir).toBe("generated");
    } finally {
      fs.rmSync(projectRoot, { recursive: true, force: true });
    }
  });

  it("reads custom config when present", () => {
    const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ckit-config-custom-"));
    try {
      const configPath = path.join(projectRoot, "ngx-contract-kit.config.json");
      fs.writeFileSync(
        configPath,
        JSON.stringify({ schemaVersion: 1, contractsDir: "api-contracts", outputDir: "artifacts" }),
        "utf8"
      );
      const config = readProjectConfig(projectRoot);
      expect(config.contractsDir).toBe("api-contracts");
      expect(config.outputDir).toBe("artifacts");
    } finally {
      fs.rmSync(projectRoot, { recursive: true, force: true });
    }
  });

  it("throws when config schemaVersion is invalid", () => {
    const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ckit-config-invalid-"));
    try {
      const configPath = path.join(projectRoot, "ngx-contract-kit.config.json");
      fs.writeFileSync(
        configPath,
        JSON.stringify({ schemaVersion: 2, contractsDir: "contracts", outputDir: "generated" }),
        "utf8"
      );
      expect(() => readProjectConfig(projectRoot)).toThrow(/schemaVersion/);
    } finally {
      fs.rmSync(projectRoot, { recursive: true, force: true });
    }
  });
});

describe("writeGeneratedArtifacts", () => {
  it("writes files into custom output directory", () => {
    const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ckit-output-dir-"));
    try {
      const contractsByFile = {
        "users.contract.json": {
          getUser: { method: "GET" as const, path: "/users/:id" }
        }
      };
      const summary = createSummary(contractsByFile);
      writeGeneratedArtifacts(projectRoot, summary, contractsByFile, "artifacts");

      const summaryPath = path.join(projectRoot, "artifacts", "summary.json");
      const angularClientPath = path.join(projectRoot, "artifacts", "angular-client.ts");
      expect(fs.existsSync(summaryPath)).toBe(true);
      expect(fs.existsSync(angularClientPath)).toBe(true);
    } finally {
      fs.rmSync(projectRoot, { recursive: true, force: true });
    }
  });
});
