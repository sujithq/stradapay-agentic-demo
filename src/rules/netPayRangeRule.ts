import { PayrollRecord, ValidationResult } from "../types.js";

export type CountryPolicy = {
  minNetPay: number;
  maxNetPay: number;
};

export function validateNetPayRange(
  record: Partial<PayrollRecord>,
  policy: CountryPolicy
): ValidationResult {
  if (
    !record.employeeRef ||
    !record.countryCode ||
    record.netPay === undefined ||
    Number.isNaN(record.netPay)
  ) {
    return {
      isValid: false,
      reasonCode: "MISSING_FIELD",
      message: "Payroll record is missing required fields for validation."
    };
  }

  if (record.netPay < policy.minNetPay || record.netPay > policy.maxNetPay) {
    return {
      isValid: false,
      reasonCode: "INVALID_RANGE",
      message: "Net payment is outside the configured range."
    };
  }

  return {
    isValid: true,
    message: "Payroll record passed net payment range validation."
  };
}