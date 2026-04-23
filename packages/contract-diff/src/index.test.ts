import { describe, expect, it } from "vitest";
import { compareContractSummaries, createContractDiffReport, formatContractDiffReport } from "./index";

describe("compareContractSummaries", () => {
  it("returns non-breaking result for same summaries", () => {
    const summary = {
      version: 2 as const,
      endpoints: [
        {
          file: "users.contract.json",
          name: "getUser",
          method: "GET" as const,
          path: "/users/:id",
          paramsFields: ["id"],
          paramsSignatures: ["id:string"],
          queryFields: [],
          querySignatures: [],
          bodyFields: [],
          bodySignatures: [],
          responseStatusCodes: ["200"],
          responseSignatures: { "200": ["id:string"] }
        }
      ]
    };

    const diff = compareContractSummaries(summary, summary);
    expect(diff.breaking).toBe(false);
    expect(createContractDiffReport(diff)).toEqual({
      breaking: false,
      issueCount: 0,
      issues: []
    });
    expect(formatContractDiffReport(diff)).toEqual(["No breaking changes detected."]);
  });

  it("creates structured report for breaking changes", () => {
    const previous = {
      version: 2 as const,
      endpoints: [
        {
          file: "users.contract.json",
          name: "getUser",
          method: "GET" as const,
          path: "/users/:id",
          paramsFields: ["id"],
          paramsSignatures: ["id:string"],
          queryFields: [],
          querySignatures: [],
          bodyFields: [],
          bodySignatures: [],
          responseStatusCodes: ["200"],
          responseSignatures: { "200": ["id:string"] }
        }
      ]
    };
    const current = {
      ...previous,
      endpoints: []
    };

    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issueCount).toBe(1);
    expect(report.issues[0]?.code).toBe("removed_endpoint");
    expect(report.issues[0]?.message).toContain("Removed endpoint:");
  });
});
