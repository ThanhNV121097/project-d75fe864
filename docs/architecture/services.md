# Services — hello-word-B

## Shared rules
- Route paths omit `/api`; deploy proxy strips that prefix before backend receives requests.
- All responses are JSON except `GET /healthz`.
- No authentication required.
- Frontend contract follows reviewed mock module `DisplayTextResponse`: `{ "data": { "text": string } }`.

## Error envelope
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

| Code | HTTP status | Meaning |
|---|---:|---|
| `service_unavailable` | 503 | Database or required upstream unavailable |
| `not_found` | 404 | Required singleton row missing |
| `internal_error` | 500 | Unexpected server failure |

## Endpoints

### `GET /healthz`
Readiness probe.

Auth: none.

Request: none.

Success `200 text/plain`:
```text
ok
```

Failure: non-200 when migrations have not succeeded or `SELECT 1` fails.

### `GET /v1/display-text`
Returns the singleton display text for the page.

Auth: none.

Request: none.

Success `200 application/json`:
```json
{
  "data": {
    "text": "Hello Word"
  }
}
```

Response fields:

| Field | Type | Nullable | Source |
|---|---|---:|---|
| `data.text` | string | no | `display_texts.value` where `id = 1` |

Status codes:

| Status | Body | Condition |
|---:|---|---|
| 200 | `DisplayTextResponse` | Singleton row read succeeds |
| 404 | error envelope with `not_found` | Singleton row `id = 1` missing |
| 503 | error envelope with `service_unavailable` | Database unavailable or query times out |
| 500 | error envelope with `internal_error` | Unexpected server failure |

Failure examples:
```json
{
  "error": {
    "code": "service_unavailable",
    "message": "service unavailable"
  }
}
```

## Backend/frontend contract
Frontend reads base URL from `NEXT_PUBLIC_API_URL` and calls `/v1/display-text`. Frontend renders returned `data.text` exactly and must not substitute fallback greeting text on failure.

Reviewed UI mock shape matches API success body exactly:
```ts
export type DisplayTextResponse = {
  data: {
    text: string;
  };
};
```

No pagination, list envelope, auth header, request body, or query parameters exist for this story.

## Migration and rollout plan

Forward:
1. Apply database migration from `docs/architecture/erd.md`.
2. Implement `GET /healthz` database readiness check.
3. Implement `GET /v1/display-text` with singleton lookup by `id = 1`.
4. Configure frontend `NEXT_PUBLIC_API_URL` to backend API base.

Backward:
1. Revert frontend API integration to previous approved mock only if backend rollback is required before release.
2. Remove backend route implementation.
3. Roll back database migration by dropping `display_texts`.

Safety on populated tables:
- Route additions are backward compatible.
- Database forward migration is safe only when `display_texts` does not already exist.
- Backward database migration deletes display text; backup required after launch.
