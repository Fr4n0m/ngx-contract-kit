import { describe, expect, it } from "vitest";
import {
  createNestModelFromContracts,
  createNestRouteTable,
  defineNestHandlers,
  generateNestHandlersStubSource,
  generateNestControllerSource,
  type NestHandlerMap
} from "./index";

type DemoModel = {
  "users.getUser": {
    method: "GET";
    path: "/users/:id";
    params: { id: string };
    query: { includePosts: boolean };
    body: undefined;
    response: {
      "200": { id: string; email: string };
      "404": { message: string };
    };
  };
  "users.updateUser": {
    method: "PUT";
    path: "/users/:id";
    params: { id: string };
    query: undefined;
    body: { email: string };
    response: {
      "200": { id: string; email: string };
    };
  };
};

describe("defineNestHandlers", () => {
  it("returns typed handler map", async () => {
    const handlers: NestHandlerMap<DemoModel> = defineNestHandlers<DemoModel>({
      "users.getUser": async ({ params }) => ({ id: params.id, email: "a@b.com" }),
      "users.updateUser": ({ params, body }) => ({ id: params.id, email: body.email })
    });

    const getUserResult = await handlers["users.getUser"]({
      params: { id: "123" },
      query: { includePosts: false },
      body: undefined
    });

    expect(getUserResult).toEqual({ id: "123", email: "a@b.com" });
  });
});

describe("createNestRouteTable", () => {
  it("returns sorted route metadata", () => {
    const routes = createNestRouteTable<DemoModel>({
      "users.updateUser": {
        method: "PUT",
        path: "/users/:id",
        params: { id: "" },
        query: undefined,
        body: { email: "" },
        response: { "200": { id: "", email: "" } }
      },
      "users.getUser": {
        method: "GET",
        path: "/users/:id",
        params: { id: "" },
        query: { includePosts: false },
        body: undefined,
        response: { "200": { id: "", email: "" }, "404": { message: "" } }
      }
    });

    expect(routes).toEqual([
      { key: "users.getUser", method: "GET", path: "/users/:id" },
      { key: "users.updateUser", method: "PUT", path: "/users/:id" }
    ]);
  });
});

describe("createNestModelFromContracts", () => {
  it("converts contracts into namespaced model entries", () => {
    const model = createNestModelFromContracts({
      "users.contract.json": {
        getUser: { method: "GET", path: "/users/:id", params: { id: "string" } }
      }
    });

    expect(model["users.getUser"]).toEqual({
      method: "GET",
      path: "/users/:id",
      params: { id: "string" },
      query: {},
      body: {},
      response: {}
    });
  });
});

describe("generateNestControllerSource", () => {
  it("renders Nest decorators and method stubs", () => {
    const source = generateNestControllerSource<DemoModel>({
      "users.updateUser": {
        method: "PUT",
        path: "/users/:id",
        params: { id: "" },
        query: undefined,
        body: { email: "" },
        response: { "200": { id: "", email: "" } }
      },
      "users.getUser": {
        method: "GET",
        path: "/users/:id",
        params: { id: "" },
        query: { includePosts: false },
        body: undefined,
        response: { "200": { id: "", email: "" }, "404": { message: "" } }
      }
    });

    expect(source).toContain('import { Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";');
    expect(source).toContain('@Get("/users/:id")');
    expect(source).toContain("users_getUser()");
    expect(source).toContain('@Put("/users/:id")');
    expect(source).toContain("users_updateUser()");
  });
});

describe("generateNestHandlersStubSource", () => {
  it("renders a typed handlers skeleton", () => {
    const source = generateNestHandlersStubSource<DemoModel>({
      "users.updateUser": {
        method: "PUT",
        path: "/users/:id",
        params: { id: "" },
        query: undefined,
        body: { email: "" },
        response: { "200": { id: "", email: "" } }
      },
      "users.getUser": {
        method: "GET",
        path: "/users/:id",
        params: { id: "" },
        query: { includePosts: false },
        body: undefined,
        response: { "200": { id: "", email: "" }, "404": { message: "" } }
      }
    });

    expect(source).toContain("export const handlers = defineNestHandlers<ContractModel>({");
    expect(source).toContain('"users.getUser": async (_input) => {');
    expect(source).toContain("TODO: implement GET /users/:id (users.getUser)");
    expect(source).toContain("export type GeneratedHandlers = NestHandlerMap<ContractModel>;");
  });
});

describe("backend generator snapshots", () => {
  it("keeps nest outputs deterministic", () => {
    const model = createNestModelFromContracts({
      "users.contract.json": {
        getUser: { method: "GET", path: "/users/:id", params: { id: "string" } },
        updateUser: { method: "PUT", path: "/users/:id", body: { email: "string" } }
      }
    });

    expect(generateNestControllerSource(model)).toMatchSnapshot("nest-controller");
    expect(generateNestHandlersStubSource(model)).toMatchSnapshot("nest-handlers");
  });
});
