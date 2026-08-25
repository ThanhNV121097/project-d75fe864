# Services — hello-word-B

## Shared rules
- Route paths omit `/api`; deploy proxy strips that prefix before backend receives requests.
- All responses are JSON.
- No authentication required.

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

Request: none.

Success `200 text/plain`:
```text
ok
```

Failure: non-200 when migrations have not succeeded or `SELECT 1` fails.

### `GET /v1/display-text`
Returns the singleton display text for the page.

Request: none.

Success `200 application/json`:
```json
{
  "data": {
    "text": "Hello Word"
  }
}
```

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
