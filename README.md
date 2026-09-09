# StradaPay Agentic Demo Project

This repository is a synthetic project prepared for the Strada executive GitHub Copilot demonstration.

## Quick start

```powershell
npm install
npm run build
npm test
```

## Development environment

- Use Node.js 22, as pinned in `.nvmrc`.
- The project-level `.npmrc` uses the Microsoft package feed proxy and saves exact dependency versions.
- Local `.env` files are ignored. Add a tracked `.env.example` if runtime configuration is introduced.
- EditorConfig and Git attributes keep indentation and line endings consistent across operating systems.

## Suggested live task

Add or update payroll exception handling for country-specific net payment thresholds and verify:

1. validation logic changes
2. operator message safety
3. tests and docs update