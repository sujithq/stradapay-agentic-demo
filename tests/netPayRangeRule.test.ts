import { describe, expect, it } from "vitest";
import { buildOperatorMessage, validateNetPayRange, PayrollRecord } from "../src/index.js";

const policy = { minNetPay: 1000, maxNetPay: 10000 };

const validRecord: PayrollRecord = {
  employeeRef: "EMP-123456",
  countryCode: "FRA",
  grossPay: 6500,
  deductions: 1200,
  netPay: 5300
};

describe("validateNetPayRange", () => {
  it("accepts records in range", () => {
    const result = validateNetPayRange(validRecord, policy);
    expect(result.isValid).toBe(true);
  });

  it("flags records outside configured range", () => {
    const result = validateNetPayRange({ ...validRecord, netPay: 15000 }, policy);
    expect(result.isValid).toBe(false);
    expect(result.reasonCode).toBe("INVALID_RANGE");
  });

  it("masks employee reference in operator messages", () => {
    const result = validateNetPayRange({ ...validRecord, netPay: 12000 }, policy);
    const message = buildOperatorMessage(validRecord, result);
    expect(message).toContain("3456");
    expect(message).not.toContain("EMP-123456");
  });
});