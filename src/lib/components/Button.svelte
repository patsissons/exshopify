<script lang="ts">
  export let submit = false
  export let disabled = false
  export let action: (() => unknown) | undefined = undefined
</script>

<button
  type={submit ? 'submit' : 'button'}
  on:click={action}
  {disabled}
  class="btn {$$props.class}"
>
  <slot />
</button>

<style lang="postcss">
  .btn {
    @apply font-medium text-sm text-center
      px-5 py-2.5 rounded
      bg-teal-800 hover:bg-teal-700
      focus:ring-2 focus:outline-none focus:ring-teal-500;
  }

  .btn:disabled {
    @apply bg-teal-900 text-slate-400 hover:bg-teal-900;
  }
</style>
