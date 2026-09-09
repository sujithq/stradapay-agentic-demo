export type PayrollRecord = {
  employeeRef: string;
  countryCode: string;
  grossPay: number;
  deductions: number;
  netPay: number;
};

export type ValidationResult = {
  isValid: boolean;
  reasonCode?: "MISSING_FIELD" | "UNSUPPORTED_COUNTRY" | "INVALID_RANGE";
  message: string;
};