<script lang="ts">
  import { onMount } from 'svelte'
  import { buildQRDataUrl } from '$lib/services/qr'
  import { errorReason } from '$lib/utils/error'
  import { log } from '$lib/utils/logging'
  import Alert from './Alert.svelte'
  import Button from './Button.svelte'
  import Card from './Card.svelte'

  export let url: string

  let logo = '/favicon.png'
  let footer = '👋 adios amigos 🍻'
  let qrcodeSrc = ''
  let error: unknown

  const eligibleTypes = new Set([
    'image/gif',
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
  ])

  async function buildQR() {
    try {
      qrcodeSrc = await buildQRDataUrl(url, { imageSrc: logo, footer })
    } catch (err) {
      log('QR', err, 'E')
      error = err
    }
  }

  function handleDragDrop(e: DragEvent) {
    try {
      e.preventDefault()
      if (e.type === 'dragover' || e.type !== 'drop' || !e.dataTransfer) return

      console.log('D', e)
      const items = Array.from(e.dataTransfer.items)
      if (items.length === 0) {
        error = 'Invalid file drop: empty'
        return
      }

      const fileItems = items
        .map((item) => (item.kind === 'file' ? item.getAsFile() : null))
        .filter((file): file is File => file != null)
      if (fileItems.length === 0) {
        error = `Invalid file drop: no valid files (${items.length})`
        return
      }

      const imageFiles = fileItems.filter((file) =>
        eligibleTypes.has(file.type)
      )
      if (imageFiles.length === 0) {
        const types = fileItems.map((file) => file.type).join(', ')
        error = `Invalid file drop: no valid image files (${types})`
        return
      }

      const lastFile = fileItems[fileItems.length - 1]
      if (fileItems.length > 1) {
        error = `Multiple files dropped`
      }

      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        if (!e.target) {
          error = `Invalid file drop: unable to process file`
          return
        }

        logo = String(e.target.result)
        buildQR()
      }
      fileReader.readAsDataURL(lastFile)
    } catch (err) {
      log('QR', err, 'E')
      error = err
    }
  }

  function handleSubmit() {
    buildQR()
  }

  onMount(buildQR)
</script>

<Card>
  <span slot="header"> Build a QR code image </span>
  {#if qrcodeSrc}
    <div
      id="qrcode"
      class="flex justify-center"
      on:drop={handleDragDrop}
      on:dragover={handleDragDrop}
    >
      <img src={qrcodeSrc} alt={`QR code for ${url}`} />
    </div>
  {/if}
  <form on:submit|preventDefault={handleSubmit} class="mt-4 space-y-6">
    <div>
      <label for="logo" class="input-label flex justify-between">
        <span>Logo URL</span>
        <span class="font-light text-slate-500"
          >hint: drag an image onto the image above</span
        >
      </label>
      <input
        bind:value={logo}
        name="logo"
        type="text"
        class="input w-full"
        aria-label="logo URL"
        placeholder="/favicon.png"
      />
    </div>
    <div>
      <label for="footer" class="input-label">Footer text</label>
      <input
        bind:value={footer}
        name="footer"
        type="text"
        class="input w-full"
        aria-label="footer text"
        placeholder="message for the bottom"
      />
    </div>
    <Button submit class="w-full">Apply</Button>
  </form>
  {#if error}
    <div class="mt-4">
      <Alert status="danger">{errorReason(error)}</Alert>
    </div>
  {/if}
</Card>

<style lang="postcss">
  .input-label {
    @apply mb-2 text-sm font-medium;
  }

  .input {
    @apply text-sm
      block p-2.5 rounded
      bg-slate-600
      focus:ring-1 focus:outline-none focus:ring-teal-100;
  }
</style>
