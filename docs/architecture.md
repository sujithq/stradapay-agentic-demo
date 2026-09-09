# StradaPay demo architecture

This synthetic repository models a small payroll validation component used for the live executive demo.

## Components

- `src/rules/netPayRangeRule.ts`: country policy registry and inclusive net payment validation
- `src/services/exceptionFormatter.ts`: operator-safe explanations with masked identifiers
- `src/demo.ts`: runnable synthetic batch outcome for the executive demonstration
- `tests/netPayRangeRule.test.ts`: baseline tests that should remain green during live edits
- `tests/demo.test.ts`: visible-outcome and disclosure-safety tests
- `docs/operator-guide.md`: rule catalogue and operator response guidance

## Validation flow

1. Reject records missing the employee reference, country code, or numeric net payment.
2. Resolve the country policy from the record's country code.
3. Reject unsupported countries without exposing employee-sensitive fields.
4. Validate net payment against the country's inclusive range.
5. Format a safe message for the operator.

## Demo guardrails

- Synthetic data only
- No deployment automation in this demo
- Pull requests run the TypeScript build and automated tests in GitHub Actions.
- Protect `main` in GitHub settings by requiring the `validate` status check and at least one approval.