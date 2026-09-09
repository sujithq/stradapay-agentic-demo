# StradaPay demo architecture

This synthetic repository models a small payroll validation component used for the live executive demo.

## Components

- `src/rules/netPayRangeRule.ts`: validation logic with explicit country policy input
- `src/services/exceptionFormatter.ts`: operator-safe explanations with masked identifiers
- `tests/netPayRangeRule.test.ts`: baseline tests that should remain green during live edits

## Demo guardrails

- Synthetic data only
- No deployment automation in this demo
- Human approval gate assumed at pull-request stage