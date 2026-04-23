import { describe, expect, it } from "vitest";
import { generateMockFromShape, generateMocksFromContracts } from "./index";

describe("generateMockFromShape", () => {
  it("creates deterministic mock values", () => {
    const payload = generateMockFromShape({
      id: "string",
      age: "number",
      active: "boolean",
      meta: "unknown"
    });

    expect(payload).toEqual({
      id: "id_value",
      age: 1,
      active: true,
      meta: null
    });
  });

  it("creates endpoint mocks from contracts including response statuses", () => {
    const mocks = generateMocksFromContracts({
      "users.contract.json": {
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "string" },
          response: {
            "200": { id: "string", active: "boolean" },
            "404": { message: "string" }
          }
        }
      }
    });

    expect(mocks["users.getUser"]).toEqual({
      params: { id: "id_value" },
      query: {},
      body: {},
      responseByStatus: {
        "200": { id: "id_value", active: true },
        "404": { message: "message_value" }
      }
    });
  });
});
