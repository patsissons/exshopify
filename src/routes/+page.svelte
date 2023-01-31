<script lang="ts">
  import QR from '$lib/components/QR.svelte'
  import { api } from '$lib/services/api'
  import type { PageData } from './$types'
  import Form from './Form.svelte'

  export let data: PageData
</script>

<section class="flex flex-col items-center">
  <Form id={data.id} url={data.user?.url || ''} updateUrl={api.update} />
  {#if data.user}
    <QR url={data.user.url} />
  {/if}
</section>
