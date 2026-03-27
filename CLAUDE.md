# HeyStack — CLAUDE.md

## Design System

All design tokens live in `tokens/heystack-design-system.json`. Always reference this file when building UI — never hardcode color, spacing, or typography values.

### Colors

Semantic color tokens are in `colors.light` and `colors.dark`. Use the semantic name, not the raw hex.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `primary` | `#86198F` (fuchsia-800) | `#86198F` | Buttons, links, focus rings |
| `background` | `#FAFAF9` (stone-50) | `#18181B` (zinc-900) | Page background |
| `foreground` | `#262626` (neutral-800) | `#F4F4F5` (zinc-100) | Body text |
| `card` | `#FFFFFF` | `#171717` (neutral-900) | Card surfaces |
| `muted` | `#F4F4F5` (zinc-100) | `#404040` (neutral-700) | Subdued backgrounds |
| `muted-foreground` | `#737373` (neutral-500) | `#A1A1AA` (zinc-400) | Secondary text |
| `border` | `#E5E5E5` (neutral-200) | `#FFFFFF1A` (white/10%) | Borders, dividers |
| `destructive` | `#DC2626` (red-600) | `#F87171` (red-400) | Error states |
| `secondary` | `#E5E7EB` (gray-200) | `#27272A` (zinc-800) | Secondary buttons |
| `ring` | `#86198F` | `#86198F` | Focus ring |

Chart palette: `chart-1` through `chart-5` — purple, teal, cyan, amber, amber/rose.

Sidebar tokens mirror the main palette under `sidebar-*` prefixes.

### Typography

**Font families:**
- Sans (body): `Inter`
- Headings: `Geist`
- Mono: `Fira Code`
- Serif (rarely used): `Georgia`

**Type scale** (font-size / line-height in px):
- `xs`: 12/16
- `sm`: 14/20
- `base`: 16/24
- `lg`: 18/28
- `xl`: 20/28
- `2xl`: 24/32
- `3xl`: 30/36
- `4xl`: 36/40
- `5xl`: 48/48
- `6xl`: 60/60
- `7xl`: 72/72
- `8xl`: 96/96
- `9xl`: 128/128

**Font weights:** thin (100), extralight (200), light (300), normal (400), medium (500), semibold (600), bold (700), extrabold (800), black (900).

### Responsive Headings

All headings use `Geist`, weight `600` (semibold), with tight negative letter-spacing. Sizes step down on mobile:

| Token | Desktop | Mobile |
|---|---|---|
| `heading-xl` | 60px / ls: -1.5px | 48px / ls: -1.2px |
| `heading-lg` | 48px / ls: -1.2px | 36px / ls: -0.9px |
| `heading-md` | 36px / ls: -0.9px | 30px / ls: -0.75px |
| `heading-sm` | 24px / ls: -0.6px | 20px / ls: -0.5px |

### Layout Spacing

| Token | Desktop | Mobile |
|---|---|---|
| `container-padding-x` | 24px (spacing-6) | 16px (spacing-4) |
| `section-padding-y` | 96px (spacing-24) | 64px (spacing-16) |
| `section-title-gap-xl` | 24px | 20px |
| `section-title-gap-lg` | 20px | 16px |
| `section-title-gap-md` | 20px | 16px |
| `section-title-gap-sm` | 16px | 16px |

### Border Radius

`xs`: 2, `sm`: 6, `md`: 8, `lg`: 10, `xl`: 14, `2xl`: 16, `3xl`: 24, `4xl`: 32

### Breakpoints

`sm`: 640px, `md`: 768px, `lg`: 1024px, `xl`: 1280px, `2xl`: 1536px

### Effects

Shadow, inset-shadow, drop-shadow, and blur scales are in `effects.*`. All box-shadow colors in the 2026 theme are currently `rgba(0,0,0,0)` (transparent) — override per-component as needed.

## Figma Integration

We use the Figma MCP server to read designs directly. The token JSON file and Figma serve different roles:

- **Figma MCP** = read layer for structure and intent (layout composition, component hierarchy, screen structure)
- **Token JSON** = build layer for exact values (colors, spacing, typography used in code)

When the two conflict, the token file wins for code generation. If a Figma design shows a value that doesn't match the tokens, flag it — don't silently hardcode the Figma value.

### Implementing a screen from Figma

1. Use `get_design_context` to understand layout structure and component composition
2. Use `get_screenshot` for visual reference when the layout is ambiguous
3. Map all values to tokens from `tokens/heystack-design-system.json` — never use raw Figma pixel values or variable IDs
4. Heading styles come from `responsive.desktop.headings` / `responsive.mobile.headings` — not from Figma's text style inspection
5. Colors always use semantic token names (`primary`, `muted`, `background`) not hex literals from Figma fills

### Value mapping rules

When Figma MCP returns raw numbers, map them to the token scale instead of hardcoding:

- Padding/gap of `24` → `spacing-6` or `container-padding-x`, not `p-[24px]`
- Font size of `36` → `heading-md` (desktop) or `text-4xl`, not `text-[36px]`
- Border radius of `8` → `radius-md`, not `rounded-[8px]`
- Color fill → find the matching semantic token name, not the hex

### Component naming

Figma component names should map to shadcn/ui component names in code:

- `Button / Primary` → `<Button variant="default">`
- `Card / Default` → `<Card>`
- `Input / Default` → `<Input>`

If a Figma component doesn't have an obvious code counterpart, compose it from existing shadcn primitives rather than building from scratch.

## Conventions

- Use shadcn/ui components — they map 1:1 to the semantic color tokens
- Tailwind CSS for utility styling; reference the token values via CSS custom properties
- Dark mode via `class` strategy (`.dark` on `<html>`)
- Mobile-first responsive design; use the breakpoint scale above
- No hardcoded colors, font sizes, or spacing — always use tokens
- When reading from Figma MCP, always cross-reference against the token file before writing styles

## Token Lint

After generating or modifying any UI component, run the token linter:

```bash
node scripts/lint-tokens.mjs src/components/MyNewComponent.tsx
```

Or lint the entire src directory:

```bash
node scripts/lint-tokens.mjs src
```

The linter catches:
- **Errors**: Arbitrary Tailwind colors (`bg-[#86198F]`), hardcoded hex in inline styles
- **Warnings**: Arbitrary spacing (`p-[24px]`), arbitrary radius (`rounded-[8px]`), arbitrary font sizes (`text-[36px]`), hardcoded px in inline styles

It reads from `tokens/heystack-design-system.json` and suggests the correct token name for each violation. Fix all errors; fix warnings where a token exists.

### Self-audit checklist

After writing UI code, verify before presenting it:

1. No hex color literals anywhere — use semantic Tailwind classes (`bg-primary`, `text-muted-foreground`) or CSS variables (`var(--primary)`)
2. No arbitrary Tailwind brackets for values that exist in the token scales — spacing, radius, font size
3. Headings use Geist via the responsive heading tokens, not arbitrary font sizes
4. Body text uses Inter (the `font-sans` default)
5. Dark mode works — all color tokens have light/dark pairs; no light-only colors hardcoded
6. Responsive spacing uses the layout tokens from `responsive.desktop` / `responsive.mobile`, not raw values
