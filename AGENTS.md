<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Inventis — Agent Instructions

**Inventis** is an inventory management SaaS (Indonesian market). Stack: **Next.js 16** · **React 19** · **Supabase** · **Tailwind CSS 4** · **TypeScript**.

## Commands

```bash
npm run dev       # start dev server (port 3000)
npm run build     # production build
npm run lint      # ESLint
```

## Architecture

- **App Router only** (`app/`). Do not use the Pages Router.
- All docs are in `node_modules/next/dist/docs/` — read them before using any Next.js API.

## Supabase

Use `@supabase/ssr` (not `@supabase/supabase-js` directly) for all server-side Supabase calls. It handles cookie-based auth required by the App Router.

| Context                                           | Factory                                                                                        |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Server Components, Route Handlers, Server Actions | `createServerClient` from `@supabase/ssr`                                                      |
| Client Components                                 | `createBrowserClient` from `@supabase/ssr`                                                     |
| Middleware (`middleware.ts`)                      | `createServerClient` with `request`/`response` cookies — **required** to refresh auth sessions |

- Always create a `middleware.ts` at the project root to call `supabase.auth.getUser()` and forward updated cookies. Without it, sessions expire.
- Never call `createClient` from `@supabase/supabase-js` in server contexts — it has no cookie support.
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Never expose `service_role` key to the client.

## Tailwind CSS 4

Tailwind v4 **breaks v3 config conventions**. Notable changes:

- Config is in `postcss.config.mjs` via `@tailwindcss/postcss`, not `tailwind.config.js`.
- Use CSS custom properties (`var(--color-*)`) instead of `theme()` in CSS files.
- `@apply` still works but `theme()` in CSS is removed — use CSS variables instead.

## shadcn/ui

shadcn is installed and uses **`@base-ui/react`** primitives (not Radix UI). Key differences:

- `DropdownMenuTrigger`, `DialogTrigger`, etc. do **not** support `asChild` — apply `className` directly on the trigger element instead.
- Use `variant="destructive"` on `DropdownMenuItem` for destructive actions.
- Components live in `components/ui/`. Check Base UI API before assuming Radix-compatible props.

## Auth & Proxy

- `proxy.ts` (not `middleware.ts`) is the Next.js 16 convention for session refresh and route guards.
- Exported function must be named `proxy` (not `middleware`). See `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.
- Server Actions used with `useActionState` must accept `(_prevState: unknown, formData: FormData)`.
- Auth actions: `app/(auth)/actions.ts` · Supabase clients: `lib/supabase/server.ts` + `lib/supabase/client.ts`.
- DB types are hand-crafted in `lib/supabase/types.ts`. Use `.single()` without generics; cast results as needed (e.g. `as Profile`). Replace with `supabase gen types` once CLI is set up.
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only (admin user creation). Never expose to client.
