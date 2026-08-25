# SRS — general

Module: `general`
Last updated: 2025-02-14
Design: [View Design](http://localhost:8080/design/d75fe864-a76f-4e40-aae4-0dc8171c5d07)
Design system: `design/design-system.md`

> One file per module, at `docs/{module}/SRS.md`. It covers only the functions
> that belong to this module. Never write `docs/SRS.md`.

## 1. Purpose

`general` delivers the project’s only user-visible path: one centered line of
text on a plain white page. It proves the pipeline end to end by moving stored
content from PostgreSQL through the backend API into the browser. Without it,
the project has no working product, only scaffolding.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Guest | Any visitor with no sign-in | Open the page and read the displayed text |

## 3. Scope

**In scope** — the function specified below, by its plan title:

- Build hello page end to end

**Out of scope**

- Extra pages, navigation, or controls — deliberately not built; project has
  one-screen brief.
- Editing or managing stored text — belongs to a different product; this module
  only reads and displays one stored row.
- Sign-in, roles, or permissions — not part of this product.

## 4. Functional requirements

### 4.1 Build hello page end to end

**Requirement GENERAL-001 — Read stored hello text**

*As a* Guest, *I want to* load the page and see text from persisted data, *so
that* the displayed word is served from the backend path and not typed into the
frontend.

Behaviour:

1. When the page loads, the system requests the stored display text through the
   backend API.
2. When the backend returns the stored value, the page renders that exact text
   in the center of the viewport.
3. When the stored value is `Hello Word`, the page shows `Hello Word`.

**Acceptance criteria** — each maps one-to-one onto a test case in
`docs/general/test-cases/build-hello-page-end-to-end.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Stored value is `Hello Word` | Guest opens page | Text `Hello Word` appears on page |
| AC-2 | Stored value changes to another single-line string | Guest refreshes page | Page shows changed stored string |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Not applicable | No roles or writes exist in this module | Guest access only; no permission matrix needed |
| Not applicable | Approved design shows one static screen only | No loading, empty, or error state is part of approved design |
| Upstream failure | Backend or database unavailable | Error presentation is not part of approved design; service contract defines failure envelope |
| Boundary | Stored text is any single short line | Page displays that line centered, without truncation rules beyond browser defaults |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| stored display text | text | yes | One persisted row supplies the page copy; value must be renderable as a single line of plain text |
| display text source row | PostgreSQL row | yes | Exactly one row is read for this page |

## 5. Screens

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Hello display | Hello display | GENERAL-001 | default |

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Page renders the stored text within 1s at p95 on 1 Mbps cold cache after API response starts |
| Accessibility | Text remains keyboard unreachable because it is read-only; contrast is at least 4.5:1; page has visible centered heading text |
| Responsive | Layout stays centered at 320px width and above with no horizontal scroll |
| Privacy | No personal data is stored or displayed; only one public text row is read |

## 7. Dependencies and assumptions

- **Depends on:** PostgreSQL, for the stored display text.
- **Depends on:** Backend API, for reading the stored text and returning it to
  the page.
- **Assumption:** The stored value is plain text on one row; if that changes,
  this module becomes a richer content display.

| Open question | Proposed default | Who decides |
|---|---|---|
| What exact error copy should appear if API or DB is unavailable? | No error UI in approved design; rely on service contract and infrastructure handling | Stakeholder / TL |

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| Build hello page end to end | GENERAL-001 | `test-cases/build-hello-page-end-to-end.md` |
