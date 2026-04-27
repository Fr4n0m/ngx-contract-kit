import { describe, expect, it } from "vitest";
import { generateTypeScriptModels } from "./index";

describe("generateTypeScriptModels", () => {
  it("generates namespaced contract model keys", () => {
    const output = generateTypeScriptModels({
      "users.contract.json": {
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "string" },
          response: { "200": { id: "string" } }
        }
      }
    });

    expect(output).toContain('"users.getUser": {');
    expect(output).toContain('params: {\n  id: string;\n};');
  });

  it("keeps generated typescript models deterministic", () => {
    const output = generateTypeScriptModels({
      "users.contract.json": {
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "string" },
          response: { "200": { id: "string" }, "404": { message: "string" } }
        },
        updateUser: {
          method: "PUT",
          path: "/users/:id",
          params: { id: "string" },
          body: { email: "string" },
          response: { "200": { id: "string", email: "string" } }
        }
      }
    });

    expect(output).toMatchSnapshot("contract-model");
  });
});
