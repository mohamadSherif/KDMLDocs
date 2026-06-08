# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

KDMLink documentation site — a Next.js 16 / React 19 MDX docs portal, forked from the `rubix-documents` starter. The product being documented is **KDMLink**, a mobile logging + RaceChrono integration app for Hyundai/Kia/Genesis vehicles, paired with the **N-Link** hardware interface. Site identity (KDMLink, https://kdmlink.com) is configured in `settings/main.ts`; the `package.json` name (`rubix-documents`) is left over from the upstream template.

Node 24.x and pnpm 10.33.3 are pinned via `engines` / `packageManager`. Tailwind v4 + Biome 2.

## Current status

Live doc pages (under `contents/docs/`):

- `introduction/` — what KDMLink is
- `compatible-vehicles/` — supported Hyundai/Kia/Genesis list
- `installation/` — install overview
- `installation/n-link/` — N-Link hardware install hub
- `installation/n-link/plug-and-play/` — PnP harness method
- `installation/n-link/wire-tap/` — wire-tap method (latest commit `9c4cc31` added harness wiring + wire-color matching)
- `installation/app/` — app install & setup
- `app/` — "The App" overview

The sidebar (`settings/documents.ts`) currently contains a known duplicate: both `/installation/app` (under Installation) and a bare `/app` (under "The App") point to different MDX files. Treat them as two distinct pages — the duplicate `href` value is intentional because parent concatenation differs.

Feature flags in `settings/main.ts`: `rightsidebar`, `feedbackedit`, `tableofcontent`, `totopscroll` are **on**; `branding` and `loadfromgithub` are **off**; `gtmconnected` is off (GTM ID is still the `GTM-XXXXXXX` placeholder). OG image at `public/images/og-image.png`.

## Commands

```bash
pnpm install
pnpm generate-content-json   # build search index from MDX — re-run after content changes
pnpm dev                     # next dev --turbopack
pnpm build                   # production build (8GB heap)
pnpm start                   # serve built site
pnpm clean                   # biome check --write (format + lint fix)
```

There is no test suite.

## Architecture

### Content + routing pipeline

Docs are MDX files under `contents/docs/<route-segment>/index.mdx`. URLs mirror the directory structure: `contents/docs/installation/n-link/index.mdx` → `/docs/installation/n-link`.

Three pieces must stay in sync to make a page visible and navigable:

1. **MDX file** at `contents/docs/<path>/index.mdx` with frontmatter (`title`, `description`, `keywords`).
2. **Sidebar entry** in `settings/documents.ts` — the `Documents` array drives the sidebar tree. Nested `items[]` produce sub-pages whose `href` is **concatenated** onto the parent (`/installation` + `/n-link` → `/installation/n-link`), see `lib/pageroutes.ts:getAllLinks`. A bare `{ spacer: true }` renders a divider; `heading` on an entry adds a section label above it.
3. **Search index** — `scripts/content.ts` walks `contents/docs`, strips JSX, and writes JSON to `public/search-data/`. Run `pnpm generate-content-json` after content changes or new pages won't appear in search.

The dynamic route `app/docs/[[...slug]]/page.tsx` joins the slug and calls `getDocument(slug)` in `lib/markdown.ts`, which `compileMDX`s the file with the rehype/remark plugin chain (KaTeX, Prism, slug+autolink headings, GFM, code titles).

### MDX components

Custom components available inside MDX are registered in `lib/components.ts`: `Card`, `CardGrid`, `Step`, `StepItem`, `Note`, `FileTree` (with `Folder`, `File`), `Mermaid`, `Tabs`/`TabsContent`/`TabsList`/`TabsTrigger`. The `a` tag is overridden by `Route` (internal/external link handling) and `pre` by `Pre` (copy button).

### Settings module

- `settings/main.ts` — site name, URL, SEO defaults, feature flags (`rightsidebar`, `feedbackedit`, `tableofcontent`, `loadfromgithub`).
- `settings/documents.ts` — sidebar tree (see above).
- `settings/navigation.ts` — top-nav links and `GitHubLink` (also used as the base for GitHub-load mode).
- `settings/icons.ts` — icon map.

When `loadfromgithub` is true, `lib/markdown.ts` fetches MDX from `{GitHubLink.href}/raw/main/contents/docs/<slug>/index.mdx` instead of the local filesystem — keep `GitHubLink` correct if enabling this.

### Adding a new doc page

1. Create `contents/docs/<segment>/index.mdx` with frontmatter.
2. Add an entry to `Documents` in `settings/documents.ts`. For a sub-page, nest under the parent's `items: []` and use a path **relative** to the parent.
3. Re-run `pnpm generate-content-json` if you want it searchable.

## Conventions

- Biome formats and lints — `pnpm clean` is the canonical fix command. `biome.json` excludes `contents/docs`, `public/search-data`, and `src/components/ui` from formatting.
- TypeScript path alias `@/*` resolves to repo root.
- `'use client'` is used sparingly; the sidebar (`components/sidebar/pagemenu.tsx`) is a client component because it needs `usePathname` for active-link state and auto-expanding collapsibles.
- Internal links inside MDX should use `/docs/<path>` (the `Route` component handles them).
- Images for install steps live under `public/` and are referenced from MDX with absolute paths (e.g. `/images/...`).
- The `package.json` `name` field is still `rubix-documents` from the template — do not rely on it for site identity; use `settings/main.ts` (`sitename`, `url`).
