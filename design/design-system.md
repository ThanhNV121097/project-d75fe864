# Design System — hello-word-B

> Source of truth: the approved `index.html` (preview: approved design).
> Every value below is extracted from it. Changing a value here without changing the approved design is a defect.

Last updated: 2025-02-14

## 1. Foundations

### 1.1 Color

Semantic tokens. Name by job, never by hue.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-text` | `#000000` | Body text |

#### Contrast audit

Every text-on-background pair actually used. Body text ≥ 4.5:1, large text (≥ 18.66px bold or ≥ 24px) ≥ 3:1, UI borders ≥ 3:1.

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--color-text` | `--color-bg` | `21:1` | AA / AA Large / PASS |

### 1.2 Spacing

Base unit: `8px`. Every margin, padding, and gap in the product uses one of these.

| Token | Value |
|---|---|
| `--space-6` | `24px` |

### 1.3 Typography

Font families (include the fallback stack and how the font is loaded):

- Body: `Arial, Helvetica, sans-serif` (system stack)
- Headings: `Arial, Helvetica, sans-serif` (system stack)
- Mono: not used

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--text-3xl` | `clamp(2.5rem, 8vw, 5rem)` | `1` | `400` | Page headline |

Heading levels are used in order and never skipped for visual sizing.

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius-full` | not used | — |
| `--border-width` | `0` | No borders in approved design |
| `--shadow-sm` | `none` | No elevation |
| `--duration-fast` | `0ms` | No motion |
| `--duration-base` | `0ms` | No motion |
| `--easing` | `linear` | No motion |

Motion respects `prefers-reduced-motion: reduce`: state changes remain, movement is removed.

### 1.5 Layout and breakpoints

| Name | Min width | Container | Columns | Gutter |
|---|---|---|---|---|
| `sm` | `480px` | `100%` | `1` | `24px` |
| `md` | `768px` | `100%` | `1` | `24px` |
| `lg` | `1024px` | `100%` | `1` | `24px` |
| `xl` | `1280px` | `100%` | `1` | `24px` |

Z-index scale (only these values are allowed):

| Layer | Value |
|---|---|
| Base | `0` |
| Sticky header | not used |
| Dropdown | not used |
| Modal backdrop | not used |
| Modal | not used |
| Toast | not used |

## 2. Components

No reusable components in approved design. Single static view only.

## 3. Content and formatting

- Voice and tone: plain, neutral, no motion, no decoration.
- Date, time, number, and currency formats: not used.
- Capitalization rule: title case only for document title; page copy uses exact product text.
- Empty-state and error-message wording pattern: not used in approved view.

## 4. Known deviations

Places where the approved design does not follow its own rules or the anti-patterns in `references/ai-defaults.md`. Record, do not silently fix.

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| Layout | `body` and `main` both use `min-height: 100vh` | Needed to keep text centered vertically on full viewport | Keep as-is; no extra wrapper |
| Components | No loading, error, or empty states shown | Single static success view only | Add only if product grows beyond one page |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2025-02-14 | Initial design system for hello-word-B | pending |
