CREATE TABLE IF NOT EXISTS schema_migrations (
  version text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS display_texts (
  id integer PRIMARY KEY,
  value text NOT NULL CHECK (char_length(value) BETWEEN 1 AND 200 AND position(E'\n' in value) = 0 AND position(E'\r' in value) = 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT display_texts_singleton CHECK (id = 1)
);

INSERT INTO display_texts (id, value)
VALUES (1, 'Hello Word')
ON CONFLICT (id) DO NOTHING;
