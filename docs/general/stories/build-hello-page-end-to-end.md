# Build hello page end to end

As a Guest, I want to open single hello page and see stored text from PostgreSQL, so that page proves backend, database, and frontend work end to end.
## In scope

- Read one persisted display-text row through backend API.
- Render exact stored value on only page.
- Keep view plain: white background, black centered text, no motion, no extra UI.
## Out of scope

- Extra pages, navigation, controls, or editing.
- Sign-in, roles, permissions, analytics, or animation.
- Any hardcoded frontend greeting or fallback copy.
## UI scope

- One static screen: Hello display.
- State: default success view only, centered text on plain white background.
- No loading, empty, or error state in approved design.
## Acceptance criteria

1. Given stored value is `Hello Word`, when Guest opens page, then page shows `Hello Word` centered in viewport.
2. Given stored value changes to another single-line string, when Guest refreshes page, then page shows changed stored string.
3. Given database contains exactly one persisted display-text row, when Guest opens page, then page renders value from that single row and not a hardcoded literal or list.
## Dependencies

- PostgreSQL must contain one persisted display-text row.
- Backend API must expose read path for that row.
- Approved design and design system remain plain white background, black text, no motion.
