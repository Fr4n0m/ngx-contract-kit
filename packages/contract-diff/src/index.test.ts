import { describe, expect, it } from "vitest";
import { compareContractSummaries, createContractDiffReport, formatContractDiffReport } from "./index";

const baseEndpoint = {
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
  responseSignatures: { "200": ["id:string", "name:string"] }
};

const makeSummary = (endpoints: typeof baseEndpoint[]) => ({
  version: 2 as const,
  endpoints
});

describe("compareContractSummaries", () => {
  it("returns non-breaking result for identical summaries", () => {
    const summary = makeSummary([baseEndpoint]);
    const diff = compareContractSummaries(summary, summary);
    expect(diff.breaking).toBe(false);
    expect(createContractDiffReport(diff)).toEqual({ breaking: false, issueCount: 0, issues: [] });
    expect(formatContractDiffReport(diff)).toEqual(["No breaking changes detected."]);
  });

  it("detects removed_endpoint", () => {
    const previous = makeSummary([baseEndpoint]);
    const current = makeSummary([]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issueCount).toBe(1);
    expect(report.issues[0]?.code).toBe("removed_endpoint");
    expect(report.issues[0]?.message).toContain("Removed endpoint:");
  });

  it("detects changed_signature (method change)", () => {
    const previous = makeSummary([baseEndpoint]);
    const current = makeSummary([{ ...baseEndpoint, method: "POST" as const }]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issues.some(i => i.code === "changed_signature")).toBe(true);
    expect(report.issues.find(i => i.code === "changed_signature")?.message).toContain("Changed endpoint signature:");
  });

  it("detects changed_signature (path change)", () => {
    const previous = makeSummary([baseEndpoint]);
    const current = makeSummary([{ ...baseEndpoint, path: "/users/:userId" }]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.issues.some(i => i.code === "changed_signature")).toBe(true);
  });

  it("detects removed_response_status", () => {
    const previous = makeSummary([{ ...baseEndpoint, responseStatusCodes: ["200", "404"] }]);
    const current = makeSummary([{ ...baseEndpoint, responseStatusCodes: ["200"] }]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issues.some(i => i.code === "removed_response_status")).toBe(true);
    expect(report.issues.find(i => i.code === "removed_response_status")?.message).toContain("Removed response status:");
  });

  it("detects removed_request_field (body)", () => {
    const previous = makeSummary([{ ...baseEndpoint, bodyFields: ["email", "name"], bodySignatures: ["email:string", "name:string"] }]);
    const current = makeSummary([{ ...baseEndpoint, bodyFields: ["name"], bodySignatures: ["name:string"] }]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issues.some(i => i.code === "removed_request_field")).toBe(true);
    expect(report.issues.find(i => i.code === "removed_request_field")?.message).toContain("Removed request field:");
  });

  it("detects added_required_request_field (body)", () => {
    const previous = makeSummary([{ ...baseEndpoint, bodyFields: ["name"], bodySignatures: ["name:string"] }]);
    const current = makeSummary([{ ...baseEndpoint, bodyFields: ["name", "email"], bodySignatures: ["name:string", "email:string"] }]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issues.some(i => i.code === "added_required_request_field")).toBe(true);
    expect(report.issues.find(i => i.code === "added_required_request_field")?.message).toContain("Added required request field:");
  });

  it("detects changed_request_field_type (param)", () => {
    const previous = makeSummary([baseEndpoint]);
    const current = makeSummary([{ ...baseEndpoint, paramsSignatures: ["id:number"] }]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issues.some(i => i.code === "changed_request_field_type")).toBe(true);
    expect(report.issues.find(i => i.code === "changed_request_field_type")?.message).toContain("Changed request field type:");
  });

  it("detects removed_response_field", () => {
    const previous = makeSummary([baseEndpoint]);
    const current = makeSummary([{ ...baseEndpoint, responseSignatures: { "200": ["id:string"] } }]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issues.some(i => i.code === "removed_response_field")).toBe(true);
    expect(report.issues.find(i => i.code === "removed_response_field")?.message).toContain("Removed response field:");
  });

  it("detects changed_response_field_type", () => {
    const previous = makeSummary([baseEndpoint]);
    const current = makeSummary([{ ...baseEndpoint, responseSignatures: { "200": ["id:number", "name:string"] } }]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issues.some(i => i.code === "changed_response_field_type")).toBe(true);
    expect(report.issues.find(i => i.code === "changed_response_field_type")?.message).toContain("Changed response field type:");
  });

  it("formatContractDiffReport lists all issues when breaking", () => {
    const previous = makeSummary([baseEndpoint]);
    const current = makeSummary([]);
    const diff = compareContractSummaries(previous, current);
    const lines = formatContractDiffReport(diff);
    expect(lines[0]).toBe("Breaking changes detected:");
    expect(lines.length).toBeGreaterThan(1);
    expect(lines.some(l => l.startsWith("- "))).toBe(true);
  });

  it("report accumulates multiple issue types in one diff", () => {
    const previous = makeSummary([
      baseEndpoint,
      { ...baseEndpoint, name: "deleteUser", path: "/users/:id/delete" }
    ]);
    const current = makeSummary([
      { ...baseEndpoint, responseSignatures: { "200": ["id:number", "name:string"] } }
    ]);
    const diff = compareContractSummaries(previous, current);
    const report = createContractDiffReport(diff);
    expect(report.breaking).toBe(true);
    expect(report.issueCount).toBeGreaterThanOrEqual(2);
  });
});
