import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { runCommand } from "./bin";

function withTempProject(run: (projectRoot: string, logs: string[]) => void): void {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ckit-cli-"));
  const logs: string[] = [];
  try {
    run(projectRoot, logs);
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

describe("cli runCommand", () => {
  it("runs full happy path (init -> generate -> backend -> mock -> check)", () => {
    withTempProject((projectRoot, logs) => {
      const log = (message: string): void => logs.push(message);

      expect(runCommand("init", projectRoot, log)).toBe(0);
      expect(runCommand("generate", projectRoot, log)).toBe(0);
      expect(runCommand("backend", projectRoot, log)).toBe(0);
      expect(runCommand("mock", projectRoot, log)).toBe(0);
      expect(runCommand("validate", projectRoot, log)).toBe(0);
      expect(runCommand("check", projectRoot, log)).toBe(0);

      expect(fs.existsSync(path.join(projectRoot, "generated", "summary.json"))).toBe(true);
      expect(fs.existsSync(path.join(projectRoot, "generated", "angular-client.ts"))).toBe(true);
      expect(fs.existsSync(path.join(projectRoot, "generated", "zod-schemas.ts"))).toBe(true);
      expect(fs.existsSync(path.join(projectRoot, "generated", "nest-controller.ts"))).toBe(true);
      expect(fs.existsSync(path.join(projectRoot, "generated", "nest-handlers.stub.ts"))).toBe(true);
      expect(fs.existsSync(path.join(projectRoot, "generated", "mocks.json"))).toBe(true);
      expect(logs.some((line) => line.includes("No breaking changes detected"))).toBe(true);
      expect(logs.some((line) => line.includes("Contracts are valid"))).toBe(true);
    });
  });

  it("returns exit code 2 for breaking changes", () => {
    withTempProject((projectRoot, logs) => {
      const log = (message: string): void => logs.push(message);
      expect(runCommand("init", projectRoot, log)).toBe(0);
      expect(runCommand("generate", projectRoot, log)).toBe(0);

      const contractPath = path.join(projectRoot, "contracts", "users.contract.json");
      fs.writeFileSync(
        contractPath,
        JSON.stringify(
          {
            getUser: {
              method: "GET",
              path: "/users/:id"
            }
          },
          null,
          2
        ),
        "utf8"
      );

      const code = runCommand("check", projectRoot, log);
      expect(code).toBe(2);
      expect(logs.some((line) => line.includes("Breaking changes detected"))).toBe(true);
    });
  });

  it("supports check --json and --report for CI pipelines", () => {
    withTempProject((projectRoot, logs) => {
      const log = (message: string): void => logs.push(message);
      expect(runCommand("init", projectRoot, log)).toBe(0);
      expect(runCommand("generate", projectRoot, log)).toBe(0);

      const reportPath = "generated/contract-diff.json";
      const code = runCommand("check", projectRoot, log, ["--json", "--report", reportPath]);
      expect(code).toBe(0);

      const reportFilePath = path.join(projectRoot, reportPath);
      expect(fs.existsSync(reportFilePath)).toBe(true);
      const report = JSON.parse(fs.readFileSync(reportFilePath, "utf8")) as {
        breaking: boolean;
        issueCount: number;
      };
      expect(report.breaking).toBe(false);
      expect(report.issueCount).toBe(0);

      const jsonLine = logs.find((line) => line.startsWith("{") && line.endsWith("}"));
      expect(jsonLine).toBeTruthy();
    });
  });
});
