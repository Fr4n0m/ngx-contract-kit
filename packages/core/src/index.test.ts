import { describe, expect, it } from "vitest";
import { createSummary, diffSummaries, generateContractModelFile, validateContract } from "./index";

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
      version: 1 as const,
      endpoints: [
        { file: "users.contract.json", name: "getUser", method: "GET" as const, path: "/users/:id" },
        { file: "users.contract.json", name: "listUsers", method: "GET" as const, path: "/users" }
      ]
    };
    const current = {
      version: 1 as const,
      endpoints: [{ file: "users.contract.json", name: "listUsers", method: "GET" as const, path: "/users" }]
    };

    const diff = diffSummaries(previous, current);
    expect(diff.breaking).toBe(true);
    expect(diff.removed).toEqual(["GET /users/:id"]);
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
