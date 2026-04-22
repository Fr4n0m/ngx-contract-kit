import { describe, expect, it } from "vitest";
import { createSummary, diffSummaries, generateAngularClientFile, generateContractModelFile, validateContract } from "./index";

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
          queryFields: [],
          bodyFields: [],
          responseStatusCodes: ["200", "404"]
        },
        {
          file: "users.contract.json",
          name: "listUsers",
          method: "GET" as const,
          path: "/users",
          paramsFields: [],
          queryFields: [],
          bodyFields: [],
          responseStatusCodes: ["200"]
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
          queryFields: [],
          bodyFields: [],
          responseStatusCodes: ["200"]
        }
      ]
    };

    const diff = diffSummaries(previous, current);
    expect(diff.breaking).toBe(true);
    expect(diff.removed).toEqual(["GET /users/:id (users.contract.json:getUser)"]);
    expect(diff.changedSignatures).toEqual([]);
    expect(diff.removedResponseStatuses).toEqual([]);
    expect(diff.removedRequestFields).toEqual([]);
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
          queryFields: ["expand"],
          bodyFields: [],
          responseStatusCodes: ["200", "404"]
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
          queryFields: [],
          bodyFields: [],
          responseStatusCodes: ["200"]
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

    expect(output).toContain('"getUser": {');
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

    expect(output).toContain("export type GetUserRequest");
    expect(output).toContain('ContractModel["getUser"]["params"]');
    expect(output).toContain("export class ContractKitClient");
    expect(output).toContain('getUser(input: GetUserRequest): Observable<GetUserResponse>');
    expect(output).toContain('return this.request<GetUserResponse>("GET", "/users/:id", input);');
  });
});
