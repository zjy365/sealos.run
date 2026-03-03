# Repository Guidelines

## Project Structure & Module Organization

- `app/[locale]/*`: Next.js App Router pages (MDX docs under `docs` routes, blog, marketing).
- `libs/*`: Shared modules (components, i18n, utils, config). Use `@/*` path alias.
- `content/*`: Source content for docs/blog (parsed by Fumadocs).
- `public/*`: Static assets served as-is. `assets/*`: design/media sources.
- `scripts/*`: Build helpers (e.g., Turbopack SVG loader).

## Build, Test, and Development Commands

- `pnpm i`: Install deps (runs `fumadocs-mdx` postinstall).
- `pnpm dev`: Start local dev at `http://localhost:3000`.
- `pnpm build`: Production build. `pnpm run build:analyze` enables bundle analyzer.
- `pnpm start`: Run the production server.
- `pnpm lint:check` / `pnpm lint:fix`: Lint with Biome.
- `pnpm format:check` / `pnpm format:fix`: Format with Biome/Prettier.

## Coding Style & Naming Conventions

- Indent with tabs (width 4). LF line endings. Max width 120.
- Quotes: single. Trailing commas: on. Configured via Biome/Prettier.
- Components in `libs/components` use PascalCase filenames; Next.js pages use `page.tsx` in route folders.
- Imports: use `@/*` alias. For i18n: import `Link`, `useRouter`, etc. from `@/libs/i18n/navigation`; `useTranslations` from `@/libs/i18n/client`; `getTranslations` from `@/libs/i18n/server`. Do not import `next/link`, `next/navigation`, or `next-intl/*` directly where wrappers exist.
- TailwindCSS:
  - Prefer **standard scale** utilities (`1/2`, `1/3`, `full`, `0.5`, `1`, `2`, `4`, `8`, etc). Avoid arbitrary values (`[...]`) unless strictly necessary.
  - Keep class lists **short**. Avoid overusing `flex`; prefer default `block` flow when possible. Avoid redundant alignment utilities (`justify-*`, `items-*`) that don't change layout.
  - Use CSS **inheritance/cascade**: set typography on a parent container so children inherit, instead of repeating `text-*`/`leading-*` everywhere.
  - Hairline border (0.5px) is a design token: **use `border-hairline` / `border-*-hairline`** utilities (defined in `app/[locale]/global.css`). Do not use `border-[0.5px]` directly in components.
- ShadCN UI:
  - Prefer existing components under `libs/components/ui/*`.
  - Adding a new shadcn component **must** be done via the CLI (do not hand-write component files).
  - Class name composition must use `cn()` from `@/libs/utils/styling` (no manual string concatenation).
  - Do not modify ShadCN UI components unless necessary, even when they are violating the rules above.
- TypeScript:
  - Prefer type inference and `satisfies` over `as`. When narrowing is needed, prefer patterns like `const x = {...} satisfies T` and derive types from values (`typeof SOME_CONFIG`), to avoid duplicated types.

## Page Local Folder Layout (Important)

- Each route folder that contains a `page.tsx` should follow a consistent local layout:
  - `assets/`: page-local media assets. **Must export via `assets/index.ts`.**
  - `components/`: page-local (non-shared) components.
  - `sections/`: page sections used by the page.
  - `utils/`: supporting utilities (can be split into `utils.ts`, `types.ts`, or module-based files).
- This is a flexible convention: if a page does not use a specific folder type, **do not create it**.
- Keep configuration **close to where it’s used**:
- **Small, section-specific copy and constants** can live inside the corresponding section component.
- **Large, valuable configuration blocks** (multi-section, reusable, or long structured data like pricing tables) should live in `utils/(xxx.)config.ts(x)` and be imported by sections/pages.
- In page-local folders, it is acceptable to use `.tsx` freely when it improves ergonomics (e.g. passing React nodes as config).

## Testing Guidelines

- No test runner is configured yet. If adding tests:
  - Unit: place `*.test.ts(x)` beside sources or in `tests/`.
  - Aim for ≥80% coverage on touched code.
  - Add `pnpm test` script if introducing a runner (e.g., Vitest/Playwright).

## Commit & Pull Request Guidelines

- Use Conventional Commits: `feat:`, `fix:`, `chore:`, etc. Optional scope, e.g., `feat(app): ...`.
- PRs: include a clear description, linked issues (`Closes #123`), and screenshots/GIFs for UI changes.
- Before opening: run `pnpm lint:check`, `pnpm format:check`, and `pnpm build`.

## Security & Configuration Tips

- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_*` vars. Never commit secrets.
- Node ≥ 24 and pnpm `10.x` (see `package.json`). Use `corepack enable` if needed.
- Global, server-only configuration lives in `libs/config.tsx`. For client components, **pass config values from server components as props** (do not import server-only config in client modules).
