import { describe, expect, it } from "vitest";
import { buildOperatorMessage, validateNetPayRange, PayrollRecord } from "../src/index.js";

const validRecord: PayrollRecord = {
  employeeRef: "EMP-123456",
  countryCode: "NVR",
  grossPay: 6500,
  deductions: 1200,
  netPay: 5300
};

describe("validateNetPayRange", () => {
  it("accepts records in range", () => {
    const result = validateNetPayRange(validRecord);
    expect(result.isValid).toBe(true);
  });

  it.each([1500, 12000])("includes the %i boundary", (netPay) => {
    const result = validateNetPayRange({ ...validRecord, netPay });
    expect(result.isValid).toBe(true);
  });

  it.each([1499, 12001])("flags %i as outside the configured range", (netPay) => {
    const result = validateNetPayRange({ ...validRecord, netPay });
    expect(result.isValid).toBe(false);
    expect(result.reasonCode).toBe("INVALID_RANGE");
  });

  it("flags unsupported countries", () => {
    const result = validateNetPayRange({ ...validRecord, countryCode: "ZZZ" });
    expect(result.isValid).toBe(false);
    expect(result.reasonCode).toBe("UNSUPPORTED_COUNTRY");
  });

  it.each([
    { ...validRecord, employeeRef: undefined },
    { ...validRecord, countryCode: undefined },
    { ...validRecord, netPay: undefined },
    { ...validRecord, netPay: Number.NaN }
  ])("flags missing or invalid required fields", (record) => {
    const result = validateNetPayRange(record);
    expect(result.isValid).toBe(false);
    expect(result.reasonCode).toBe("MISSING_FIELD");
  });

  it("masks employee reference in operator messages", () => {
    const result = validateNetPayRange({ ...validRecord, netPay: 12001 });
    const message = buildOperatorMessage(validRecord, result);
    expect(message).toContain("3456");
    expect(message).not.toContain("EMP-123456");
  });

  it("does not expose the employee reference for unsupported countries", () => {
    const result = validateNetPayRange({ ...validRecord, countryCode: "ZZZ" });
    const message = buildOperatorMessage(validRecord, result);
    expect(message).toBe("Validation failed because the payroll country is not supported.");
    expect(message).not.toContain(validRecord.employeeRef);
  });

  it("does not expose the employee reference for missing fields", () => {
    const result = validateNetPayRange({ ...validRecord, netPay: undefined });
    const message = buildOperatorMessage(validRecord, result);
    expect(message).toBe("Validation failed because required payroll fields are missing.");
    expect(message).not.toContain(validRecord.employeeRef);
  });
});