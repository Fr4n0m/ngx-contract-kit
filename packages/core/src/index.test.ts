import { describe, expect, it } from "vitest";
import { createSummary, diffSummaries, validateContract } from "./index";

describe("validateContract", () => {
  it("accepts a valid contract", () => {
    expect(() =>
      validateContract({
        getUser: { method: "GET", path: "/users/:id" }
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
