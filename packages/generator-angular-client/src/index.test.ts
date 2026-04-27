import { describe, expect, it } from "vitest";
import { generateAngularClient } from "./index";

describe("generateAngularClient", () => {
  it("renders namespaced methods", () => {
    const output = generateAngularClient({
      "users.contract.json": {
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "string" },
          response: { "200": { id: "string" } }
        }
      }
    });

    expect(output).toContain("users_getUser(input: UsersGetUserRequest)");
    expect(output).toContain('return this.request<UsersGetUserResponse>("GET", "/users/:id", input);');
  });

  it("keeps generated angular client deterministic", () => {
    const output = generateAngularClient({
      "users.contract.json": {
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "string" },
          response: { "200": { id: "string" }, "404": { message: "string" } }
        },
        listUsers: {
          method: "GET",
          path: "/users",
          query: { page: "number" },
          response: { "200": { items: "unknown" } }
        }
      }
    });

    expect(output).toMatchSnapshot("angular-client");
  });
});
