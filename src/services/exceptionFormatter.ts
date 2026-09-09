import { PayrollRecord, ValidationResult } from "../types.js";

function maskEmployeeRef(employeeRef: string): string {
  if (employeeRef.length <= 4) {
    return "****";
  }

  return `${"*".repeat(employeeRef.length - 4)}${employeeRef.slice(-4)}`;
}

export function buildOperatorMessage(
  record: PayrollRecord,
  result: ValidationResult
): string {
  if (result.isValid) {
    return `Record ${maskEmployeeRef(record.employeeRef)} is valid for processing.`;
  }

  if (result.reasonCode === "MISSING_FIELD") {
    return "Validation failed because required payroll fields are missing.";
  }

  return `Record ${maskEmployeeRef(record.employeeRef)} needs review: ${result.message}`;
}