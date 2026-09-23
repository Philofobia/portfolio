# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

## Project

Bilingual (en/ja) single-page portfolio. Design source: Claude Design project "Portfolio Wireframes", option 7a (dark, 18×75px cell grid, accent `#8a97ff`, seven numbered full-height panels).

Conventions the tree does not confess:

- Scaffold files hold only a header comment and `export {}`. The comment is the spec for that file; implement it, keep the comment as the module doc.
- Copy that changes with the language lives in `messages/{en,ja}.json` (identical key trees). Locale-independent data (URLs, dates, tech ids, image paths) lives in `src/content/`.
- Internal links import `Link` from `src/i18n/navigation.ts`, never from `next/link`.
- Locale routing runs in `src/proxy.ts` (Next 16 replaced `middleware.ts` with `proxy.ts`).
- Section ids (`hero`, `work`, `stack`, `experience`, `japan`, `about`, `contact`) are the nav anchors; `src/content/nav.ts` is the single list.
- Client components are the leaves (clocks, carousel, theme, copy button, canvas); sections and layout stay server components.

## Agent skills

### Issue tracker

Local markdown under `.scratch/<feature>/` (no git remote yet). See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root, created lazily. See `docs/agents/domain.md`.
