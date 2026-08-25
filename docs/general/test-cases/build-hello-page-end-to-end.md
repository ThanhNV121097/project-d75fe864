# Test Cases — Build hello page end to end

Risk level: low. Single-screen read-only path, but covers end-to-end data flow and contract behavior.

## Coverage map
- GENERAL-001 read stored hello text: AC-1, AC-2, AC-3
- Service contract: GET /healthz success and failure, GET /v1/display-text success shape, error envelope, no auth, bad request behavior, undefined field/query handling
- UI contract: exact stored text, no fallback greeting on failure, centered plain white screen with black text, no animation

## Cases

**Scenario**: Show stored hello text
**Given** PostgreSQL has exactly one persisted display-text row with value `Hello Word`
**When** Guest opens page
**Then** page displays `Hello Word` exactly once as visible text, with no extra greeting copy
**Check**: render_url
**Trace**: GENERAL-001 AC-1

**Scenario**: Show updated stored text
**Given** PostgreSQL row value is changed from `Hello Word` to another single-line string `Hello World 2`
**When** Guest refreshes page
**Then** page displays `Hello World 2` exactly, not the previous value
**Check**: render_url
**Trace**: GENERAL-001 AC-2

**Scenario**: Read from single persisted row only
**Given** PostgreSQL contains exactly one persisted display-text row
**When** Guest opens page
**Then** page renders value from that row and not a hardcoded literal or a list of multiple values
**Check**: render_url
**Trace**: GENERAL-001 AC-3

**Scenario**: Backend health success
**Given** migrations succeeded and `SELECT 1` works
**When** client requests `GET /healthz`
**Then** response is `200 text/plain` with body `ok`
**Check**: fetch_url
**Trace**: services.md GET /healthz success

**Scenario**: Backend health failure when readiness prerequisite fails
**Given** migrations have not succeeded or `SELECT 1` fails
**When** client requests `GET /healthz`
**Then** response is non-200
**Check**: fetch_url
**Trace**: services.md GET /healthz failure

**Scenario**: Display text success envelope
**Given** stored display text exists
**When** client requests `GET /v1/display-text`
**Then** response is `200 application/json` with body `{ "data": { "text": "Hello Word" } }`
**Check**: fetch_url
**Trace**: services.md GET /v1/display-text success

**Scenario**: No auth required
**Given** guest has no sign-in or token
**When** guest requests page and `GET /v1/display-text`
**Then** both requests succeed without auth headers or login step
**Check**: fetch_url
**Trace**: services.md shared rules; SRS actors Guest

**Scenario**: Backend unavailable returns service contract failure
**Given** backend or database is unavailable
**When** page load triggers stored-text request
**Then** backend returns failure response with error code `service_unavailable`, and frontend shows no fallback greeting text
**Check**: fetch_url
**Trace**: GENERAL-001 failure behavior; services.md error envelope

**Scenario**: Missing singleton row returns not_found envelope
**Given** required singleton display-text row is missing
**When** client requests `GET /v1/display-text`
**Then** response is failure envelope with error code `not_found`
**Check**: fetch_url
**Trace**: services.md failure behavior

**Scenario**: Unexpected backend failure returns internal_error envelope
**Given** server hits unexpected failure
**When** client requests `GET /v1/display-text`
**Then** response is failure envelope with error code `internal_error`
**Check**: fetch_url
**Trace**: services.md failure behavior

**Scenario**: Undefined query parameter ignored
**Given** stored display text exists
**When** client requests `GET /v1/display-text?extra=1`
**Then** response shape is same success JSON and returned text is unchanged
**Check**: fetch_url
**Trace**: services.md request defines no query parameters

**Scenario**: Page layout is centered plain white screen
**Given** stored display text exists
**When** Guest opens page in browser
**Then** visible text is horizontally and vertically centered on plain white background with black text and no animation
**Check**: measure_styles
**Trace**: design/spec; GENERAL-001 center render; non-functional requirements

**Scenario**: No alternate copy on failure
**Given** backend request fails
**When** Guest opens page
**Then** page does not substitute any hardcoded greeting text
**Check**: render_url
**Trace**: GENERAL-001 failure behavior
