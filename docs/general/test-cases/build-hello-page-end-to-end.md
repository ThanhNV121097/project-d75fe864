# Test Cases — Build hello page end to end

Risk level: low. One-screen read-only page, but it crosses DB, API, and browser, so cases cover happy path, data change, contract success, and styling.

## Cases

### Scenario: Display stored hello text
**Given** PostgreSQL has exactly one persisted display-text row with value `Hello Word`, backend API is available, and frontend is configured with `NEXT_PUBLIC_API_URL`
**When** Guest opens page
**Then** page displays `Hello Word` exactly, centered in viewport, from backend response and not from hardcoded frontend text
**Check**: render_url
**Traces to**: GENERAL-001, AC-1, AC-3

### Scenario: Show updated stored text after refresh
**Given** PostgreSQL has exactly one persisted display-text row whose value is changed to another single-line string, backend API is available, and frontend is configured with `NEXT_PUBLIC_API_URL`
**When** Guest refreshes page
**Then** page displays changed stored string exactly, not previous value and not fallback greeting
**Check**: render_url
**Traces to**: GENERAL-001, AC-2, boundary rule for single short line

### Scenario: Use only single persisted row
**Given** PostgreSQL contains exactly one persisted display-text row and backend API is available
**When** Guest opens page
**Then** page renders value from that single row only, with no list and no hardcoded literal replacing DB value
**Check**: render_url
**Traces to**: GENERAL-001, AC-3, data touched rule

### Scenario: Readiness probe succeeds when service is healthy
**Given** migrations have succeeded and database responds to `SELECT 1`
**When** client requests `GET /healthz`
**Then** response is `200 text/plain` with body `ok`
**Check**: fetch_url
**Traces to**: service contract `GET /healthz` success

### Scenario: Display-text API succeeds with JSON contract
**Given** service is healthy and persisted display-text row exists
**When** client requests `GET /v1/display-text`
**Then** response is `200 application/json` with body `{ "data": { "text": "Hello Word" } }`
**Check**: fetch_url
**Traces to**: service contract `GET /v1/display-text` success shape

### Scenario: Display remains plain white with black text and no motion
**Given** page is loaded with stored display text available
**When** Guest views rendered page
**Then** background is white, text is black, centered horizontally and vertically, and no animation is visible
**Check**: measure_styles
**Traces to**: design summary, accessibility and screen requirements

### Scenario: No guest permissions barrier exists
**Given** Guest has no sign-in
**When** Guest opens page
**Then** page is accessible without authentication and shows display text
**Check**: render_url
**Traces to**: Actors table, scope note for no sign-in and no permissions
