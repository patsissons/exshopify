<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { page } from '$app/stores'
  import Alert from '$lib/components/Alert.svelte'
  import Page from '$lib/components/Page.svelte'
  import Topbar from '$lib/components/Topbar.svelte'
  import { auth } from '$lib/services/auth'
  import { errorReason } from '$lib/utils/error'
  import { log } from '$lib/utils/logging'
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
</script>

<div class:staging>
  <Page>
    <Topbar {urlContext} {verifiedEmail} {login} {logout} />
    {#if staging}
      <div class="text-center mb-4">
        <p class="text-yellow-500">⚠️ Staging Environment ⚠️</p>
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
    {#if staging}
      <section class="flex justify-center mt-4">
        <p class="text-yellow-500">
          Staging environemnt allows connections from <tt>gmail.com</tt> domains.
        </p>
      </section>
    {/if}
  </Page>
</div>

<style lang="postcss">
  .staging {
    background: repeating-linear-gradient(
      45deg,
      theme(colors.slate.500),
      theme(colors.slate.500) 10px,
      theme(colors.slate.600) 10px,
      theme(colors.slate.600) 20px
    );
  }
</style>
