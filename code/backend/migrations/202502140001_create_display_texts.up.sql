CREATE TABLE display_texts (
  id integer PRIMARY KEY CHECK (id = 1),
  value text NOT NULL CHECK (char_length(value) BETWEEN 1 AND 200 AND position(E'\n' in value) = 0 AND position(E'\r' in value) = 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO display_texts (id, value)
VALUES (1, 'Hello Word');
