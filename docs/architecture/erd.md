# ERD — hello-word-B

## Tables

### display_texts
Stores the single public line rendered by the page.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | integer | primary key, `id = 1` | Enforces singleton row by check constraint |
| `value` | text | not null, `char_length(value) between 1 and 200`, no newline characters | Displayed as plain text |
| `created_at` | timestamptz | not null, default `now()` | Audit only |
| `updated_at` | timestamptz | not null, default `now()` | Audit only |

## Relationships
None. Project stores one row only.

## Seed data
Migration inserts:

| id | value |
|---|---|
| 1 | `Hello Word` |

## Notes
- No user table, roles, or write audit: SRS has read-only guest flow.
- If editing display text is added later, keep singleton row and add controlled write endpoint rather than creating list semantics.
