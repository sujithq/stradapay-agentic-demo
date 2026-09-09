import { buildOperatorMessage } from "./services/exceptionFormatter.js";
import { validateNetPayRange } from "./rules/netPayRangeRule.js";
import { PayrollRecord } from "./types.js";

const syntheticRecords: PayrollRecord[] = [
  {
    employeeRef: "NVR-DEMO-1042",
    countryCode: "NVR",
    grossPay: 6500,
    deductions: 1200,
    netPay: 5300
  },
  {
    employeeRef: "NVR-DEMO-2187",
    countryCode: "NVR",
    grossPay: 15000,
    deductions: 1500,
    netPay: 13500
  },
  {
    employeeRef: "UNK-DEMO-3309",
    countryCode: "ZZZ",
    grossPay: 4800,
    deductions: 900,
    netPay: 3900
  }
];

export function buildDemoReport(records: PayrollRecord[]): string[] {
  const messages = records.map((record) => {
    const result = validateNetPayRange(record);
    const outcome = result.isValid ? "ACCEPTED" : "HELD";
    return `${outcome}: ${buildOperatorMessage(record, result)}`;
  });
  const accepted = messages.filter((message) => message.startsWith("ACCEPTED:")).length;

  return [
    "StradaPay synthetic payroll validation",
    ...messages,
    `Outcome: ${accepted} accepted, ${messages.length - accepted} held for review.`
  ];
}

if (require.main === module) {
  for (const line of buildDemoReport(syntheticRecords)) {
    console.log(line);
  }
}