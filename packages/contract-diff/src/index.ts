import { diffSummaries } from "@ngx-contract-kit/core";
import type { ContractSummary } from "@ngx-contract-kit/core";

export type ContractDiffResult = ReturnType<typeof diffSummaries>;
export type ContractDiffIssueCode =
  | "removed_endpoint"
  | "changed_signature"
  | "removed_response_status"
  | "removed_request_field"
  | "added_required_request_field"
  | "changed_request_field_type"
  | "removed_response_field"
  | "changed_response_field_type";

export type ContractDiffIssue = {
  code: ContractDiffIssueCode;
  message: string;
};

export type ContractDiffReport = {
  breaking: boolean;
  issueCount: number;
  issues: ContractDiffIssue[];
};

export function compareContractSummaries(
  previousSummary: ContractSummary,
  currentSummary: ContractSummary
): ContractDiffResult {
  return diffSummaries(previousSummary, currentSummary);
}

export function createContractDiffReport(diff: ContractDiffResult): ContractDiffReport {
  const issues: ContractDiffIssue[] = [];

  for (const removed of diff.removed) {
    issues.push({
      code: "removed_endpoint",
      message: `Removed endpoint: ${removed}`
    });
  }
  for (const changed of diff.changedSignatures) {
    issues.push({
      code: "changed_signature",
      message: `Changed endpoint signature: ${changed}`
    });
  }
  for (const removedStatus of diff.removedResponseStatuses) {
    issues.push({
      code: "removed_response_status",
      message: `Removed response status: ${removedStatus}`
    });
  }
  for (const removedFields of diff.removedRequestFields) {
    issues.push({
      code: "removed_request_field",
      message: `Removed request field: ${removedFields}`
    });
  }
  for (const addedFields of diff.addedRequestFields) {
    issues.push({
      code: "added_required_request_field",
      message: `Added required request field: ${addedFields}`
    });
  }
  for (const changedTypes of diff.changedRequestFieldTypes) {
    issues.push({
      code: "changed_request_field_type",
      message: `Changed request field type: ${changedTypes}`
    });
  }
  for (const removedFields of diff.removedResponseFields) {
    issues.push({
      code: "removed_response_field",
      message: `Removed response field: ${removedFields}`
    });
  }
  for (const changedTypes of diff.changedResponseFieldTypes) {
    issues.push({
      code: "changed_response_field_type",
      message: `Changed response field type: ${changedTypes}`
    });
  }

  return {
    breaking: diff.breaking,
    issueCount: issues.length,
    issues
  };
}

export function formatContractDiffReport(diff: ContractDiffResult): string[] {
  if (!diff.breaking) {
    return ["No breaking changes detected."];
  }

  const report = createContractDiffReport(diff);
  const lines: string[] = ["Breaking changes detected:"];
  for (const issue of report.issues) {
    lines.push(`- ${issue.message}`);
  }
  return lines;
}
