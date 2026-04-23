import { describe, expect, it } from "vitest";
import { createZodSchemaFromShape, generateZodSchemasSource } from "./index";

describe("createZodSchemaFromShape", () => {
  it("validates payloads using contract scalar types", () => {
    const schema = createZodSchemaFromShape({
      id: "string",
      age: "number",
      active: "boolean"
    });

    expect(schema.safeParse({ id: "u1", age: 20, active: true }).success).toBe(true);
    expect(schema.safeParse({ id: "u1", age: "20", active: true }).success).toBe(false);
  });
});

describe("generateZodSchemasSource", () => {
  it("renders source with namespaced endpoint keys", () => {
    const source = generateZodSchemasSource({
      "users.contract.json": {
        getUser: {
          method: "GET",
          path: "/users/:id",
          params: { id: "string" },
          response: { "200": { id: "string" }, "404": { message: "string" } }
        }
      }
    });

    expect(source).toContain('export const zodSchemas = {');
    expect(source).toContain('"users.getUser": {');
    expect(source).toContain("params: z.object({");
    expect(source).toContain("id: z.string()");
    expect(source).toContain('response: {');
    expect(source).toContain('"200": z.object({');
    expect(source).toContain('"404": z.object({');
  });

  it("keeps generated zod schemas deterministic", () => {
    const source = generateZodSchemasSource({
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

    expect(source).toMatchSnapshot("zod-schemas");
  });
});
