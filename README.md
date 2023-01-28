# [exshopify.com](https://exshopify.com/)

A site for departing shopifolk to create a forwarding link based on their domain email address. e.g., `john.doe@shopify.com` becomes `exshopify.com/john.doe`

## supabase

- View your [API settings page](https://app.supabase.com/project/koindbqxigdpttnbsiyi/settings/api)
- Generate a [new local access token](https://app.supabase.com/account/tokens)

### First time setup

```sh
# local access token in 1pass
npx supabase login
npx supabase init
npx supabase link --project-ref koindbqxigdpttnbsiyi
```

### Type generation

```sh
npx supabase gen types typescript --linked > src/lib/types/supabase.ts
```

---

## create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
