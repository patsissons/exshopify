<div class="container w-full mb-4">
  {#if $$slots.header}
    <h5 class="header">
      <slot name="header" />
    </h5>
  {/if}
  <slot />
</div>

<style lang="postcss">
  .container {
    @apply max-w-md
      p-4 sm:p-6 md:p-8 border rounded-lg
      bg-slate-800 border-slate-500 shadow;
  }

  .header {
    @apply font-medium text-xl mb-4;
  }
</style>
