<script lang="ts">
  import { api } from '$lib/services/api'
  import type { PageData } from './$types'
  import Form from './Form.svelte'

  export let data: PageData
</script>

<Form id={data.id} url={data.user?.url || ''} updateUrl={api.update} />
