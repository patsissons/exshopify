<script lang="ts">
  import Button from '$lib/components/Button.svelte'
  import Card from '$lib/components/Card.svelte'
  import { errorReason } from '$lib/utils/error'

  export let id: string | undefined
  export let url = ''
  export let updateUrl: (url: string) => Promise<unknown>

  let error: unknown
  let success: unknown
  let updating = false

  async function handleUpdateUrl() {
    try {
      updating = true
      error = undefined
      success = await updateUrl(url)
    } catch (err) {
      error = errorReason(err)
      success = undefined
    } finally {
      updating = false
    }
  }
</script>

<Card>
  <span slot="header">
    {#if id}
      {url ? 'Update' : 'Create'} your forwarding link
    {:else}
      Login with your <tt>@shopify.com</tt> email
    {/if}
  </span>
  {#if id}
    <form on:submit|preventDefault={handleUpdateUrl} class="space-y-6">
      <div>
        <label for="email" class="input-label">URL</label>
        <input
          bind:value={url}
          type="text"
          name="url"
          id="url"
          class="input w-full"
          aria-label="forwarding URL"
          placeholder="https://linktr.ee/test"
          required
          disabled={updating}
        />
      </div>
      <Button submit disabled={updating} class="w-full">Save changes</Button>
      {#if error}
        <p class="text-red-400">{errorReason(error)}</p>
      {:else if success}
        <div class="flex flex-row justify-between gap-4">
          <p class="text-blue-400">Forwarding link updated!</p>
          <a
            href={`/${id}`}
            target="_blank"
            rel="noreferrer"
            class="text-green-400">try it out</a
          >
        </div>
      {/if}
    </form>
  {:else}
    <p class="mt-4">
      No data is collected other than your email address, only once you save a
      forwarding link. Google authentication is only used to verify that you
      control the email address.
    </p>
  {/if}
</Card>

<style lang="postcss">
  .input-label {
    @apply block mb-2 text-sm font-medium;
  }

  .input {
    @apply text-sm
      block p-2.5 rounded
      bg-slate-600
      focus:ring-1 focus:outline-none focus:ring-teal-100;
  }

  .input:disabled {
    @apply bg-slate-600 text-slate-400 hover:bg-slate-600;
  }
</style>
