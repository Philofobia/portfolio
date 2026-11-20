# Portfolio

Personal portfolio website: a single-page, bilingual (English and Japanese) site built with
Next.js. Work in progress.

## Tech stack

- Next.js (App Router) and React
- next-intl for internationalization
- Tailwind CSS
- TypeScript
- Deployed on Vercel

## Getting started

Requirements: Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `pnpm dev`            | Start the development server                                      |
| `pnpm build`          | Build for production                                              |
| `pnpm start`          | Serve the production build                                        |
| `pnpm lint`           | Lint the code                                                     |
| `pnpm typecheck`      | Generate route types and run `tsc`                                |
| `pnpm messages:check` | Check that `en` and `ja` messages share keys and arguments        |
| `pnpm html:check`     | Validate the built HTML (run `pnpm build` first)                  |
| `pnpm perf:check`     | Check performance budgets in headless Chrome (after `pnpm build`) |
| `pnpm format`         | Format the code with Prettier                                     |
