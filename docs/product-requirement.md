# Product requirement: Novara payroll exception rule

## Business context

StradaPay operators review payroll records that cannot proceed automatically. Before supporting the fictional country Novara, the product needs a consistent rule that identifies unusual net payments and explains the hold without exposing employee-sensitive data.

All countries, records, values, and identifiers in this repository are synthetic.

## Product-owner request

As a StradaPay payroll operator, I need Novara payroll records outside the approved net payment range to be held with a safe explanation, so that I can route exceptions for human review without disclosing employee-sensitive fields.

## Acceptance criteria

1. A Novara record uses country code `NVR`.
2. Net payments from 1,500 through 12,000 are accepted, including both boundaries.
3. Net payments outside that range are held with reason code `INVALID_RANGE`.
4. Records with missing required fields are held with reason code `MISSING_FIELD`.
5. Records for unconfigured countries are held with reason code `UNSUPPORTED_COUNTRY`.
6. Operator messages never include a full employee reference, gross pay, or deductions.
7. Automated tests cover accepted, rejected, boundary, malformed, unsupported-country, and privacy cases.
8. The operator guide describes the rule and review action.
9. The pull request passes the `validate` status check and receives at least one human approval.
10. Country ranges are loaded from validated JSON configuration at startup.
11. Missing, empty, malformed, or reversed-range configuration prevents processing.

## Executive-visible outcome

Running `npm run demo` shows a synthetic batch with accepted and held totals plus privacy-safe operator explanations. The result demonstrates the product requirement without connecting to payroll systems or using real employee data.