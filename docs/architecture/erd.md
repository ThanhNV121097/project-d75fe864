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

## Indexes
No secondary indexes. Singleton lookup uses primary key `display_texts_pkey` for query `SELECT value FROM display_texts WHERE id = 1`.

## Migration plan

Forward:
1. Create `display_texts` with columns above.
2. Add check constraints for singleton `id = 1`, value length, and no newline characters.
3. Insert seed row `(1, 'Hello Word')`.

Backward:
1. Drop `display_texts`.

Safety on populated tables:
- Safe on empty database.
- Safe on populated database only if `display_texts` does not already exist; migration must fail fast rather than overwrite existing text.
- Rollback deletes the singleton display text; acceptable before first production use. After launch, take backup before rollback.

## Notes
- No user table, roles, or write audit: SRS has read-only guest flow.
- If editing display text is added later, keep singleton row and add controlled write endpoint rather than creating list semantics.
