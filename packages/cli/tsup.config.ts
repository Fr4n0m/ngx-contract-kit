import { defineConfig } from "tsup";

const workspacePackages = [
  "@fr4n0m/core",
  "@fr4n0m/contract-diff",
  "@fr4n0m/mock-generator",
  "@fr4n0m/validator-zod",
  "@fr4n0m/plugin-nestjs",
  "@fr4n0m/generator-typescript",
  "@fr4n0m/generator-angular-client",
];

export default defineConfig([
  {
    entry: { bin: "src/bin.ts" },
    format: ["cjs"],
    outDir: "dist",
    bundle: true,
    noExternal: workspacePackages,
    external: ["zod"],
    platform: "node",
    target: "node18",
  },
  {
    entry: {
      core: "src/core.ts",
      diff: "src/diff.ts",
      mock: "src/mock.ts",
      zod: "src/zod.ts",
      nestjs: "src/nestjs.ts",
      "generator-ts": "src/generator-ts.ts",
      "generator-angular": "src/generator-angular.ts",
    },
    format: ["cjs", "esm"],
    outDir: "dist",
    dts: true,
    noExternal: workspacePackages,
    external: ["zod"],
    platform: "node",
    target: "node18",
    splitting: true,
  },
]);
