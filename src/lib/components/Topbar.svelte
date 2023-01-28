<script lang="ts">
  import type { UrlContext } from '$lib/utils/url'
  import Button from './Button.svelte'

  export let urlContext: UrlContext
  export let verifiedEmail: string | undefined
  export let login: () => Promise<unknown>
  export let logout: () => Promise<unknown>

  const { root, subdomain } = urlContext
</script>

<section class="flex flex-wrap items-center gap-2 mb-4">
  <a href={urlContext.origin} class="flex flex-nowrap items-center gap-2">
    <img src="/favicon.png" alt="logo" class="h-16" />
    <h1 class="text-4xl mb-2">
      {subdomain ? `${subdomain}.${root}` : root}
    </h1>
  </a>
  <div class="flex-grow" />
  {#if verifiedEmail}
    <div class="flex gap-4 items-center">
      <p class="email">Logged in as {verifiedEmail}</p>
      <Button action={logout}>Logout</Button>
    </div>
  {:else}
    <Button action={login}>Login</Button>
  {/if}
</section>

<style lang="postcss">
  .email {
    @apply text-blue-200;
  }
</style>
