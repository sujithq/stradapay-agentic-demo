import { describe, expect, it } from "vitest";
import { buildDemoReport } from "../src/demo.js";
import { PayrollRecord } from "../src/types.js";

describe("buildDemoReport", () => {
  it("summarizes accepted and held synthetic payroll records", () => {
    const records: PayrollRecord[] = [
      {
        employeeRef: "DEMO-1234",
        countryCode: "NVR",
        grossPay: 6000,
        deductions: 1000,
        netPay: 5000
      },
      {
        employeeRef: "DEMO-5678",
        countryCode: "NVR",
        grossPay: 14000,
        deductions: 1000,
        netPay: 13000
      }
    ];

    const report = buildDemoReport(records);

    expect(report).toContain("ACCEPTED: Record *****1234 is valid for processing.");
    expect(report).toContain(
      "HELD: Record *****5678 needs review: Net payment is outside the configured range."
    );
    expect(report.at(-1)).toBe("Outcome: 1 accepted, 1 held for review.");
    expect(report.join("\n")).not.toContain("DEMO-1234");
    expect(report.join("\n")).not.toContain("DEMO-5678");
  });
});