<script lang="ts">
  import {api} from '$lib/services/api'
  import {auth, type AuthState} from '$lib/services/auth'
  import {onMount} from 'svelte'
  import type { PageData } from './$types'

  export let data: PageData
  let authState: AuthState = {}

  const {id} = auth.store
  let url = ''

  onMount(async () => {
    authState = await auth.initialize()
  })

  async function login() {
    if (!authState.client) return

    await auth.login(authState.client)
  }

  async function logout() {
    if (!authState.client) return

    await auth.logout(authState.client)
  }

  async function handleUpdate() {
    await api.update(url)
  }
</script>

<main class="flex flex-col h-screen p-4">
  <section class="flex flex-wrap items-center gap-2">
    <img src="/favicon.png" alt="logo" class="h-16" />
    <h1 class="text-4xl mb-2">exshopify.com</h1>
    <div class="flex-grow" />
    {#if $id}
      <div class="flex gap-4 items-center">
        <p class="info">Logged in as {$id}</p>
        <button on:click={logout} class="btn btn-teal">Logout</button>
      </div>
    {:else}
      <button on:click={login} class="btn btn-teal">Login</button>
    {/if}
  </section>
  <section class="flex flex-1 items-center mb-40">
    <div class="m-auto">
      {#if authState.client && $id}
        <form on:submit|preventDefault={handleUpdate}>
          <input
            bind:value={url}
            type="text"
            name="url"
            aria-label="forwarding URL"
            placeholder="forwarding URL"
            class="text-slate-700 p-1 h-9"
          />
          <button type="submit" class="btn btn-teal mt-4 ml-2">Update</button>
        </form>
      {/if}
    </div>
    {#if data.invalidRedirect}
      <p class="error">{data.invalidRedirect} is not a valid redirect</p>
    {/if}
    {#if authState.error}
      <p class="error">Authentication error: {authState.error}</p>
    {/if}

  </section>
</main>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.slate.700);
    color: theme(textColor.slate.100);
  }

  .btn {
    @apply font-bold py-2 px-4 rounded;
  }

  .btn-teal {
    @apply bg-teal-800 hover:bg-teal-700;
  }

	.error {
    color: theme(textColor.red.300);
  }

  .info {
    color: theme(textColor.blue.200);
  }
</style>
