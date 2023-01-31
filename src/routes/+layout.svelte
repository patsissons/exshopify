<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { page } from '$app/stores'
  import Alert from '$lib/components/Alert.svelte'
  import Page from '$lib/components/Page.svelte'
  import Topbar from '$lib/components/Topbar.svelte'
  import { auth } from '$lib/services/auth'
  import { errorReason } from '$lib/utils/error'
  import { log } from '$lib/utils/logging'
  import { onMount } from 'svelte'
  import '../app.css'
  import type { PageData } from './$types'

  export let data: PageData

  let { verifiedEmail, urlContext } = data
  const { staging } = urlContext
  const {
    url: { searchParams },
  } = $page
  let error: unknown
  let invalidRedirect = searchParams.get('error')

  async function login() {
    try {
      const result = await auth.login()
      verifiedEmail = result.verifiedEmail
      error = result.error
      await invalidateAll()
    } catch (err) {
      log('index', err, 'E')
      error = err
    }
  }

  async function logout() {
    try {
      const result = await auth.logout()
      verifiedEmail = undefined
      error = result.error
    } catch (err) {
      log('index', err, 'E')
      error = err
    }
  }

  onMount(() => {
    if (!staging) return

    document.documentElement.className = 'staging'
  })
</script>

<div>
  <Page>
    <Topbar {urlContext} {verifiedEmail} {login} {logout} />
    {#if staging}
      <div class="text-center mb-4 text-yellow-500">
        <p>⚠️ Staging Environment ⚠️</p>
        <p>
          Staging environemnt allows connections from <tt>gmail.com</tt> domains.
        </p>
      </div>
    {/if}
    {#if invalidRedirect || error}
      <section class="flex flex-col items-center">
        <div class="w-full max-w-md">
          {#if invalidRedirect}
            <Alert status="danger"
              >{invalidRedirect} is not a valid redirect</Alert
            >
          {/if}
          {#if error}
            <Alert status="danger"
              >Authentication error: {errorReason(error)}</Alert
            >
          {/if}
        </div>
      </section>
    {/if}
    <slot />
  </Page>
</div>
