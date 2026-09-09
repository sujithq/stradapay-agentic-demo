# StradaPay Agentic Demo Project

This repository is a synthetic project prepared for the Strada executive GitHub Copilot demonstration.

## Quick start

```powershell
npm install
npm run build
npm test
npm run demo
```

The demo processes a small synthetic payroll batch and prints accepted and held outcomes using operator-safe messages. No external services or real payroll data are used.

## Development environment

- Use Node.js 22, as pinned in `.nvmrc`.
- The project-level `.npmrc` uses the Microsoft package feed proxy and saves exact dependency versions.
- Local `.env` files are ignored. Add a tracked `.env.example` if runtime configuration is introduced.
- EditorConfig and Git attributes keep indentation and line endings consistent across operating systems.

## Suggested live task

Add or update payroll exception handling for a fictional country's net payment thresholds and verify:

1. validation logic changes
2. operator message safety
3. tests and docs update

The baseline fictional country is Novara (`NVR`), with an inclusive net payment range of 1,500-12,000. See [the operator guide](docs/operator-guide.md) for exception handling.

The [product requirement](docs/product-requirement.md) captures the business rationale, product-owner request, acceptance criteria, human-review gate, and executive-visible outcome.

## Pull-request controls

Pull requests run the TypeScript build and tests through GitHub Actions. Repository administrators must protect `main` in GitHub settings by requiring the `validate` status check and at least one approving review.