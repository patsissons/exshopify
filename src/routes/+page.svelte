<script>
  import { page } from '$app/stores'
  const id = $page.url.searchParams.get('error')
</script>

<h1>exshopify.com</h1>
{#if id}
<p class="error">{id} is not a valid redirect</p>
{/if}
