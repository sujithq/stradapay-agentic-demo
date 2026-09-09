import { PayrollRecord, ValidationResult } from "../types.js";
import { loadCountryPolicies } from "../services/countryPolicyLoader.js";

export type CountryPolicy = {
  readonly minNetPay: number;
  readonly maxNetPay: number;
};

export const countryPolicies = loadCountryPolicies();

export function validateNetPayRange(record: Partial<PayrollRecord>): ValidationResult {
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

  const policy = countryPolicies[record.countryCode];
  if (!policy) {
    return {
      isValid: false,
      reasonCode: "UNSUPPORTED_COUNTRY",
      message: "Payroll record uses an unsupported country policy."
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