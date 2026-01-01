# AGENTS

## Coding standards
- Use TypeScript `strict` mode.
- Avoid `any`; prefer explicit, narrow types.

## UX rules
- Design for a medical workstation context.
- Present information as signal → reason → action.
- Do not include PII in demos or sample data.

## Security rules
- Use one-time tokens when required.
- Enforce token expiry.
- Require idempotency keys on commands.

## Testing
- Use Vitest for core functions and ensure coverage where applicable.
