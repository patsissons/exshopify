<script>
  import { page } from '$app/stores'

  const id = $page.url.searchParams.get('error')
</script>

<h1 class="text-4xl mb-4">exshopify.com</h1>
{#if id}
<p class="error">{id} is not a valid redirect</p>
{:else}
<p class="info">coming soon...</p>
{/if}

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.slate.700);
    color: theme(textColor.slate.100);
  }

  :global(body) {
    margin: theme(margin.4);
  }

	.error {
    color: theme(textColor.red.300);
  }

  .info {
    color: theme(textColor.blue.200);
  }
</style>
