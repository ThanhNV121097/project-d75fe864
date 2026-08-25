package migrations

import "embed"

// Files contains embedded SQL migrations.
//go:embed *.up.sql
var Files embed.FS
